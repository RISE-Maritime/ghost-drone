"""
ghost_drone/startup.py

Startup utilities: zenoh connectivity probe and startup banner printer.

probe_zenoh() hard-exits if the configured zenoh endpoint is unreachable.
print_startup_banner() prints a summary of the loaded configuration and emits
visible warnings for any unrecognised keelson subjects — but does NOT exit
(user decision overriding roadmap criterion 4; see PLAN 01-01 conflict note).
"""

import sys

import keelson
import zenoh

from ghost_drone.config import AppConfig
from ghost_drone.proto import register_custom_subjects

# Register ghost-drone custom protobuf subjects with keelson
# so that entity_health is recognised as a well-known subject.
register_custom_subjects()

# Subjects checked against the keelson subject registry at startup.
PHASE_SUBJECTS = [
    "heading_true_north_deg",
    "entity_health",
]


def probe_zenoh(endpoint: str) -> None:
    """
    Attempt to open a zenoh session with the configured endpoint.

    Uses a 3-second unicast open timeout so the probe fails fast when the
    router is not reachable. Catches Exception broadly because zenoh 1.x
    does not document the specific exception type raised on timeout/failure.

    Hard-exits via sys.exit() if the endpoint is unreachable.
    """
    conf_str = (
        f'{{"connect": {{"endpoints": ["{endpoint}"]}}, '
        f'"transport": {{"unicast": {{"open_timeout": 3000}}}}}}'
    )
    try:
        print(f"Connecting to zenoh router at {endpoint} ...")
        conf = zenoh.Config.from_json5(conf_str)
        with zenoh.open(conf):
            pass  # Session opened successfully; close immediately
        print(f"Connected to zenoh router at {endpoint}")
    except Exception as e:
        sys.exit(
            f"ERROR: Cannot reach zenoh endpoint '{endpoint}'\n"
            f"  {type(e).__name__}: {e}\n"
            f"Is the zenoh router running? "
            f"Check the zenoh_endpoint in ghost_drone.toml."
        )


def print_startup_banner(cfg: AppConfig) -> None:
    """
    Print a 60-character bordered startup banner showing loaded configuration.

    If any PHASE_SUBJECTS are not registered in the keelson subject registry,
    a WARNINGS block is included inside the banner. The process continues
    regardless — this is a warning-only path (not a hard exit).
    """
    unknown_subjects = [
        s for s in PHASE_SUBJECTS if not keelson.is_subject_well_known(s)
    ]

    print("=" * 60)
    print("  ghost-drone")
    print("=" * 60)
    print(f"  Zenoh endpoint : {cfg.zenoh_endpoint}")
    print(f"  Realm          : {cfg.keelson_realm}")
    print(f"  Entity ID      : {cfg.entity_id}")

    if unknown_subjects:
        print()
        print("  WARNINGS:")
        for subject in unknown_subjects:
            print(f"    [UNKNOWN SUBJECT] '{subject}' is not in the keelson subject registry.")
            print(f"    Publishing will proceed but this subject may be unrecognised")
            print(f"    by keelson consumers. Check subjects.yaml for valid names.")

    print("=" * 60)
