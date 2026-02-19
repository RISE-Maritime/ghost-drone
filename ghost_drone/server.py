"""
ghost_drone/server.py

FastAPI application definition.

STATIC_DIR resolves relative to this file so it works whether the package is
installed in a venv or run in-place from the project root.

API routes (including /ws WebSocket) are declared before the static mount
so they are not shadowed. The static mount at "/" is added last.
With html=True, GET / serves static/index.html automatically.
"""

import asyncio
import json
from pathlib import Path

from fastapi import FastAPI, WebSocket, WebSocketDisconnect

from ghost_drone.simulation.engine import SimEngine, TICK_HZ

# Resolves to <project-root>/static/ regardless of where the process is invoked from.
STATIC_DIR = Path(__file__).parent.parent / "static"

app = FastAPI(title="ghost-drone")


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    engine = SimEngine()
    cruise_speed_mps = 10.0  # default, updated by set_speed messages

    async def receive_loop():
        nonlocal cruise_speed_mps
        try:
            async for text in websocket.iter_text():
                msg = json.loads(text)
                t = msg.get("type")
                if t == "load_route":
                    wps = [tuple(p) for p in msg["waypoints"]]
                    try:
                        engine.load_route(wps)
                    except ValueError:
                        pass  # fewer than 2 waypoints — ignore
                elif t == "play":
                    engine.play()
                elif t == "pause":
                    engine.pause()
                elif t == "stop":
                    engine.stop()
                elif t == "set_speed":
                    cruise_speed_mps = float(msg.get("value", cruise_speed_mps))
        except WebSocketDisconnect:
            pass

    async def tick_loop():
        dt = 1.0 / TICK_HZ
        try:
            while True:
                frame = engine.tick(dt, cruise_speed_mps=cruise_speed_mps)
                await websocket.send_text(json.dumps(frame.to_dict()))
                await asyncio.sleep(dt)
        except (WebSocketDisconnect, Exception):
            pass

    await asyncio.gather(receive_loop(), tick_loop())


# StaticFiles mount LAST — declared here so the /ws route above is not shadowed.
# html=True makes GET / serve static/index.html (satisfies SETUP-02).
from fastapi.staticfiles import StaticFiles  # noqa: E402  (intentionally after routes)

app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
