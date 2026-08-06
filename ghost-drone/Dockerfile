FROM ubuntu:24.04

ARG DEBIAN_FRONTEND=noninteractive

# Pin to a branch, tag, or commit SHA. Keelson tags carry NO "v" prefix —
# they are "0.5.3", "0.5.4", etc. "--branch v0.5.4" fails the clone outright.
# Note 0.5.4 is the first release containing the SimulationControl and
# VehicleSimulatorControl protos that sim_control.py imports; anything older
# builds cleanly and then dies at container start.
# Before bumping, the whole compatibility test is:
#   git diff --stat <new-tag> origin/main -- \
#     sdks/python/ connectors/mavlink/ connectors/platform/ connectors/entity_health/
ARG KEELSON_REF=0.5.4

# Runtime defaults — override via docker run -e or docker-compose environment.
# ENTITY_ID/SOURCE_ID match the "Ghost Drone (SITL)" entry in the Crowsnest
# platform registry, so the drone shows up in the UI without extra flags.
ENV VEHICLE_TYPE=motorboat
ENV ZENOH_CONNECT=tcp/localhost:7447
ENV SITL_HOME=57.7089,11.9746,0,270
ENV REALM=rise
ENV ENTITY_ID=drone-sim-01
ENV SOURCE_ID=mavlink

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    wget \
    git \
    iproute2 \
    && rm -rf /var/lib/apt/lists/*

# Download all ArduPilot SITL binaries so VEHICLE_TYPE can be chosen at runtime.
RUN wget -q "https://firmware.ardupilot.org/Rover/stable/SITL_x86_64_linux_gnu/ardurover" \
        -O /usr/local/bin/ardurover \
    && wget -q "https://firmware.ardupilot.org/Copter/stable/SITL_x86_64_linux_gnu/arducopter" \
        -O /usr/local/bin/arducopter \
    && wget -q "https://firmware.ardupilot.org/Plane/stable/SITL_x86_64_linux_gnu/arduplane" \
        -O /usr/local/bin/arduplane \
    && wget -q "https://firmware.ardupilot.org/Sub/stable/SITL_x86_64_linux_gnu/ardusub" \
        -O /usr/local/bin/ardusub \
    && chmod +x /usr/local/bin/ardurover /usr/local/bin/arducopter \
                /usr/local/bin/arduplane /usr/local/bin/ardusub

# Clone keelson at the requested ref.
# We keep the full clone so the connector bin/ scripts are available at runtime.
RUN git clone --depth 1 --branch "${KEELSON_REF}" \
        https://github.com/RISE-Maritime/keelson.git /app/keelson

# Generate protobuf Python bindings from the .proto definitions.
# The generate script calls `uv run protoc`; we install protoc-wheel-0 via pip
# (which puts `protoc` on PATH) and patch the script to call it directly.
RUN pip3 install --no-cache-dir --break-system-packages protoc-wheel-0 \
    && sed -i 's/uv run protoc/protoc/g' /app/keelson/sdks/python/generate_python.sh \
    && cd /app/keelson/sdks \
    && bash python/generate_python.sh

# Install keelson Python SDK + the three companion connectors.
# Order matters: keelson SDK must be installed before the connectors.
RUN python3 -m venv /app/venv \
    && /app/venv/bin/pip install --no-cache-dir \
        /app/keelson/sdks/python/ \
        /app/keelson/connectors/mavlink/ \
        /app/keelson/connectors/platform/ \
        /app/keelson/connectors/entity_health/

COPY config/ /config/
COPY entrypoint.sh /entrypoint.sh
COPY healthcheck.sh /healthcheck.sh
COPY sim_control.py /app/sim_control.py
RUN chmod +x /entrypoint.sh /healthcheck.sh

ENV PATH="/app/venv/bin:$PATH"

# Record which keelson this image was built against, so a published image is
# self-describing. Single source of truth is ARG KEELSON_REF above — the
# release workflow deliberately does not pass its own value, which would put
# the pin in two places that must be bumped together.
LABEL se.ri.keelson.ref="${KEELSON_REF}"

# Fail the BUILD, not the container, if the pinned keelson is missing anything
# we need at runtime. `python3` is the venv interpreter here (PATH above), so
# this exercises the same import path the entrypoint uses.
#   1. sim_control walks the SDK surface a bad pin breaks: the Simulation*
#      interfaces, SimulationStatus payload and scaffolding, plus zenoh/pymavlink.
#   2. --help on each connector walks its full import chain and argparse,
#      catching a missing transitive dependency sim_control alone would not.
RUN python3 -c "import sys; sys.path.insert(0, '/app'); import sim_control" \
    && for c in mavlink/bin/mavlink2keelson \
                platform/bin/platform-geometry2keelson \
                entity_health/bin/entity_health2keelson; do \
           echo "checking ${c}..." \
           && python3 "/app/keelson/connectors/${c}.py" --help > /dev/null; \
       done \
    && echo "build assertion passed (keelson ${KEELSON_REF})"

# Catches the one failure the entrypoint's supervisor cannot see: the router
# disappearing while every process stays alive. start-period covers the slow
# first boot (SITL bind, then connector startup) so it does not flap.
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD ["/healthcheck.sh"]

ENTRYPOINT ["/entrypoint.sh"]
