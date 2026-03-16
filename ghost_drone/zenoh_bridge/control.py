"""
ghost_drone/zenoh_bridge/control.py

Zenoh control handlers: subscribers for fire-and-forget commands,
queryables for request-response operations.

Called from the ZenohPublisher thread after the session is opened.
"""

import json
import logging

import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.sim_state import FAULT_TYPES, SimGlobals
from ghost_drone.simulation.models import OperationMode

logger = logging.getLogger(__name__)


def register_control_handlers(
    session: zenoh.Session,
    cfg: AppConfig,
    sim: SimGlobals,
) -> list:
    """Register all zenoh subscribers and queryables for frontend control.

    Returns a list of declared resources so the caller can keep them alive.
    """
    prefix = cfg.keelson_prefix
    declared: list = []

    # --- Pub/Sub control subscribers ---

    def on_play(sample: zenoh.Sample) -> None:
        logger.debug("control/play received")
        sim.engine.play()

    def on_pause(sample: zenoh.Sample) -> None:
        logger.debug("control/pause received")
        sim.engine.pause()

    def on_stop(sample: zenoh.Sample) -> None:
        logger.debug("control/stop received")
        sim.engine.stop()

    def on_set_speed(sample: zenoh.Sample) -> None:
        try:
            payload = json.loads(bytes(sample.payload))
            sim.cruise_speed_mps = float(payload.get("value", sim.cruise_speed_mps))
            logger.debug("control/set_speed -> %.1f m/s", sim.cruise_speed_mps)
        except Exception:
            logger.warning("control/set_speed: bad payload")

    def on_move(sample: zenoh.Sample) -> None:
        try:
            payload = json.loads(bytes(sample.payload))
            heading_deg = float(payload.get("heading_deg", 0.0))
            sim.engine.remote_move(heading_deg)
            logger.debug("control/move -> heading %.1f°", heading_deg)
        except Exception:
            logger.warning("control/move: bad payload")

    def on_cancel_remote(sample: zenoh.Sample) -> None:
        logger.debug("control/cancel_remote received")
        sim.engine.cancel_remote()

    declared.append(session.declare_subscriber(f"{prefix}/control/play", on_play))
    declared.append(session.declare_subscriber(f"{prefix}/control/pause", on_pause))
    declared.append(session.declare_subscriber(f"{prefix}/control/stop", on_stop))
    declared.append(session.declare_subscriber(f"{prefix}/control/set_speed", on_set_speed))
    declared.append(session.declare_subscriber(f"{prefix}/control/move", on_move))
    declared.append(session.declare_subscriber(f"{prefix}/control/cancel_remote", on_cancel_remote))

    def on_set_mode(sample: zenoh.Sample) -> None:
        try:
            payload = json.loads(bytes(sample.payload))
            mode_str = payload.get("mode", "autonomous")
            try:
                mode = OperationMode(mode_str)
            except ValueError:
                logger.warning("control/set_mode: unknown mode %r", mode_str)
                return
            sim.engine.set_mode(mode)
            logger.debug("control/set_mode -> %s", mode.value)
        except Exception:
            logger.warning("control/set_mode: bad payload")

    def on_manual_control(sample: zenoh.Sample) -> None:
        try:
            payload = json.loads(bytes(sample.payload))
            rudder_deg = float(payload.get("rudder_deg", 0.0))
            engine = float(payload.get("engine", 0.0))
            sim.engine.manual_control(rudder_deg, engine)
            logger.debug("control/manual -> rudder %.1f°, engine %.2f", rudder_deg, engine)
        except Exception:
            logger.warning("control/manual: bad payload")

    declared.append(session.declare_subscriber(f"{prefix}/control/set_mode", on_set_mode))
    declared.append(session.declare_subscriber(f"{prefix}/control/manual", on_manual_control))

    # --- Queryable: load_route ---

    def on_load_route(query: zenoh.Query) -> None:
        try:
            payload_bytes = bytes(query.payload) if query.payload is not None else b""
            if not payload_bytes:
                query.reply(query.key_expr, json.dumps({"ok": False, "error": "empty payload"}))
                return

            msg = json.loads(payload_bytes)
            raw_wps = msg.get("waypoints")
            if not isinstance(raw_wps, list):
                query.reply(query.key_expr, json.dumps({
                    "ok": False, "error": "waypoints must be a JSON array",
                }))
                return
            try:
                wps = [(float(p[0]), float(p[1])) for p in raw_wps]
            except (TypeError, ValueError, IndexError) as e:
                query.reply(query.key_expr, json.dumps({
                    "ok": False, "error": f"invalid waypoint coordinates: {e}",
                }))
                return
            try:
                sim.engine.load_route(wps)
                query.reply(query.key_expr, json.dumps({"ok": True}))
                logger.info("load_route: accepted %d waypoints", len(wps))
            except ValueError as e:
                query.reply(query.key_expr, json.dumps({"ok": False, "error": str(e)}))
                logger.warning("load_route: rejected — %s", e)
        except Exception:
            logger.exception("load_route: handler error")

    declared.append(session.declare_queryable(f"{prefix}/service/load_route", on_load_route))

    # --- Queryable: settings ---

    def on_settings(query: zenoh.Query) -> None:
        try:
            payload_bytes = bytes(query.payload) if query.payload is not None else b""
            if not payload_bytes:
                # GET with no body — return current settings
                query.reply(query.key_expr, json.dumps(sim.settings.to_dict()))
                logger.debug("settings: returned current values")
            else:
                # Update settings
                msg = json.loads(payload_bytes)
                sim.apply_settings(msg)
                query.reply(query.key_expr, json.dumps(sim.settings.to_dict()))
                logger.info("settings: updated and replied")
        except Exception:
            logger.exception("settings: handler error")

    declared.append(session.declare_queryable(f"{prefix}/service/settings", on_settings))

    # --- Queryable: fault injection ---

    def on_fault(query: zenoh.Query) -> None:
        try:
            payload_bytes = bytes(query.payload) if query.payload is not None else b""
            if not payload_bytes:
                # No payload — return current fault state
                query.reply(query.key_expr, json.dumps({"ok": True, "faults": sim.faults.all_faults()}))
                return

            msg = json.loads(payload_bytes)
            action = msg.get("action")
            subject = msg.get("subject", "")
            fault_type = msg.get("fault_type", "")

            if fault_type not in FAULT_TYPES:
                query.reply(query.key_expr, json.dumps({
                    "ok": False,
                    "error": f"unknown fault type: {fault_type!r}, must be one of {sorted(FAULT_TYPES)}",
                }))
                return

            if subject not in sim.settings.subjects:
                query.reply(query.key_expr, json.dumps({
                    "ok": False,
                    "error": f"unknown subject: {subject!r}",
                }))
                return

            if action == "inject":
                sim.faults.inject(subject, fault_type)
                logger.info("fault: injected %s on %s", fault_type, subject)
                query.reply(query.key_expr, json.dumps({"ok": True, "faults": sim.faults.all_faults()}))
            elif action == "clear":
                sim.faults.clear(subject, fault_type)
                logger.info("fault: cleared %s on %s", fault_type, subject)
                query.reply(query.key_expr, json.dumps({"ok": True, "faults": sim.faults.all_faults()}))
            else:
                query.reply(query.key_expr, json.dumps({
                    "ok": False,
                    "error": f"unknown action: {action!r}, must be 'inject' or 'clear'",
                }))
        except Exception:
            logger.exception("fault: handler error")

    declared.append(session.declare_queryable(f"{prefix}/service/fault", on_fault))

    # --- Queryable: set_home (relocate stopped drone) ---

    def on_set_home(query: zenoh.Query) -> None:
        try:
            payload_bytes = bytes(query.payload) if query.payload is not None else b""
            if not payload_bytes:
                query.reply(query.key_expr, json.dumps({"ok": False, "error": "empty payload"}))
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

            sim.engine.set_home(lat, lng)
            query.reply(query.key_expr, json.dumps({"ok": True}))
            logger.info("set_home: moved to (%.4f, %.4f)", lat, lng)
        except Exception:
            logger.exception("set_home: handler error")

    declared.append(session.declare_queryable(f"{prefix}/service/set_home", on_set_home))

    logger.info("Registered control handlers on prefix %s", prefix)
    return declared
