"""
E2E test: fleet spawn service is available when the server runs.

SPEC behavior tested:
- When a user clicks on the map, a new drone is spawned at that location
  with a unique entity_id.

The backend must expose the spawn_drone queryable as part of normal server
operation so that the browser (or any zenoh client) can dynamically create
drones.  Currently start_simulator() only manages a single drone and does
not register the fleet spawn service — this test should fail until that
integration is added.
"""

import json
import time
import threading

import pytest
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.server import start_server

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
_REALM = "test-fleet-spawn"


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


def test_spawn_drone_available_from_running_server(zenoh_router):
    """
    Starting the server exposes the fleet spawn_drone service so that new
    drones can be created dynamically at runtime.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm=_REALM,
        entity_id="initial-drone",
    )

    with start_server(cfg) as handle:
        deadline = time.monotonic() + 5.0
        while time.monotonic() < deadline:
            if handle.publisher.session_ready.is_set():
                break
            time.sleep(0.1)

        client = _make_client_session()
        try:
            # Try to spawn a new drone via the fleet service
            replies = client.get(
                f"{_REALM}/@v0/service/spawn_drone",
                payload=json.dumps({"lat": 57.7069, "lng": 11.9381}).encode(),
                timeout=5,
            )
            result = None
            for reply in replies:
                result = json.loads(bytes(reply.ok.payload))

            assert result is not None, "No reply from spawn_drone — fleet service not available"
            assert result["ok"], f"spawn_drone failed: {result}"
            assert "entity_id" in result, "Response missing entity_id"

            spawned_id = result["entity_id"]

            # Verify the spawned drone publishes sim_frame
            frames = []
            lock = threading.Lock()

            def on_frame(sample):
                with lock:
                    frames.append(json.loads(bytes(sample.payload)))

            sub = client.declare_subscriber(
                f"{_REALM}/@v0/{spawned_id}/pubsub/sim_frame/engine/0",
                on_frame,
            )
            time.sleep(1.5)
            sub.undeclare()

            with lock:
                assert len(frames) > 0, (
                    f"Spawned drone {spawned_id} did not publish sim_frame"
                )
                last = frames[-1]
                assert abs(last["lat"] - 57.7069) < 0.01
                assert abs(last["lng"] - 11.9381) < 0.01
        finally:
            client.close()


def test_list_drones_includes_initial_and_spawned(zenoh_router):
    """
    The list_drones service returns both the initial drone and any
    dynamically spawned drones.
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm=_REALM,
        entity_id="initial-drone",
    )

    with start_server(cfg) as handle:
        deadline = time.monotonic() + 5.0
        while time.monotonic() < deadline:
            if handle.publisher.session_ready.is_set():
                break
            time.sleep(0.1)

        client = _make_client_session()
        try:
            # Spawn a drone
            replies = client.get(
                f"{_REALM}/@v0/service/spawn_drone",
                payload=json.dumps({"lat": 57.70, "lng": 11.93}).encode(),
                timeout=5,
            )
            for reply in replies:
                result = json.loads(bytes(reply.ok.payload))
                assert result["ok"]

            time.sleep(0.5)

            # List drones — should include initial + spawned
            replies = client.get(
                f"{_REALM}/@v0/service/list_drones",
                timeout=5,
            )
            list_result = None
            for reply in replies:
                list_result = json.loads(bytes(reply.ok.payload))

            assert list_result is not None, "No reply from list_drones"
            assert list_result["ok"]

            entity_ids = [d["entity_id"] for d in list_result["drones"]]
            assert "initial-drone" in entity_ids, (
                f"Initial drone not in list_drones: {entity_ids}"
            )
            assert len(entity_ids) >= 2, (
                f"Expected at least 2 drones (initial + spawned), got {entity_ids}"
            )
        finally:
            client.close()
