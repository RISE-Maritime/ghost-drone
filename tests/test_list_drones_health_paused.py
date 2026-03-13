"""
E2E test: list_drones reports correct health for paused drones.

SPEC behavior tested:
- When a drone is paused, it holds its current position. (Control)
- entity_health: PAUSED drones are mid-mission, so health should be
  NOMINAL / AUTONOMOUS, not INACTIVE / IDLE.

The list_drones endpoint must reflect this: a paused drone's health
should be 'nominal', consistent with the entity_health protobuf
message published by the tick loop (server.py treats PAUSED as active).

Currently fleet.py uses ``is_playing = state == PLAYING`` which
incorrectly maps PAUSED to inactive health.
"""

import json
import time

import pytest
import zenoh

from ghost_drone.fleet import FleetManager

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
_REALM = "ghost-drone"

_ROUTE = [
    [57.7069, 11.9381],
    [57.7100, 11.9500],
]


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


def _spawn_drone(client, lat, lng):
    """Helper to spawn a drone and return the reply dict."""
    replies = client.get(
        f"{_REALM}/@v0/service/spawn_drone",
        payload=json.dumps({"lat": lat, "lng": lng}).encode(),
        timeout=5,
    )
    for reply in replies:
        return json.loads(bytes(reply.ok.payload))
    return None


def _list_drones(client):
    """Helper to query list_drones and return the reply dict."""
    replies = client.get(
        f"{_REALM}/@v0/service/list_drones",
        timeout=5,
    )
    for reply in replies:
        return json.loads(bytes(reply.ok.payload))
    return None


def test_list_drones_health_nominal_when_paused(zenoh_router):
    """
    A paused drone is mid-mission and should report 'nominal' health
    in list_drones, not 'inactive'.

    This is consistent with how entity_health is published: the tick
    loop treats PAUSED as active (is_active = state != STOPPED).
    """
    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM):
        client = _make_client_session()
        try:
            result = _spawn_drone(client, 57.7069, 11.9381)
            assert result["ok"]
            entity_id = result["entity_id"]
            prefix = f"{_REALM}/@v0/{entity_id}"

            time.sleep(0.3)

            # Load a route
            replies = client.get(
                f"{prefix}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE}).encode(),
                timeout=5,
            )
            for reply in replies:
                route_result = json.loads(bytes(reply.ok.payload))
            assert route_result["ok"], f"load_route failed: {route_result}"

            # Play
            client.put(f"{prefix}/control/play", "")
            time.sleep(0.5)

            # Pause
            client.put(f"{prefix}/control/pause", "")
            time.sleep(0.5)

            # Verify the drone is paused
            result = _list_drones(client)
            assert result is not None
            assert result["ok"]

            by_id = {d["entity_id"]: d for d in result["drones"]}
            drone = by_id[entity_id]
            assert drone["state"] == "paused", (
                f"Expected drone state 'paused', got '{drone['state']}'"
            )

            # A paused drone is mid-mission — health should be 'nominal',
            # NOT 'inactive' (which is only for stopped/idle drones).
            assert drone["health"] == "nominal", (
                f"Paused drone health should be 'nominal', got '{drone['health']}'"
            )
        finally:
            client.close()
