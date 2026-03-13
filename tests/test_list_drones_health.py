"""
E2E test: list_drones includes drone health level in the response.

SPEC behavior refined:
- The UI displays each drone's entity_health status (nominal/degraded/critical/inactive).
- All active drones are visible on the map with their current positions.

The list_drones response should include each drone's current health level
so fleet consumers can display per-drone health at a glance. This test
verifies the health field is present and reflects the drone's state.
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


def test_list_drones_health_inactive_when_stopped(zenoh_router):
    """
    A newly spawned (stopped) drone reports health 'inactive' in list_drones.
    """
    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM):
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
            assert "health" in drone, "list_drones response must include 'health' field"
            assert drone["health"] == "inactive", (
                f"Stopped drone health should be 'inactive', got '{drone['health']}'"
            )
        finally:
            client.close()


def test_list_drones_health_nominal_when_playing(zenoh_router):
    """
    A playing drone with no faults reports health 'nominal' in list_drones.
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

            # Check health
            result = _list_drones(client)
            assert result is not None
            assert result["ok"]

            by_id = {d["entity_id"]: d for d in result["drones"]}
            drone = by_id[entity_id]
            assert "health" in drone, "list_drones response must include 'health' field"
            assert drone["health"] == "nominal", (
                f"Playing drone (no faults) health should be 'nominal', got '{drone['health']}'"
            )
        finally:
            client.close()


def test_list_drones_health_reflects_fault(zenoh_router):
    """
    A playing drone with a 'drop' fault reports degraded or critical health.
    """
    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM):
        client = _make_client_session()
        try:
            result = _spawn_drone(client, 57.7069, 11.9381)
            assert result["ok"]
            entity_id = result["entity_id"]
            prefix = f"{_REALM}/@v0/{entity_id}"

            time.sleep(0.3)

            # Load a route and play
            replies = client.get(
                f"{prefix}/service/load_route",
                payload=json.dumps({"waypoints": _ROUTE}).encode(),
                timeout=5,
            )
            for reply in replies:
                route_result = json.loads(bytes(reply.ok.payload))
            assert route_result["ok"]

            client.put(f"{prefix}/control/play", "")
            time.sleep(0.5)

            # Inject a drop fault on heading
            replies = client.get(
                f"{prefix}/service/fault",
                payload=json.dumps({
                    "action": "inject",
                    "subject": "heading_true_north_deg",
                    "fault_type": "drop",
                }).encode(),
                timeout=5,
            )
            for reply in replies:
                fault_result = json.loads(bytes(reply.ok.payload))
            assert fault_result.get("ok"), f"fault inject failed: {fault_result}"

            time.sleep(0.3)

            # Check health reflects fault
            result = _list_drones(client)
            assert result is not None
            assert result["ok"]

            by_id = {d["entity_id"]: d for d in result["drones"]}
            drone = by_id[entity_id]
            assert "health" in drone, "list_drones response must include 'health' field"
            assert drone["health"] in ("degraded", "critical"), (
                f"Drone with drop fault should be degraded or critical, got '{drone['health']}'"
            )
        finally:
            client.close()
