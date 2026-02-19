#!/usr/bin/env bash
# generate_keelson_protos.sh
#
# Generates Python protobuf stubs for the keelson SDK.
#
# The keelson dev branch does not commit pre-generated protobuf files.
# This script must be run once after `uv sync --all-extras` to compile
# the stubs into the installed keelson package in the local .venv.
#
# Usage:
#   uv run bash scripts/generate_keelson_protos.sh
#
# Requirements:
#   - uv sync --all-extras must have been run first (installs protoc-wheel-0)
#   - The keelson git source must be in the uv cache (done automatically by uv sync)
#
# This workaround is needed because:
#   1. keelson 0.5.0a9 is not published on PyPI (only 0.4.x is)
#   2. The dev branch stores .proto files but not the generated _pb2.py files
#   3. hatchling does not support custom build hooks for generating protos

set -euo pipefail

echo "==> Locating keelson git checkout in uv cache..."

# Find the keelson source in the uv cache
KEELSON_CACHE=$(find ~/.cache/uv/git-v0/checkouts -name "e47e52f" -type d 2>/dev/null | head -1)
if [ -z "$KEELSON_CACHE" ]; then
    echo "ERROR: keelson git checkout not found in uv cache."
    echo "       Run 'uv sync --all-extras' first to download keelson."
    exit 1
fi

KEELSON_SRC="$KEELSON_CACHE"
echo "    Found: $KEELSON_SRC"

# Find the installed keelson package directory in the active venv
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VENV_DIR="$SCRIPT_DIR/../.venv"
KEELSON_PKG=$(python3 -c "import keelson; import os; print(os.path.dirname(keelson.__file__))" 2>/dev/null || true)

if [ -z "$KEELSON_PKG" ]; then
    # Fallback: find by glob
    KEELSON_PKG=$(find "$VENV_DIR/lib" -name "__init__.py" -path "*/keelson/__init__.py" | head -1 | xargs dirname)
fi

if [ -z "$KEELSON_PKG" ]; then
    echo "ERROR: keelson package directory not found in .venv."
    echo "       Run 'uv sync --all-extras' first."
    exit 1
fi

echo "==> Generating into: $KEELSON_PKG"

# Copy subjects.yaml
echo "    Copying subjects.yaml..."
cp -f "$KEELSON_SRC/messages/subjects.yaml" "$KEELSON_PKG/subjects.yaml"

# Generate Envelope.proto
echo "    Generating Envelope_pb2.py..."
uv run protoc \
    --python_out="$KEELSON_PKG" \
    --pyi_out="$KEELSON_PKG" \
    --proto_path="$KEELSON_SRC/messages" \
    "$KEELSON_SRC/messages/Envelope.proto"

# Create payload directories
mkdir -p "$KEELSON_PKG/payloads/foxglove"
mkdir -p "$KEELSON_PKG/interfaces"

# Generate payload protos
echo "    Generating payloads/*_pb2.py..."
uv run protoc \
    --python_out="$KEELSON_PKG/payloads" \
    --pyi_out="$KEELSON_PKG/payloads" \
    --proto_path="$KEELSON_SRC/messages/payloads" \
    --descriptor_set_out="$KEELSON_PKG/payloads/protobuf_file_descriptor_set.bin" \
    --include_imports \
    "$KEELSON_SRC/messages/payloads"/*.proto \
    "$KEELSON_SRC/messages/payloads/foxglove"/*.proto

# Post-process foxglove imports (the generated code uses relative imports)
sed -E -i 's/^from foxglove import/from . import/g' "$KEELSON_PKG/payloads/foxglove/"*_pb2.py 2>/dev/null || true
sed -E -i 's/^from foxglove import/from .foxglove import/g' "$KEELSON_PKG/payloads/"*_pb2.py 2>/dev/null || true

# Create package markers
touch "$KEELSON_PKG/payloads/__init__.py"
touch "$KEELSON_PKG/payloads/foxglove/__init__.py"

# Generate interface protos if they exist
if ls "$KEELSON_SRC/interfaces/"*.proto &>/dev/null; then
    echo "    Generating interfaces/*_pb2.py..."
    uv run protoc \
        --python_out="$KEELSON_PKG/interfaces" \
        --pyi_out="$KEELSON_PKG/interfaces" \
        --proto_path="$KEELSON_SRC/interfaces" \
        "$KEELSON_SRC/interfaces"/*.proto
fi
touch "$KEELSON_PKG/interfaces/__init__.py"

echo "==> Verifying..."
uv run python -c "import keelson; print('keelson OK:', keelson.is_subject_well_known('heading_true_north_deg'))"

echo "==> Done. keelson protobuf stubs generated successfully."
