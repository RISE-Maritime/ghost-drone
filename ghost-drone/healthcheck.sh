#!/bin/bash
# Reports whether this container still has a live connection to the Zenoh router.
#
# Why this exists separately from the entrypoint's supervisor: no keelson
# connector exits when the router goes away. Zenoh client mode retries the
# connect in the background forever, so zenoh.open() succeeds with no router at
# all and the connectors then publish into the void, alive and healthy-looking.
# The supervisor catches process death; this catches the router vanishing
# underneath live processes. Neither covers the other.
#
# Limitation: this is a TCP-liveness check. A non-TCP ZENOH_CONNECT (quic/udp)
# cannot be verified this way and is reported healthy rather than falsely
# failed — see the `case` below.
set -uo pipefail

ZENOH_CONNECT="${ZENOH_CONNECT:-tcp/localhost:7447}"

case "${ZENOH_CONNECT}" in
    tcp/* | tls/*) ;;
    *)
        echo "healthcheck: '${ZENOH_CONNECT}' is not a TCP endpoint — not verifiable, reporting healthy"
        exit 0
        ;;
esac

# tcp/localhost:7447 -> 7447 ; also handles tcp/[::1]:7447
PORT="${ZENOH_CONNECT##*:}"
if ! [[ "${PORT}" =~ ^[0-9]+$ ]]; then
    echo "healthcheck: no port in ZENOH_CONNECT='${ZENOH_CONNECT}' — not verifiable, reporting healthy"
    exit 0
fi

# ss exits 0 even with no matches, so test for output rather than status.
if [ -n "$(ss -tnH state established "dport = :${PORT}" 2>/dev/null)" ]; then
    exit 0
fi

echo "healthcheck: no established connection to the Zenoh router on port ${PORT}" >&2
exit 1
