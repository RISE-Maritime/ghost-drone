"""
E2E test: sim_frame includes entity_id field.

SPEC behavior tested:
- All active drones are visible on the map with their current positions.
- Each drone publishes telemetry under its own keelson key expressions
  (scoped by entity_id).

For multi-drone support, the frontend subscribes to sim_frame from all
drones via a wildcard key expression. Each sim_frame must include the
drone's entity_id so the frontend can identify which drone the frame
belongs to.
"""

import json
import time
import threading

import pytest
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
_REALM = "ghost-drone"


@pytest.fixture(scope="module")
def zenoh_router():
    """In-process zenoh router."""
    cfg = zenoh.Config.from_json5(
        json.dumps(
            {
                "mode": "router",
                "listen": {"endpoints": [_ROUTER_ENDPOINT]},
                "scouting": {"multicast": {"enabled": False}},
            }
        )
    )
    session = zenoh.open(cfg)
    time.sleep(0.2)
    yield session
    session.close()


def _make_client_session():
    sub_cfg = zenoh.Config.from_json5(
        json.dumps(
            {
                "mode": "client",
                "connect": {"endpoints": [_ROUTER_ENDPOINT]},
            }
        )
    )
    session = zenoh.open(sub_cfg)
    time.sleep(0.1)
    return session


def _wait_for_publisher(handle, timeout=5.0):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if handle.publisher.session_ready.is_set():
            return
        time.sleep(0.05)
    raise TimeoutError("publisher not ready")


def test_sim_frame_contains_entity_id(zenoh_router):
    """
    sim_frame JSON payload must include an 'entity_id' field matching
    the drone's configured entity_id, so a wildcard subscriber can
    identify which drone each frame belongs to.
    """
    entity_id = "sim-entity-id-test"
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm=_REALM,
        entity_id=entity_id,
    )

    with start_simulator(cfg) as handle:
        _wait_for_publisher(handle)

        frames = []
        lock = threading.Lock()

        def on_frame(sample):
            try:
                data = json.loads(bytes(sample.payload))
                with lock:
                    frames.append(data)
            except Exception:
                pass

        client = _make_client_session()
        try:
            prefix = f"{_REALM}/@v0/{entity_id}"
            sub = client.declare_subscriber(
                f"{prefix}/pubsub/sim_frame/engine/0", on_frame
            )

            time.sleep(1.0)
            sub.undeclare()

            with lock:
                assert len(frames) > 0, "No sim_frame messages received"
                for frame in frames:
                    assert "entity_id" in frame, (
                        f"sim_frame missing 'entity_id' field: {list(frame.keys())}"
                    )
                    assert frame["entity_id"] == entity_id, (
                        f"entity_id mismatch: expected {entity_id!r}, "
                        f"got {frame['entity_id']!r}"
                    )
        finally:
            client.close()


def test_wildcard_sim_frame_identifies_drones(zenoh_router):
    """
    When subscribing to sim_frame via a wildcard key, each frame's
    entity_id field correctly identifies the source drone.
    """
    entity_a = "sim-wildcard-a"
    entity_b = "sim-wildcard-b"

    cfg_a = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm=_REALM,
        entity_id=entity_a,
    )
    cfg_b = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm=_REALM,
        entity_id=entity_b,
    )

    with start_simulator(cfg_a) as handle_a, start_simulator(cfg_b) as handle_b:
        _wait_for_publisher(handle_a)
        _wait_for_publisher(handle_b)

        seen_ids = set()
        lock = threading.Lock()

        def on_frame(sample):
            try:
                data = json.loads(bytes(sample.payload))
                eid = data.get("entity_id")
                if eid:
                    with lock:
                        seen_ids.add(eid)
            except Exception:
                pass

        client = _make_client_session()
        try:
            # Wildcard subscription for all drones' sim_frame
            sub = client.declare_subscriber(
                f"{_REALM}/@v0/*/pubsub/sim_frame/engine/0", on_frame
            )

            time.sleep(1.5)
            sub.undeclare()

            with lock:
                assert entity_a in seen_ids, (
                    f"Drone {entity_a!r} not seen in wildcard subscription. "
                    f"Seen: {seen_ids}"
                )
                assert entity_b in seen_ids, (
                    f"Drone {entity_b!r} not seen in wildcard subscription. "
                    f"Seen: {seen_ids}"
                )
        finally:
            client.close()
