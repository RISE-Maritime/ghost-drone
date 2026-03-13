"""
E2E test: list_drones includes per-subsystem health breakdown.

SPEC behaviors:
- The UI shows per-subsystem health breakdown (position, heading, speed).
- All active drones are visible on the map with their current positions.

The list_drones response should include full health summaries (with subsystem
breakdown) for each drone, matching the sim_frame health format. This enables
fleet-level UIs to display per-drone, per-subsystem health without subscribing
to each drone's sim_frame individually.
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
    replies = client.get(
        f"{_REALM}/@v0/service/spawn_drone",
        payload=json.dumps({"lat": lat, "lng": lng}).encode(),
        timeout=5,
    )
    for reply in replies:
        return json.loads(bytes(reply.ok.payload))
    return None


def _list_drones(client):
    replies = client.get(
        f"{_REALM}/@v0/service/list_drones",
        timeout=5,
    )
    for reply in replies:
        return json.loads(bytes(reply.ok.payload))
    return None


def test_list_drones_health_has_subsystems_when_playing(zenoh_router):
    """
    A playing drone's health in list_drones includes per-subsystem breakdown
    (position, heading, speed), matching the sim_frame health format.
    """
    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM):
        client = _make_client_session()
        try:
            result = _spawn_drone(client, 57.7069, 11.9381)
            assert result["ok"]
            entity_id = result["entity_id"]
            prefix = f"{_REALM}/@v0/{entity_id}"

            time.sleep(0.3)

            # Load route and play
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

            result = _list_drones(client)
            assert result is not None
            assert result["ok"]

            by_id = {d["entity_id"]: d for d in result["drones"]}
            drone = by_id[entity_id]

            # health should be an object with 'level' and 'subsystems'
            health = drone["health"]
            assert isinstance(health, dict), (
                f"health should be a dict with level+subsystems, got {type(health).__name__}: {health!r}"
            )
            assert health["level"] == "nominal"

            subsystems = health["subsystems"]
            assert isinstance(subsystems, list)
            sub_names = {s["name"] for s in subsystems}
            assert sub_names == {"position", "heading", "speed"}, (
                f"Expected subsystems position/heading/speed, got {sub_names}"
            )
            for sub in subsystems:
                assert sub["level"] == "nominal", (
                    f"Subsystem {sub['name']} should be nominal, got {sub['level']}"
                )
        finally:
            client.close()


def test_list_drones_health_subsystems_reflect_fault(zenoh_router):
    """
    When a fault is active, the affected subsystem shows degraded/critical
    in the list_drones health breakdown.
    """
    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM):
        client = _make_client_session()
        try:
            result = _spawn_drone(client, 57.7069, 11.9381)
            assert result["ok"]
            entity_id = result["entity_id"]
            prefix = f"{_REALM}/@v0/{entity_id}"

            time.sleep(0.3)

            # Load route and play
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

            # Inject drop fault on heading
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
            assert fault_result.get("ok")

            time.sleep(0.3)

            result = _list_drones(client)
            assert result is not None
            assert result["ok"]

            by_id = {d["entity_id"]: d for d in result["drones"]}
            drone = by_id[entity_id]

            health = drone["health"]
            assert isinstance(health, dict), (
                f"health should be a dict, got {type(health).__name__}: {health!r}"
            )
            # Overall should reflect fault
            assert health["level"] in ("degraded", "critical")

            # heading subsystem should be critical (drop is a critical fault)
            subsystems = {s["name"]: s for s in health["subsystems"]}
            assert subsystems["heading"]["level"] == "critical", (
                f"heading subsystem should be critical with drop fault, "
                f"got {subsystems['heading']['level']}"
            )
            # position and speed should still be nominal
            assert subsystems["position"]["level"] == "nominal"
            assert subsystems["speed"]["level"] == "nominal"
        finally:
            client.close()
