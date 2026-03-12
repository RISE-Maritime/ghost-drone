"""
E2E test: list_drones includes each drone's loaded route.

SPEC behavior tested (partially implemented):
- "A route can be drawn on the map and assigned to a drone."

For the fleet UI to show which drones have routes and render route lines
on the map, the list_drones response must include each drone's loaded
waypoints.  A newly spawned drone with no route should report route as
null; after loading a route, the waypoints should appear.
"""

import json
import time

import pytest
import zenoh

from ghost_drone.fleet import FleetManager

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
_REALM = "ghost-drone"
_ROUTE = [[57.7069, 11.9381], [57.7100, 11.9420]]


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


def _spawn_drone(client, lat, lng):
    replies = client.get(
        f"{_REALM}/@v0/service/spawn_drone",
        payload=json.dumps({"lat": lat, "lng": lng}).encode(),
        timeout=5,
    )
    for reply in replies:
        result = json.loads(bytes(reply.ok.payload))
        assert result["ok"], f"spawn_drone failed: {result}"
        return result["entity_id"]
    raise RuntimeError("No reply from spawn_drone")


def _list_drones(client):
    replies = client.get(
        f"{_REALM}/@v0/service/list_drones",
        timeout=5,
    )
    for reply in replies:
        result = json.loads(bytes(reply.ok.payload))
        assert result["ok"], f"list_drones failed: {result}"
        return result["drones"]
    raise RuntimeError("No reply from list_drones")


def test_spawned_drone_has_no_route(zenoh_router):
    """
    A newly spawned drone should have route: null in the list_drones response.
    """
    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM) as fleet:
        client = _make_client_session()
        try:
            entity_id = _spawn_drone(client, 57.7069, 11.9381)
            time.sleep(0.5)

            drones = _list_drones(client)
            drone = next(d for d in drones if d["entity_id"] == entity_id)

            assert "route" in drone, (
                f"list_drones response missing 'route' field: {drone}"
            )
            assert drone["route"] is None, (
                f"Newly spawned drone should have route=null, got {drone['route']}"
            )
        finally:
            client.close()


def test_drone_route_appears_after_load(zenoh_router):
    """
    After loading a route on a spawned drone, list_drones should include the
    route waypoints.
    """
    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM) as fleet:
        client = _make_client_session()
        try:
            entity_id = _spawn_drone(client, 57.7069, 11.9381)
            time.sleep(0.5)

            # Load a route on the spawned drone
            prefix = f"{_REALM}/@v0/{entity_id}"
            replies = client.get(
                f"{prefix}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE}).encode(),
                timeout=5,
            )
            for reply in replies:
                result = json.loads(bytes(reply.ok.payload))
                assert result["ok"], f"load_route failed: {result}"

            time.sleep(0.3)

            drones = _list_drones(client)
            drone = next(d for d in drones if d["entity_id"] == entity_id)

            assert "route" in drone, (
                f"list_drones response missing 'route' field: {drone}"
            )
            assert drone["route"] is not None, (
                "Expected route to be present after loading, got null"
            )
            assert len(drone["route"]) == len(_ROUTE), (
                f"Expected {len(_ROUTE)} waypoints, got {len(drone['route'])}"
            )
            for i, (expected, actual) in enumerate(zip(_ROUTE, drone["route"])):
                assert abs(actual[0] - expected[0]) < 1e-6, (
                    f"Waypoint {i} lat mismatch: expected {expected[0]}, got {actual[0]}"
                )
                assert abs(actual[1] - expected[1]) < 1e-6, (
                    f"Waypoint {i} lng mismatch: expected {expected[1]}, got {actual[1]}"
                )
        finally:
            client.close()
