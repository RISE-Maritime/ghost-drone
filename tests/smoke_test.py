#!/usr/bin/env python3
"""
End-to-end smoke test for a running ghost-drone container.

Asserts the things that have actually broken during development: telemetry
reaching the bus, entity_health evaluating rather than sitting UNKNOWN, the
platform connector publishing its geometry, and the SimulationControl RPCs
completing with verified acks.

Runs inside the image, which already has zenoh and keelson:

    docker run --rm --network host \\
      -v "$PWD/tests/smoke_test.py:/t.py:ro" \\
      --entrypoint python3 ghost-drone /t.py --connect tcp/localhost:17447

Exits non-zero on the first failed assertion, naming what was expected.
"""

import argparse
import sys
import time

import keelson
import zenoh
from keelson import uncover
from keelson.interfaces.ErrorResponse_pb2 import ErrorResponse
from keelson.payloads.EntityHealth_pb2 import EntityHealth, HealthLevel
from keelson.payloads.foxglove.FrameTransform_pb2 import FrameTransform
from keelson.payloads.Primitives_pb2 import TimestampedFloat
from keelson.payloads.SimulationStatus_pb2 import SimulationStatus

# A required subset, deliberately not the full set of 39. Asserting an exact
# count would break on any keelson bump that adds a subject, which is churn
# rather than signal.
REQUIRED_SUBJECTS = [
    "location_fix",
    "location_fix_quality",
    "heading_true_north_deg",
    "course_over_ground_deg",
    "speed_over_ground_knots",
    "vehicle_mode",
    "vehicle_armed",
    "vehicle_state",
    "simulation_status",
]

results: list[tuple[bool, str]] = []


def wait_until(predicate, timeout: float, poll: float = 1.0) -> bool:
    """Poll rather than collect for a fixed window.

    The platform connector publishes on a 10s interval, so any fixed
    collection window shorter than that fails intermittently for reasons that
    have nothing to do with the code under test.
    """
    deadline = time.time() + timeout
    while time.time() < deadline:
        if predicate():
            return True
        time.sleep(poll)
    return predicate()


def check(ok: bool, label: str, detail: str = "") -> bool:
    results.append((ok, f"{label}{' — ' + detail if detail else ''}"))
    print(f"  {'PASS' if ok else 'FAIL'}  {label}" + (f" — {detail}" if detail else ""))
    return ok


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--connect", default="tcp/localhost:17447")
    ap.add_argument("--realm", default="rise")
    ap.add_argument("--entity", default="sim-drone-01")
    ap.add_argument("--source", default="mavlink")
    ap.add_argument("--collect-s", type=float, default=8.0)
    # The drone genuinely reports CRITICAL for its first few seconds while the
    # simulated GPS has fix_type=FIX_NO, so health is polled rather than sampled.
    ap.add_argument("--health-timeout-s", type=float, default=45.0)
    # The platform connector's --interval defaults to 10s; allow two ticks.
    ap.add_argument("--platform-timeout-s", type=float, default=25.0)
    args = ap.parse_args()

    conf = zenoh.Config()
    conf.insert_json5("mode", '"client"')
    conf.insert_json5("connect/endpoints", f'["{args.connect}"]')

    seen_subjects: set[str] = set()
    health: list[EntityHealth] = []
    platform: dict[str, object] = {}
    frames: set[str] = set()
    sim_state: list[int] = []

    def on_any(sample):
        try:
            subject = str(sample.key_expr).split("/pubsub/")[1].rsplit("/", 1)[0]
        except IndexError:
            return
        seen_subjects.add(subject)
        try:
            _, _, payload = uncover(sample.payload.to_bytes())
        except Exception:  # noqa: BLE001 - one odd payload must not abort collection
            return
        if subject == "entity_health":
            msg = EntityHealth()
            msg.ParseFromString(payload)
            health.append(msg)
        elif subject == "simulation_status":
            msg = SimulationStatus()
            msg.ParseFromString(payload)
            sim_state.append(msg.state)
        elif subject == "frame_transform":
            msg = FrameTransform()
            msg.ParseFromString(payload)
            frames.add(msg.child_frame_id)
        elif subject in ("length_over_all_m", "breadth_over_all_m"):
            msg = TimestampedFloat()
            msg.ParseFromString(payload)
            platform[subject] = msg.value

    with zenoh.open(conf) as session:
        session.declare_subscriber(f"{args.realm}/@v0/{args.entity}/pubsub/**", on_any)

        print(f"collecting for {args.collect_s:g}s...")
        time.sleep(args.collect_s)

        print("\ntelemetry:")
        missing = [s for s in REQUIRED_SUBJECTS if s not in seen_subjects]
        check(not missing, f"{len(REQUIRED_SUBJECTS)} required subjects present",
              f"missing {missing}" if missing else f"{len(seen_subjects)} distinct subjects seen")

        print("\nentity_health:")
        deadline = time.time() + args.health_timeout_s
        latest = None
        while time.time() < deadline:
            if health:
                latest = health[-1]
                if latest.level == HealthLevel.HEALTH_NOMINAL:
                    break
            time.sleep(1.0)

        if not check(latest is not None, "entity_health is published",
                     "" if latest else "no entity_health message arrived"):
            return report()

        lname = HealthLevel.Name(latest.level)
        check(latest.level == HealthLevel.HEALTH_NOMINAL, "entity level is NOMINAL",
              f"got {lname}" if latest.level != HealthLevel.HEALTH_NOMINAL else "")
        subjects = [s for src in latest.sources for s in src.subjects]
        check(len(subjects) > 0, "health reports at least one subject",
              f"{len(subjects)} subjects across {len(latest.sources)} source(s)")
        stuck = [f"{s.name}={HealthLevel.Name(s.level)}" for s in subjects
                 if s.level in (HealthLevel.HEALTH_UNKNOWN, HealthLevel.HEALTH_INACTIVE)]
        check(not stuck, "no subject stuck UNKNOWN/INACTIVE", ", ".join(stuck))
        # A content rule that names a bad field degrades silently rather than
        # erroring, so assert the checks resolved instead of just the level.
        missing_field = [f"{s.name}:{c.name}" for s in subjects for c in s.checks
                         if "missing field" in c.detail]
        check(not missing_field, "no content rule reports 'missing field'",
              ", ".join(missing_field))

        print("\nplatform geometry:")
        # Published on the connector's --interval (default 10s), so poll.
        wait_until(
            lambda: "length_over_all_m" in platform and len(frames) >= 2,
            timeout=args.platform_timeout_s,
        )
        check(platform.get("length_over_all_m") == 4.0, "length_over_all_m is 4.0",
              f"got {platform.get('length_over_all_m')}")
        check(platform.get("breadth_over_all_m") == 1.5, "breadth_over_all_m is 1.5",
              f"got {platform.get('breadth_over_all_m')}")
        check(len(frames) >= 2, "frame transforms published", f"{sorted(frames)}")

        print("\nsim_control RPCs:")
        for procedure, want in (("SimulationControl/pause", SimulationStatus.PAUSED),
                                ("SimulationControl/start", SimulationStatus.RUNNING)):
            key = keelson.construct_rpc_key(args.realm, args.entity, procedure, args.source)
            outcome = "no reply"
            for reply in session.get(key, timeout=10.0):
                try:
                    bytes(reply.ok.payload.to_bytes())
                    outcome = "ok"
                except Exception:  # noqa: BLE001 - zenoh raises on .ok for an err reply
                    err = ErrorResponse()
                    err.ParseFromString(bytes(reply.err.payload.to_bytes()))
                    outcome = f"err({ErrorResponse.Code.Name(err.code)}: {err.error_description})"
            reached = False
            until = time.time() + 10.0
            while time.time() < until:
                if sim_state and sim_state[-1] == want:
                    reached = True
                    break
                time.sleep(0.5)
            check(outcome == "ok" and reached, f"{procedure.split('/')[1]} -> "
                  f"{SimulationStatus.SimulationState.Name(want)}",
                  f"reply={outcome}, reached={reached}")

    return report()


def report() -> int:
    failed = [label for ok, label in results if not ok]
    print()
    if failed:
        print(f"SMOKE TEST FAILED — {len(failed)} of {len(results)} checks:")
        for label in failed:
            print(f"  - {label}")
        return 1
    print(f"SMOKE TEST PASSED — {len(results)} checks")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as exc:  # noqa: BLE001 - a crash must not be reported as a pass
        print(f"\nSMOKE TEST ERRORED: {type(exc).__name__}: {exc}", file=sys.stderr)
        sys.exit(2)
