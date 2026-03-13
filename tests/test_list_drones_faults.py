"""
E2E test: list_drones includes per-drone active faults in the response.

SPEC behavior refined:
- Faults are controllable via zenoh queryable (for scripts and automated tests).
- All active drones are visible on the map with their current positions.

The list_drones response should include each drone's active faults so that
fleet consumers (monitoring scripts, dashboards) can see which specific faults
are active without subscribing to individual sim_frame streams.
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


def test_list_drones_faults_empty_when_no_faults(zenoh_router):
    """
    A newly spawned drone with no faults should have an empty faults dict
    in the list_drones response.
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
            assert "faults" in drone, "list_drones response must include 'faults' field"
            assert isinstance(drone["faults"], dict), (
                f"faults should be a dict, got {type(drone['faults']).__name__}"
            )
            # No faults injected, so every subject should have an empty list
            for subject, fault_list in drone["faults"].items():
                assert fault_list == [], (
                    f"Subject {subject} should have no faults, got {fault_list}"
                )
        finally:
            client.close()


def test_list_drones_faults_reflects_injected_fault(zenoh_router):
    """
    After injecting a fault on a playing drone, list_drones should show
    the active fault in the drone's faults dict.
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

            # Inject a 'stuck' fault on heading
            replies = client.get(
                f"{prefix}/service/fault",
                payload=json.dumps({
                    "action": "inject",
                    "subject": "heading_true_north_deg",
                    "fault_type": "stuck",
                }).encode(),
                timeout=5,
            )
            for reply in replies:
                fault_result = json.loads(bytes(reply.ok.payload))
            assert fault_result.get("ok"), f"fault inject failed: {fault_result}"

            time.sleep(0.3)

            # Check faults in list_drones
            result = _list_drones(client)
            assert result is not None
            assert result["ok"]

            by_id = {d["entity_id"]: d for d in result["drones"]}
            drone = by_id[entity_id]
            assert "faults" in drone, "list_drones response must include 'faults' field"
            faults = drone["faults"]
            assert "heading_true_north_deg" in faults, (
                f"faults should include heading_true_north_deg, got keys: {list(faults.keys())}"
            )
            assert "stuck" in faults["heading_true_north_deg"], (
                f"heading faults should include 'stuck', got {faults['heading_true_north_deg']}"
            )
        finally:
            client.close()


def test_list_drones_faults_cleared_after_clear(zenoh_router):
    """
    After clearing a fault, list_drones should no longer show it.
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

            # Inject a 'drop' fault on speed
            replies = client.get(
                f"{prefix}/service/fault",
                payload=json.dumps({
                    "action": "inject",
                    "subject": "speed_over_ground_knots",
                    "fault_type": "drop",
                }).encode(),
                timeout=5,
            )
            for reply in replies:
                fault_result = json.loads(bytes(reply.ok.payload))
            assert fault_result.get("ok")

            time.sleep(0.3)

            # Verify fault is visible
            result = _list_drones(client)
            assert result is not None and result["ok"]
            by_id = {d["entity_id"]: d for d in result["drones"]}
            drone = by_id[entity_id]
            assert "faults" in drone
            assert "drop" in drone["faults"].get("speed_over_ground_knots", [])

            # Clear the fault
            replies = client.get(
                f"{prefix}/service/fault",
                payload=json.dumps({
                    "action": "clear",
                    "subject": "speed_over_ground_knots",
                    "fault_type": "drop",
                }).encode(),
                timeout=5,
            )
            for reply in replies:
                clear_result = json.loads(bytes(reply.ok.payload))
            assert clear_result.get("ok")

            time.sleep(0.3)

            # Verify fault is gone
            result = _list_drones(client)
            assert result is not None and result["ok"]
            by_id = {d["entity_id"]: d for d in result["drones"]}
            drone = by_id[entity_id]
            assert "faults" in drone
            speed_faults = drone["faults"].get("speed_over_ground_knots", [])
            assert "drop" not in speed_faults, (
                f"After clearing, speed faults should not contain 'drop', got {speed_faults}"
            )
        finally:
            client.close()
