"""
ghost_drone/fleet.py

Fleet manager: spawns drone simulators dynamically via zenoh queryable.

Registers a realm-level queryable at {realm}/@v0/service/spawn_drone
that accepts {"lat": float, "lng": float} and creates a new drone
simulator with a unique entity_id positioned at that location.
"""

import contextlib
import json
import logging
import threading
import time
from typing import Dict

import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.server import SimHandle, start_simulator
from ghost_drone.simulation.models import SimState

logger = logging.getLogger(__name__)


class FleetManager:
    """Manages dynamically spawned drone simulators.

    Usage::

        with FleetManager(zenoh_endpoint="tcp/...", realm="rise") as fleet:
            # fleet is now listening for spawn_drone requests
            ...
    """

    def __init__(self, zenoh_endpoint: str, realm: str) -> None:
        self._endpoint = zenoh_endpoint
        self._realm = realm
        self._lock = threading.Lock()
        self._counter = 0
        self._drones: Dict[str, tuple] = {}  # entity_id -> (handle, exit_stack)
        self._session = None
        self._queryable = None
        self._list_queryable = None

    def __enter__(self):
        self._start()
        return self

    def __exit__(self, *exc):
        self._stop()

    def _start(self) -> None:
        conf = zenoh.Config.from_json5(
            json.dumps({
                "mode": "client",
                "connect": {"endpoints": [self._endpoint]},
            })
        )
        self._session = zenoh.open(conf)
        time.sleep(0.1)

        spawn_key = f"{self._realm}/@v0/service/spawn_drone"
        self._queryable = self._session.declare_queryable(spawn_key, self._on_spawn)
        logger.info("FleetManager: listening on %s", spawn_key)

        list_key = f"{self._realm}/@v0/service/list_drones"
        self._list_queryable = self._session.declare_queryable(list_key, self._on_list)
        logger.info("FleetManager: listening on %s", list_key)

    def _stop(self) -> None:
        with self._lock:
            for entity_id, (handle, exit_stack) in list(self._drones.items()):
                exit_stack.__exit__(None, None, None)
            self._drones.clear()

        if hasattr(self, '_list_queryable') and self._list_queryable is not None:
            self._list_queryable.undeclare()
        if self._queryable is not None:
            self._queryable.undeclare()
        if self._session is not None:
            self._session.close()

    def _on_spawn(self, query: zenoh.Query) -> None:
        try:
            payload_bytes = bytes(query.payload) if query.payload is not None else b""
            if not payload_bytes:
                query.reply(query.key_expr, json.dumps({
                    "ok": False, "error": "empty payload",
                }))
                return

            msg = json.loads(payload_bytes)
            lat = msg.get("lat")
            lng = msg.get("lng")

            if lat is None or lng is None:
                query.reply(query.key_expr, json.dumps({
                    "ok": False, "error": "lat and lng are required",
                }))
                return

            try:
                lat = float(lat)
                lng = float(lng)
            except (TypeError, ValueError) as e:
                query.reply(query.key_expr, json.dumps({
                    "ok": False, "error": f"invalid coordinates: {e}",
                }))
                return

            with self._lock:
                self._counter += 1
                entity_id = f"drone-{self._counter}"

            cfg = AppConfig(
                zenoh_endpoint=self._endpoint,
                keelson_realm=self._realm,
                entity_id=entity_id,
            )

            # Start the simulator using a contextlib.ExitStack to manage its lifecycle
            exit_stack = contextlib.ExitStack()
            handle = exit_stack.enter_context(start_simulator(cfg))

            # Wait for the publisher session to be ready
            deadline = time.monotonic() + 5.0
            while time.monotonic() < deadline:
                if handle.publisher.session_ready.is_set():
                    break
                time.sleep(0.05)

            # Set the drone's home position
            handle.sim.engine.set_home(lat, lng)

            with self._lock:
                self._drones[entity_id] = (handle, exit_stack)

            query.reply(query.key_expr, json.dumps({
                "ok": True, "entity_id": entity_id,
            }))
            logger.info("FleetManager: spawned %s at (%.4f, %.4f)", entity_id, lat, lng)

        except Exception:
            logger.exception("FleetManager: spawn error")
            try:
                query.reply(query.key_expr, json.dumps({
                    "ok": False, "error": "internal error",
                }))
            except Exception:
                pass

    def _on_list(self, query: zenoh.Query) -> None:
        try:
            with self._lock:
                drones = []
                for entity_id, (handle, _exit_stack) in self._drones.items():
                    lat, lng = handle.sim.engine.position
                    wps = handle.sim.engine.waypoints
                    speed = handle.sim.cruise_speed_mps if handle.sim.engine.state == SimState.PLAYING else 0.0
                    drones.append({
                        "entity_id": entity_id,
                        "lat": lat,
                        "lng": lng,
                        "heading": handle.sim.engine.heading,
                        "speed": speed,
                        "state": handle.sim.engine.state.value,
                        "route": [list(wp) for wp in wps] if wps else None,
                    })
            query.reply(query.key_expr, json.dumps({"ok": True, "drones": drones}))
        except Exception:
            logger.exception("FleetManager: list_drones error")
            try:
                query.reply(query.key_expr, json.dumps({
                    "ok": False, "error": "internal error",
                }))
            except Exception:
                pass
