"""
E2E test: list active drones via the fleet manager.

SPEC behavior tested:
- All active drones are visible on the map with their current positions.

The fleet manager exposes a list_drones queryable that returns all active
drone entity_ids and their current positions, enabling the frontend to
discover and display all drones on the map.
"""

import json
import time
import threading

import pytest
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.fleet import FleetManager

_ROUTER_ENDPOINT = "tcp/127.0.0.1:17447"
_REALM = "ghost-drone"


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


def test_list_drones_empty_fleet(zenoh_router):
    """
    Querying list_drones with no spawned drones returns an empty list.
    """
    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM) as fleet:
        client = _make_client_session()
        try:
            result = _list_drones(client)
            assert result is not None, "No reply from list_drones"
            assert result["ok"] is True
            assert result["drones"] == []
        finally:
            client.close()


def test_list_drones_returns_spawned_drones(zenoh_router):
    """
    After spawning two drones, list_drones returns both with their
    entity_ids and positions.
    """
    spawn_a = (57.7069, 11.9381)
    spawn_b = (57.7100, 11.9500)

    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM) as fleet:
        client = _make_client_session()
        try:
            result_a = _spawn_drone(client, *spawn_a)
            assert result_a["ok"]
            id_a = result_a["entity_id"]

            result_b = _spawn_drone(client, *spawn_b)
            assert result_b["ok"]
            id_b = result_b["entity_id"]

            # Give drones a moment to start publishing
            time.sleep(0.5)

            result = _list_drones(client)
            assert result is not None, "No reply from list_drones"
            assert result["ok"] is True

            drones = result["drones"]
            assert len(drones) == 2

            # Build a lookup by entity_id
            by_id = {d["entity_id"]: d for d in drones}
            assert id_a in by_id, f"Drone {id_a} not in list"
            assert id_b in by_id, f"Drone {id_b} not in list"

            # Verify positions are close to spawn locations
            drone_a = by_id[id_a]
            assert abs(drone_a["lat"] - spawn_a[0]) < 0.01
            assert abs(drone_a["lng"] - spawn_a[1]) < 0.01

            drone_b = by_id[id_b]
            assert abs(drone_b["lat"] - spawn_b[0]) < 0.01
            assert abs(drone_b["lng"] - spawn_b[1]) < 0.01
        finally:
            client.close()
