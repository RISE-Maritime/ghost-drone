#!/bin/bash
set -euo pipefail

# ── Configuration (all overridable via docker -e) ────────────────────────────
VEHICLE_TYPE="${VEHICLE_TYPE:-rover}"
ZENOH_CONNECT="${ZENOH_CONNECT:-tcp/localhost:7447}"
SITL_HOME="${SITL_HOME:-57.7089,11.9746,0,270}"
REALM="${REALM:-rise}"
ENTITY_ID="${ENTITY_ID:-drone-01}"
SOURCE_ID="${SOURCE_ID:-sitl}"
# pymavlink URL — tcp:HOST:PORT or udpin:0.0.0.0:PORT
MAVLINK_URL="${MAVLINK_URL:-tcp:localhost:5760}"
# MAVLink system ID of the autopilot (ArduPilot SITL defaults to 1)
TARGET_SYSTEM="${TARGET_SYSTEM:-1}"

echo "[ghost-drone] vehicle=${VEHICLE_TYPE} entity=${REALM}/${ENTITY_ID} zenoh=${ZENOH_CONNECT}"

# ── Select ArduPilot SITL binary and frame ───────────────────────────────────
case "${VEHICLE_TYPE}" in
    rover)
        SITL_BINARY="ardurover"; SITL_MODEL="rover" ;;
    motorboat|boat)
        SITL_BINARY="ardurover"; SITL_MODEL="motorboat" ;;
    sailboat)
        SITL_BINARY="ardurover"; SITL_MODEL="sailboat" ;;
    copter)
        SITL_BINARY="arducopter"; SITL_MODEL="+" ;;
    plane)
        SITL_BINARY="arduplane"; SITL_MODEL="plane" ;;
    sub)
        SITL_BINARY="ardusub"; SITL_MODEL="vectored" ;;
    *)
        echo "[ghost-drone] ERROR: unknown VEHICLE_TYPE '${VEHICLE_TYPE}'" >&2
        exit 1 ;;
esac

# ── Start ArduPilot SITL ─────────────────────────────────────────────────────
PARAM_FILE="/config/${VEHICLE_TYPE}/defaults.parm"
SITL_DIR="/tmp/sitl-${VEHICLE_TYPE}"
mkdir -p "${SITL_DIR}"
cd "${SITL_DIR}"

SITL_ARGS=(-S --model "${SITL_MODEL}" --home "${SITL_HOME}" --speedup 1)
[ -f "${PARAM_FILE}" ] && SITL_ARGS+=(--defaults "${PARAM_FILE}")

echo "[ghost-drone] Starting SITL: ${SITL_BINARY} model=${SITL_MODEL}"
"/usr/local/bin/${SITL_BINARY}" "${SITL_ARGS[@]}" &
SITL_PID=$!

# Wait for SITL to bind its TCP port using ss (not nc — nc would consume the
# connection slot and cause SITL to move to the next serial port).
SITL_PORT="${MAVLINK_URL##*:}"
echo "[ghost-drone] Waiting for SITL on port ${SITL_PORT}..."
for i in $(seq 1 30); do
    if ss -tlnH "sport = :${SITL_PORT}" 2>/dev/null | grep -q .; then
        echo "[ghost-drone] SITL ready"; break
    fi
    if ! kill -0 "${SITL_PID}" 2>/dev/null; then
        echo "[ghost-drone] ERROR: SITL process died" >&2; exit 1
    fi
    sleep 1
done

# ── Start keelson connectors ─────────────────────────────────────────────────
KEELSON_COMMON=(--mode client --connect "${ZENOH_CONNECT}" --realm "${REALM}" --entity-id "${ENTITY_ID}")

# keelson-connector-mavlink
# Bridges MAVLink telemetry from SITL into keelson/zenoh subjects
python3 /app/keelson/connectors/mavlink/bin/mavlink2keelson.py \
    "${KEELSON_COMMON[@]}" \
    --source-id "${SOURCE_ID}" \
    --mavlink-url "${MAVLINK_URL}" \
    --target-system "${TARGET_SYSTEM}" &
MAVLINK_PID=$!
echo "[ghost-drone] keelson-connector-mavlink started (pid=${MAVLINK_PID})"

# sim_control connects to SITL's second serial port (5762), which ArduPilot
# only opens after the first client (mavlink2keelson) connects to 5760.
# Give it a moment, then start sim_control — it has its own retry loop.
sleep 3
python3 /app/sim_control.py \
    --mode client --connect "${ZENOH_CONNECT}" \
    --realm "${REALM}" \
    --entity-id "${ENTITY_ID}" \
    --source-id "${SOURCE_ID}" \
    --mavlink-url "tcp:localhost:5762" \
    --target-system "${TARGET_SYSTEM}" &
echo "[ghost-drone] sim_control started (pid=$!)"

# keelson-connector-platform
# Publishes static platform geometry (hull, sensor positions)
# Requires a config JSON — see /config/<VEHICLE_TYPE>/platform.json
if [ -f "/config/${VEHICLE_TYPE}/platform.json" ]; then
    python3 /app/keelson/connectors/platform/bin/platform-geometry2keelson.py \
        "${KEELSON_COMMON[@]}" \
        --source-id "${SOURCE_ID}" \
        --config "/config/${VEHICLE_TYPE}/platform.json" &
    echo "[ghost-drone] keelson-connector-platform started"
else
    echo "[ghost-drone] WARN: /config/${VEHICLE_TYPE}/platform.json not found — platform connector skipped"
fi

# keelson-connector-entity-health
# Monitors zenoh publication rates and reports entity health
# Requires a config JSON — see /config/<VEHICLE_TYPE>/entity_health.json
if [ -f "/config/${VEHICLE_TYPE}/entity_health.json" ]; then
    python3 /app/keelson/connectors/entity_health/bin/entity_health2keelson.py \
        "${KEELSON_COMMON[@]}" \
        --source-id "${SOURCE_ID}" \
        --config "/config/${VEHICLE_TYPE}/entity_health.json" &
    echo "[ghost-drone] keelson-connector-entity-health started"
else
    echo "[ghost-drone] WARN: /config/${VEHICLE_TYPE}/entity_health.json not found — entity-health connector skipped"
fi

# ── Wait (keep container alive until SITL exits) ─────────────────────────────
wait "${SITL_PID}"
