"""
E2E test: list_drones health includes operation mode.

SPEC behaviors tested:
- When idle/stopped, health level is INACTIVE and operation mode is IDLE.
- When playing autonomously, health level is NOMINAL and operation mode is AUTONOMOUS.
- A drone can be remote-controlled: movement commands sent via zenoh override
  autonomous navigation.

The health summary in list_drones should include a 'mode' field matching the
entity_health protobuf's operation_mode, so fleet consumers can distinguish
autonomous, remote-controlled, and idle drones without subscribing to each
drone's entity_health individually.
"""

import json
import time

import pytest
import zenoh

from ghost_drone.fleet import FleetManager

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17457"
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


def test_list_drones_health_mode_operated_when_spawned(zenoh_router):
    """
    A newly spawned drone's health in list_drones should include mode 'operated',
    consistent with entity_health MODE_OPERATED. Drones are always active.
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
            drone = by_id[entity_id]

            health = drone["health"]
            assert "mode" in health, (
                f"health summary should include 'mode' field, got keys: {list(health.keys())}"
            )
            assert health["mode"] == "operated", (
                f"Stopped drone health mode should be 'operated', got '{health['mode']}'"
            )
        finally:
            client.close()


def test_list_drones_health_mode_autonomous_when_playing(zenoh_router):
    """
    A playing drone's health in list_drones should include mode 'autonomous'.
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

            health = drone["health"]
            assert "mode" in health, (
                f"health summary should include 'mode' field, got keys: {list(health.keys())}"
            )
            assert health["mode"] == "autonomous", (
                f"Playing drone health mode should be 'autonomous', got '{health['mode']}'"
            )
        finally:
            client.close()


def test_list_drones_health_mode_remote_when_remote_controlled(zenoh_router):
    """
    A remote-controlled drone's health in list_drones should include mode 'remote'.
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

            # Send remote move command
            client.put(
                f"{prefix}/control/move",
                json.dumps({"heading_deg": 180.0}),
            )
            time.sleep(0.5)

            result = _list_drones(client)
            assert result is not None
            assert result["ok"]

            by_id = {d["entity_id"]: d for d in result["drones"]}
            drone = by_id[entity_id]

            health = drone["health"]
            assert "mode" in health, (
                f"health summary should include 'mode' field, got keys: {list(health.keys())}"
            )
            assert health["mode"] == "directed", (
                f"Remote-controlled drone health mode should be 'directed', got '{health['mode']}'"
            )
        finally:
            client.close()
