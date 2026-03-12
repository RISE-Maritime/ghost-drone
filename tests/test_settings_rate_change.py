"""
E2E test: updating rate_hz via the settings queryable changes the observed
publish rate of a keelson subject.

SPEC: "Settings (rates, source_ids, noise, roll/pitch amplitude) can be read
and updated via zenoh queryable."

The existing settings test verifies that the queryable stores and returns
updated values, but does not verify that the rate change takes effect on
actual telemetry output. This test closes that gap.
"""

import json
import time
import threading

import keelson
import pytest
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
_ROUTE = [[57.7069, 11.9381], [57.7100, 11.9420]]
_PREFIX = "ghost-drone/@v0/sim001"


@pytest.fixture(scope="module")
def zenoh_router():
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


def test_rate_hz_update_changes_observed_publish_rate(zenoh_router):
    """
    Verifies that updating a subject's rate_hz via the settings queryable
    actually changes how often that subject's keelson messages are published.

    1. Play at default 1 Hz, count heading messages over 2 seconds.
    2. Update heading rate_hz to 5 Hz via settings queryable.
    3. Count heading messages over 2 seconds again.
    4. Assert the count increased significantly (at least 2x baseline).
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    heading_counts: list[int] = []
    lock = threading.Lock()
    counter = [0]  # mutable counter for the subscriber callback

    client_session = _make_client_session()

    heading_key = f"{_PREFIX}/pubsub/heading_true_north_deg/**"

    def on_heading(sample):
        with lock:
            counter[0] += 1

    subscriber = client_session.declare_subscriber(heading_key, on_heading)

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)

            # Load route and play
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE}).encode(),
                timeout=5,
            )
            for reply in replies:
                result = json.loads(bytes(reply.ok.payload))
                assert result["ok"], f"load_route failed: {result}"

            client_session.put(f"{_PREFIX}/control/play", "")

            # --- Phase 1: measure at default 1 Hz ---
            # Wait a moment for the first publish cycle to stabilize
            time.sleep(1.5)

            with lock:
                counter[0] = 0
            time.sleep(2.0)
            with lock:
                baseline_count = counter[0]

            # --- Update rate to 5 Hz ---
            replies = client_session.get(
                f"{_PREFIX}/service/settings",
                payload=json.dumps({
                    "subjects": {
                        "heading_true_north_deg": {"rate_hz": 5.0},
                    }
                }).encode(),
                timeout=5,
            )
            updated = None
            for reply in replies:
                updated = json.loads(bytes(reply.ok.payload))
            assert updated is not None, "No reply from settings queryable"
            assert updated["subjects"]["heading_true_north_deg"]["rate_hz"] == 5.0

            # --- Phase 2: measure at 5 Hz ---
            # Brief settling time for the new rate
            time.sleep(0.5)

            with lock:
                counter[0] = 0
            time.sleep(2.0)
            with lock:
                fast_count = counter[0]

            client_session.put(f"{_PREFIX}/control/stop", "")
            time.sleep(0.2)
    finally:
        subscriber.undeclare()
        client_session.close()

    # At 1 Hz for 2 seconds, expect ~2 messages (allow >=1 for timing slack)
    assert baseline_count >= 1, (
        f"Expected at least 1 heading message at 1 Hz over 2s, got {baseline_count}"
    )
    # At 5 Hz for 2 seconds, expect ~10 messages
    # Must be at least 2x baseline to confirm rate change took effect
    assert fast_count >= baseline_count * 2, (
        f"Expected rate increase after settings update: "
        f"baseline={baseline_count} at 1 Hz, fast={fast_count} at 5 Hz"
    )
    # Also check absolute count: at 5 Hz for 2s, should get at least 6
    assert fast_count >= 6, (
        f"Expected at least 6 heading messages at 5 Hz over 2s, got {fast_count}"
    )
