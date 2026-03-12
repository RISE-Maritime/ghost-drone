"""
End-to-end test: load_route rejects null/invalid waypoints with an error reply.

Verifies SPEC behavior:
- "Routes require at least 2 waypoints; loading fewer is rejected with an error."

When a frontend bug or script sends null instead of an array for waypoints,
the service should reply with an error rather than silently crashing (no reply).
"""

import json
import time

import pytest
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.server import start_simulator

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
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


def test_load_route_rejects_null_waypoints(zenoh_router):
    """
    Sending {"waypoints": null} should return an error reply, not time out.

    The handler must reply with {"ok": false, "error": "..."} for any
    invalid waypoints value, including null (JSON null → Python None).
    """
    cfg = AppConfig(
        zenoh_endpoint=_ROUTER_ENDPOINT,
        keelson_realm="ghost-drone",
        entity_id="sim001",
    )

    client_session = _make_client_session()

    try:
        with start_simulator(cfg) as handle:
            _wait_for_publisher(handle)

            # Send null waypoints — the handler should reply with an error
            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps({"waypoints": None}).encode(),
                timeout=3,
            )
            result = None
            for reply in replies:
                if reply.ok is not None:
                    candidate = json.loads(bytes(reply.ok.payload))
                    if result is None or "error" in candidate:
                        result = candidate

            assert result is not None, (
                "load_route should reply with an error for null waypoints, "
                "but no reply was received (handler likely crashed silently)"
            )
            assert result["ok"] is False, (
                f"Expected ok=False for null waypoints, got {result}"
            )
            assert "error" in result, (
                f"Expected an error message for null waypoints, got {result}"
            )
    finally:
        client_session.close()
