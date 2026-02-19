"""
ghost_drone/__main__.py

Entry point for `python -m ghost_drone` and the `ghost-drone` CLI script.

Startup sequence (strict order — any failure exits before the server binds):
  1. Parse CLI args (--host, --port)
  2. Load and validate ghost_drone.toml  — hard exit on failure
  3. Print startup banner (subject warnings included)
  4. Probe zenoh endpoint              — hard exit if unreachable
  5. Schedule browser open (1-second timer)
  6. Start uvicorn server
"""

import argparse
import threading
import webbrowser

import uvicorn

from ghost_drone.config import load_config
from ghost_drone.startup import print_startup_banner, probe_zenoh


def main() -> None:
    parser = argparse.ArgumentParser(
        description="ghost-drone: simulated surface water drone publishing keelson telemetry via zenoh",
    )
    parser.add_argument(
        "--host",
        default="0.0.0.0",
        help="Bind host (default: 0.0.0.0)",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="Bind port (default: 8000)",
    )
    args = parser.parse_args()

    # 1. Load config — hard exit on missing file, invalid TOML, or missing keys
    cfg = load_config()

    # 2. Print startup banner (includes subject validation warnings)
    print_startup_banner(cfg, args.host, args.port)

    # 3. Probe zenoh — hard exit if the endpoint is unreachable
    probe_zenoh(cfg.zenoh_endpoint)

    # 4. Schedule browser open — 1-second delay gives uvicorn time to bind
    display_host = "127.0.0.1" if args.host == "0.0.0.0" else args.host
    url = f"http://{display_host}:{args.port}"
    threading.Timer(1.0, lambda: webbrowser.open(url)).start()

    # 5. Start server — this call blocks until the server is stopped
    from ghost_drone.server import create_app  # noqa: PLC0415  (import after startup checks)
    app = create_app(cfg)
    uvicorn.run(app, host=args.host, port=args.port)


if __name__ == "__main__":
    main()
