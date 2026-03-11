"""
ghost_drone/proto

Custom protobuf messages and keelson subject registration for ghost-drone.
"""

from __future__ import annotations

from pathlib import Path

import keelson

_HERE = Path(__file__).parent

SUBJECTS_YAML = _HERE / "subjects.yaml"
DESCRIPTOR_SET = _HERE / "entity_health.bin"


def register_custom_subjects() -> None:
    """Register ghost-drone custom subjects with keelson."""
    keelson.add_well_known_subjects_and_proto_definitions(
        SUBJECTS_YAML, DESCRIPTOR_SET,
    )
