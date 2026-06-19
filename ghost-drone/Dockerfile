FROM ubuntu:24.04

ARG DEBIAN_FRONTEND=noninteractive

# Pin to a branch, tag, or commit SHA.
# Use "main" for latest; set to a tag like "v0.5.3" for a stable pin.
ARG KEELSON_REF=main

# Runtime defaults — override via docker run -e or docker-compose environment.
ENV VEHICLE_TYPE=rover
ENV ZENOH_CONNECT=tcp/localhost:7447
ENV SITL_HOME=57.7089,11.9746,0,270
ENV REALM=rise
ENV ENTITY_ID=drone-01
ENV SOURCE_ID=sitl

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
COPY sim_control.py /app/sim_control.py
RUN chmod +x /entrypoint.sh

ENV PATH="/app/venv/bin:$PATH"

ENTRYPOINT ["/entrypoint.sh"]
