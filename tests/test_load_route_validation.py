"""
E2E test: load_route rejects waypoints with non-numeric coordinates.

SPEC edge case for: "Routes require at least 2 waypoints; loading fewer
is rejected with an error."

Malformed waypoints (non-numeric coordinates, wrong tuple length) should
be rejected with an error reply, not silently crash the simulation or
time out.
"""

import json
import time
import threading

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


def test_load_route_rejects_non_numeric_waypoints(zenoh_router):
    """
    Sending waypoints with non-numeric coordinates should return an error
    reply (ok: false) rather than crashing or timing out.
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

            replies = client_session.get(
                f"{_PREFIX}/service/load_route",
                payload=json.dumps(
                    {"waypoints": [[57.7, 11.9], ["bad", "data"]]}
                ).encode(),
                timeout=5,
            )
            result = None
            for reply in replies:
                if reply.ok is not None:
                    result = json.loads(bytes(reply.ok.payload))

            assert result is not None, (
                "Expected an error reply, but got no reply (timeout)"
            )
            assert result["ok"] is False
            assert "error" in result
    finally:
        client_session.close()


