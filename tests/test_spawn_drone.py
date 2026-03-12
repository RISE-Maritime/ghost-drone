"""
E2E test: spawn a drone dynamically via the fleet manager.

SPEC behavior tested:
- When a user clicks on the map, a new drone is spawned at that location
  with a unique entity_id.

Sends a spawn_drone request to the fleet manager and verifies a new drone
simulator is created, publishes sim_frame under its own entity_id, and
reports its initial position at the requested location.
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


def test_spawn_drone_creates_new_entity(zenoh_router):
    """
    Sending a spawn_drone request creates a new drone simulator that
    publishes sim_frame under a unique entity_id.
    """
    spawn_lat, spawn_lng = 57.7069, 11.9381

    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM) as fleet:
        client = _make_client_session()
        try:
            # Spawn a drone
            replies = client.get(
                f"{_REALM}/@v0/service/spawn_drone",
                payload=json.dumps({"lat": spawn_lat, "lng": spawn_lng}).encode(),
                timeout=5,
            )
            result = None
            for reply in replies:
                result = json.loads(bytes(reply.ok.payload))
            assert result is not None, "No reply from spawn_drone"
            assert result["ok"], f"spawn_drone failed: {result}"

            entity_id = result["entity_id"]
            assert entity_id, "entity_id must not be empty"

            # Wait for the spawned drone to publish sim_frame
            frames = []
            lock = threading.Lock()
            prefix = f"{_REALM}/@v0/{entity_id}"

            def on_frame(sample):
                with lock:
                    frames.append(json.loads(bytes(sample.payload)))

            sub = client.declare_subscriber(
                f"{prefix}/pubsub/sim_frame/engine/0", on_frame
            )

            time.sleep(1.5)
            sub.undeclare()

            with lock:
                assert len(frames) > 0, (
                    f"Drone {entity_id} did not publish any sim_frame messages"
                )
                # The drone should be at the spawn location (within noise tolerance)
                last = frames[-1]
                assert abs(last["lat"] - spawn_lat) < 0.01, (
                    f"Drone lat {last['lat']} too far from spawn {spawn_lat}"
                )
                assert abs(last["lng"] - spawn_lng) < 0.01, (
                    f"Drone lng {last['lng']} too far from spawn {spawn_lng}"
                )
                assert last["state"] == "stopped", (
                    f"Newly spawned drone should be stopped, got {last['state']}"
                )
        finally:
            client.close()


def test_spawn_two_drones_get_unique_ids(zenoh_router):
    """
    Spawning two drones produces different entity_ids, and both publish
    sim_frame independently.
    """
    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM) as fleet:
        client = _make_client_session()
        try:
            ids = []
            for lat, lng in [(57.70, 11.93), (57.71, 11.94)]:
                replies = client.get(
                    f"{_REALM}/@v0/service/spawn_drone",
                    payload=json.dumps({"lat": lat, "lng": lng}).encode(),
                    timeout=5,
                )
                for reply in replies:
                    result = json.loads(bytes(reply.ok.payload))
                    assert result["ok"]
                    ids.append(result["entity_id"])

            assert len(ids) == 2
            assert ids[0] != ids[1], "Spawned drones must have unique entity_ids"

            # Verify both publish sim_frame
            seen = {ids[0]: False, ids[1]: False}
            lock = threading.Lock()

            def on_sample(sample):
                key = str(sample.key_expr)
                with lock:
                    for eid in ids:
                        if eid in key:
                            seen[eid] = True

            sub = client.declare_subscriber(
                f"{_REALM}/@v0/**/sim_frame/**", on_sample
            )

            time.sleep(1.5)
            sub.undeclare()

            with lock:
                for eid in ids:
                    assert seen[eid], (
                        f"Drone {eid} did not publish any sim_frame"
                    )
        finally:
            client.close()


def test_spawn_drone_rejects_missing_coordinates(zenoh_router):
    """
    Spawning a drone without lat/lng is rejected with an error.
    """
    with FleetManager(zenoh_endpoint=_ROUTER_ENDPOINT, realm=_REALM) as fleet:
        client = _make_client_session()
        try:
            replies = client.get(
                f"{_REALM}/@v0/service/spawn_drone",
                payload=json.dumps({}).encode(),
                timeout=5,
            )
            result = None
            for reply in replies:
                result = json.loads(bytes(reply.ok.payload))
            assert result is not None
            assert result["ok"] is False
            assert "error" in result
        finally:
            client.close()
