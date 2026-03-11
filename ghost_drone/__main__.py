"""
ghost_drone/__main__.py

Entry point for `python -m ghost_drone` and the `ghost-drone` CLI script.

Startup sequence (strict order — any failure exits before the simulator starts):
  1. Load and validate ghost_drone.toml  — hard exit on failure
  2. Print startup banner (subject warnings included)
  3. Probe zenoh endpoint              — hard exit if unreachable
  4. Start simulator (blocks until Ctrl+C)
"""

from ghost_drone.config import load_config
from ghost_drone.startup import print_startup_banner, probe_zenoh


def main() -> None:
    # 1. Load config — hard exit on missing file, invalid TOML, or missing keys
    cfg = load_config()

    # 2. Print startup banner (includes subject validation warnings)
    print_startup_banner(cfg)

    # 3. Probe zenoh — hard exit if the endpoint is unreachable
    probe_zenoh(cfg.zenoh_endpoint)

    # 4. Start simulator — this call blocks until interrupted
    from ghost_drone.server import run  # noqa: PLC0415  (import after startup checks)
    run(cfg)


if __name__ == "__main__":
    main()
