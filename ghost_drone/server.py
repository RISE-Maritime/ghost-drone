"""
ghost_drone/server.py

FastAPI application definition.

STATIC_DIR resolves relative to this file so it works whether the package is
installed in a venv or run in-place from the project root.

The StaticFiles mount at "/" is added LAST so that any future API routes
declared before it are not shadowed. With html=True, GET / serves
static/index.html automatically.
"""

from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

# Resolves to <project-root>/static/ regardless of where the process is invoked from.
STATIC_DIR = Path(__file__).parent.parent / "static"

app = FastAPI(title="ghost-drone")

# Mount static files LAST — any future API routes must be declared above this line.
# html=True makes GET / serve static/index.html (satisfies SETUP-02).
app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
