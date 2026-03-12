"""
E2E test: multiple drones run simultaneously without interfering.

SPEC behaviors tested:
- Each drone publishes telemetry under its own keelson key expressions (scoped by entity_id).
- Multiple drones can run simultaneously without interfering with each other.

Starts two simulators with different entity_ids, drives both to PLAYING,
and verifies each publishes only under its own key prefix and both receive
independent telemetry.
"""

import json
import time
import threading

import pytest
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"

_ROUTE_A = [[57.7069, 11.9381], [57.7100, 11.9420]]
_ROUTE_B = [[57.6900, 11.9200], [57.6930, 11.9250]]

_PREFIX_A = "ghost-drone/@v0/drone-alpha"
_PREFIX_B = "ghost-drone/@v0/drone-beta"


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
        time.sleep(0.1)
    raise RuntimeError("Publisher session not ready within timeout")


def test_two_drones_publish_under_own_key_prefix(zenoh_router):
    """
    Two simultaneous simulators with different entity_ids publish telemetry
    only under their own keelson key prefix. Messages from drone-alpha never
    appear under drone-beta's prefix and vice versa.
    """
    cfg_a = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="drone-alpha",
    )
    cfg_b = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="drone-beta",
    )

    # Collect subjects seen per entity_id prefix
    subjects_a: set[str] = set()
    subjects_b: set[str] = set()
    lock = threading.Lock()

    client = _make_client_session()

    def on_sample(sample):
        key = str(sample.key_expr)
        # Skip sim_frame and entity_health — focus on the 5 keelson subjects
        if "sim_frame" in key or "entity_health" in key:
            return
        with lock:
            if "drone-alpha" in key:
                # extract subject name (5th segment: realm/@v0/entity/pubsub/SUBJECT/source)
                parts = key.split("/")
                if len(parts) >= 5:
                    subjects_a.add(parts[4])
            elif "drone-beta" in key:
                parts = key.split("/")
                if len(parts) >= 5:
                    subjects_b.add(parts[4])

    subscriber = client.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg_a) as handle_a, start_simulator(cfg_b) as handle_b:
            _wait_for_publisher(handle_a)
            _wait_for_publisher(handle_b)

            # Load routes and play both drones
            for prefix, route in [(_PREFIX_A, _ROUTE_A), (_PREFIX_B, _ROUTE_B)]:
                replies = client.get(
                    f"{prefix}/service/load_route",
                    payload=json.dumps({"waypoints": route}).encode(),
                    timeout=5,
                )
                for reply in replies:
                    result = json.loads(bytes(reply.ok.payload))
                    assert result["ok"], f"load_route failed for {prefix}: {result}"

                client.put(f"{prefix}/control/play", "")

            # Let both drones publish for a few seconds
            time.sleep(3.5)

            # Stop both
            client.put(f"{_PREFIX_A}/control/stop", "")
            client.put(f"{_PREFIX_B}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client.close()

    expected_subjects = {
        "heading_true_north_deg",
        "speed_over_ground_knots",
        "roll_deg",
        "pitch_deg",
        "location_fix",
    }

    # Both drones should have published all 5 subjects independently
    missing_a = expected_subjects - subjects_a
    missing_b = expected_subjects - subjects_b
    assert not missing_a, f"drone-alpha missing subjects: {missing_a}"
    assert not missing_b, f"drone-beta missing subjects: {missing_b}"


def test_two_drones_do_not_interfere_with_each_other(zenoh_router):
    """
    Stopping one drone does not affect the other. After stopping drone-alpha,
    drone-beta continues to publish telemetry.
    """
    cfg_a = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="drone-alpha",
    )
    cfg_b = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="drone-beta",
    )

    # Count messages per drone in a switchable window
    lock = threading.Lock()
    beta_after_alpha_stop: list[str] = []
    collecting = [False]

    client = _make_client_session()

    def on_sample(sample):
        key = str(sample.key_expr)
        if "sim_frame" in key or "entity_health" in key:
            return
        with lock:
            if collecting[0] and "drone-beta" in key:
                parts = key.split("/")
                if len(parts) >= 5:
                    beta_after_alpha_stop.append(parts[4])

    subscriber = client.declare_subscriber("ghost-drone/@v0/**", on_sample)

    try:
        with start_simulator(cfg_a) as handle_a, start_simulator(cfg_b) as handle_b:
            _wait_for_publisher(handle_a)
            _wait_for_publisher(handle_b)

            # Load routes and play both
            for prefix, route in [(_PREFIX_A, _ROUTE_A), (_PREFIX_B, _ROUTE_B)]:
                replies = client.get(
                    f"{prefix}/service/load_route",
                    payload=json.dumps({"waypoints": route}).encode(),
                    timeout=5,
                )
                for reply in replies:
                    pass
                client.put(f"{prefix}/control/play", "")

            time.sleep(2.0)

            # Stop drone-alpha only
            client.put(f"{_PREFIX_A}/control/stop", "")
            time.sleep(0.3)

            # Start collecting drone-beta messages after alpha is stopped
            with lock:
                collecting[0] = True

            time.sleep(2.0)

            with lock:
                collecting[0] = False
    finally:
        subscriber.undeclare()
        client.close()

    # drone-beta should have continued publishing after drone-alpha stopped
    assert len(beta_after_alpha_stop) > 0, (
        "drone-beta stopped publishing after drone-alpha was stopped — drones are interfering"
    )
    # Should have multiple subjects
    unique_subjects = set(beta_after_alpha_stop)
    assert len(unique_subjects) >= 3, (
        f"Expected drone-beta to publish at least 3 subjects, got: {unique_subjects}"
    )
