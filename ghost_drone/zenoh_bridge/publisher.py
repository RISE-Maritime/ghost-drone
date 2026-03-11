"""
Zenoh publisher — daemon thread + queue pattern.

zenoh-python 1.x is sync-only (async support was dropped in v0.6).
All publishing MUST go through this queue. Never call zenoh from
an asyncio callback, websocket handler, or subscriber callback.

The optional on_session_ready callback is invoked once the zenoh session
is open, allowing the caller to register control handlers (subscribers
and queryables) on the same session.
"""
import queue
import threading
import logging
from typing import Callable, Optional
import zenoh

logger = logging.getLogger(__name__)


class ZenohPublisher:
    """
    Daemon thread that owns a zenoh session and drains a publish queue.

    Usage:
        pub = ZenohPublisher(
            endpoint="tcp/127.0.0.1:7447",
            on_session_ready=lambda session: register_handlers(session),
        )
        pub.start()
        pub.publish(key_expr, payload_bytes)
        pub.stop()
    """

    def __init__(
        self,
        endpoint: str,
        queue_maxsize: int = 256,
        on_session_ready: Optional[Callable[[zenoh.Session], None]] = None,
    ) -> None:
        self._endpoint = endpoint
        self._queue: queue.Queue = queue.Queue(maxsize=queue_maxsize)
        self._thread: Optional[threading.Thread] = None
        self._stop_event = threading.Event()
        self._on_session_ready = on_session_ready
        self.session_ready = threading.Event()

    def start(self) -> None:
        """Start the daemon publisher thread."""
        self._stop_event.clear()
        self._thread = threading.Thread(
            target=self._run, name="zenoh-publisher", daemon=True
        )
        self._thread.start()
        logger.info("ZenohPublisher started (endpoint=%s)", self._endpoint)

    def stop(self, timeout: float = 2.0) -> None:
        """Signal the publisher to stop and wait for thread exit."""
        self._stop_event.set()
        if self._thread is not None:
            self._thread.join(timeout=timeout)

    def publish(self, key_expr: str, payload: bytes) -> None:
        """
        Enqueue a publish operation. Non-blocking; drops if queue is full.
        Call keelson.enclose() before passing payload here.
        """
        try:
            self._queue.put_nowait((key_expr, payload))
        except queue.Full:
            logger.warning("ZenohPublisher queue full — dropping message on %s", key_expr)

    def _run(self) -> None:
        """Publisher thread body. Opens one zenoh session for its lifetime."""
        conf_str = f'{{"connect": {{"endpoints": ["{self._endpoint}"]}}}}'
        try:
            conf = zenoh.Config.from_json5(conf_str)
            with zenoh.open(conf) as session:
                logger.info("ZenohPublisher: zenoh session open")

                # Register control handlers on the session before entering drain loop
                if self._on_session_ready is not None:
                    self._on_session_ready(session)
                self.session_ready.set()

                while not self._stop_event.is_set():
                    try:
                        key_expr, payload = self._queue.get(timeout=0.1)
                        session.put(key_expr, payload)
                    except queue.Empty:
                        continue
                    except Exception:
                        logger.exception("ZenohPublisher: error during put")
        except Exception:
            logger.exception("ZenohPublisher: failed to open zenoh session")
