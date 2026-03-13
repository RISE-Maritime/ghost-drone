"""
E2E test: list_drones includes drone speed in the response.

SPEC behavior refined:
- All active drones are visible on the map with their current positions.

The list_drones response should include each drone's current speed
so the frontend can display velocity information for each drone on
the map. This test verifies the speed field is present and reflects
the drone's motion state.
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


def test_list_drones_stopped_speed_zero(zenoh_router):
    """
    A stopped drone appears in list_drones with speed 0.
    """
    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM) as fleet:
        client = _make_client_session()
        try:
            result = _spawn_drone(client, 57.7069, 11.9381)
            assert result["ok"]
            entity_id = result["entity_id"]

            time.sleep(0.3)

            result = _list_drones(client)
            assert result is not None
            assert result["ok"]

            by_id = {d["entity_id"]: d for d in result["drones"]}
            assert entity_id in by_id

            drone = by_id[entity_id]
            assert "speed" in drone, "list_drones response must include 'speed' field"
            assert isinstance(drone["speed"], (int, float)), (
                f"speed must be numeric, got {type(drone['speed'])}"
            )
            assert drone["speed"] == 0.0, (
                f"Stopped drone should have speed 0, got {drone['speed']}"
            )
        finally:
            client.close()


def test_list_drones_playing_speed_positive(zenoh_router):
    """
    After loading a route and playing, list_drones shows positive speed.
    """
    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM) as fleet:
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

            # Play and let it move
            client.put(f"{prefix}/control/play", "")
            time.sleep(0.5)

            # Check speed is present and positive
            result = _list_drones(client)
            assert result is not None
            assert result["ok"]

            by_id = {d["entity_id"]: d for d in result["drones"]}
            drone = by_id[entity_id]
            assert "speed" in drone, "list_drones response must include 'speed' field"
            assert drone["speed"] > 0, (
                f"Playing drone should have positive speed, got {drone['speed']}"
            )
        finally:
            client.close()
