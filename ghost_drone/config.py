"""
ghost_drone/config.py

Reads ghost_drone.toml from the current working directory and returns an
AppConfig dataclass. Hard-exits with a human-readable message on any error
so the caller never has to handle exceptions.
"""

import sys
import tomllib
from dataclasses import dataclass
from pathlib import Path

CONFIG_PATH = Path("ghost_drone.toml")
REQUIRED_KEYS = ("zenoh_endpoint", "keelson_realm", "entity_id")


@dataclass
class AppConfig:
    zenoh_endpoint: str
    keelson_realm: str
    entity_id: str


def load_config() -> AppConfig:
    """
    Load and validate ghost_drone.toml from the current working directory.

    Returns an AppConfig on success.
    Calls sys.exit() with a human-readable message on failure — never raises.
    """
    if not CONFIG_PATH.exists():
        sys.exit(
            f"ERROR: Configuration file not found: {CONFIG_PATH.resolve()}\n"
            f"Create ghost_drone.toml in the current directory.\n"
            f"See ghost_drone.toml.example for the required format."
        )

    try:
        with CONFIG_PATH.open("rb") as f:
            raw = tomllib.load(f)
    except tomllib.TOMLDecodeError as e:
        sys.exit(f"ERROR: ghost_drone.toml is not valid TOML:\n  {e}")

    missing = [k for k in REQUIRED_KEYS if k not in raw]
    if missing:
        sys.exit(
            f"ERROR: ghost_drone.toml is missing required keys: {', '.join(missing)}\n"
            f"Required keys: {', '.join(REQUIRED_KEYS)}"
        )

    return AppConfig(
        zenoh_endpoint=raw["zenoh_endpoint"],
        keelson_realm=raw["keelson_realm"],
        entity_id=raw["entity_id"],
    )
