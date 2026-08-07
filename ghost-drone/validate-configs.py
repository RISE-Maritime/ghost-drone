"""
Validate the connector configs shipped in this image, at build time.

A malformed config makes its connector sys.exit(1) at container start, which
the entrypoint's supervisor turns into a container exit and `restart:
unless-stopped` turns into a crash loop that takes SITL down with it. Catching
it during `docker build` is the difference between a red build and a red
deployment.

Four checks, because the JSON schemas alone are not enough:

  1. platform.json      -> jsonschema against the connector's config-schema.json
  2. entity_health.json -> jsonschema against JSON_SCHEMA, which lives as a
                           Python literal inside the connector script, not as
                           a file
  3. every "level" string is a real HealthLevel. The schema types these as
     plain strings, so "NOMIMAL" validates fine and then raises ValueError at
     runtime, well past the point a build would have caught it
  4. every content_rules[].field names a real field on that subject's payload
     type. A wrong name is not an error at all — the connector reports
     DEGRADED "missing field" forever, which looks like a sensor fault

Missing configs are not an error: the entrypoint treats both as optional.
"""

import glob
import importlib
import importlib.util
import json
import sys

import keelson
from jsonschema import ValidationError, validate

CONFIG_GLOB = "/config/*"
PLATFORM_SCHEMA = "/app/keelson/connectors/platform/config-schema.json"
ENTITY_HEALTH_BIN = "/app/keelson/connectors/entity_health/bin/entity_health2keelson.py"

VALID_LEVELS = {"NOMINAL", "DEGRADED", "CRITICAL", "INACTIVE", "UNKNOWN"}

errors: list[str] = []
checked = 0


def fail(path: str, msg: str) -> None:
    errors.append(f"{path}: {msg}")


def load_json(path: str):
    try:
        with open(path, encoding="utf-8") as fh:
            return json.load(fh)
    except json.JSONDecodeError as exc:
        fail(path, f"not valid JSON — {exc}")
        return None


def entity_health_schema():
    """JSON_SCHEMA is a module-level literal; import the script to reach it."""
    spec = importlib.util.spec_from_file_location("_eh", ENTITY_HEALTH_BIN)
    module = importlib.util.module_from_spec(spec)
    try:
        spec.loader.exec_module(module)
    except SystemExit:
        pass  # the script may argparse-exit on import; the literal is still bound
    return module.JSON_SCHEMA


def payload_fields(subject: str):
    """Field names on the payload type for a subject, or None if unresolvable."""
    try:
        type_name = keelson.get_subject_schema(subject)
    except KeyError:
        return None  # not a well-known subject, so the payload type is unknown
    short = type_name.split(".")[-1]
    candidates = [
        f"keelson.payloads.{'foxglove.' if type_name.startswith('foxglove.') else ''}{short}_pb2",
        "keelson.payloads.Primitives_pb2",
    ]
    for mod_name in candidates:
        try:
            cls = getattr(importlib.import_module(mod_name), short)
        except (ImportError, AttributeError):
            continue
        return {f.name for f in cls.DESCRIPTOR.fields}
    return None


def check_levels_and_fields(path: str, cfg: dict) -> None:
    for source in cfg.get("sources", []):
        for subject in source.get("subjects", []):
            name = subject.get("name", "?")
            where = f"sources[{source.get('name', '?')}].subjects[{name}]"

            levels = [(b.get("level"), f"{where}.publication_rate_hz")
                      for b in subject.get("publication_rate_hz", [])]
            if "publication_rate_default_level" in subject:
                levels.append((subject["publication_rate_default_level"],
                               f"{where}.publication_rate_default_level"))

            fields = payload_fields(name)
            for rule in subject.get("content_rules", []):
                field = rule.get("field")
                levels += [(b.get("level"), f"{where}.content_rules[{field}]")
                           for b in rule.get("bands", [])]
                if "default_level" in rule:
                    levels.append((rule["default_level"],
                                   f"{where}.content_rules[{field}].default_level"))
                if fields is None:
                    fail(path, f"{where}: cannot resolve payload type, so "
                               f"content_rules[{field}] is unverifiable")
                elif field not in fields:
                    fail(path, f"{where}: content_rules field {field!r} does not exist "
                               f"on the payload — the connector would report "
                               f"'missing field' forever. Available: {sorted(fields)}")

            for level, loc in levels:
                if not isinstance(level, str):
                    fail(path, f"{loc}: level must be a string, got {level!r}")
                elif level.upper().removeprefix("HEALTH_") not in VALID_LEVELS:
                    fail(path, f"{loc}: {level!r} is not a HealthLevel "
                               f"(expected one of {sorted(VALID_LEVELS)})")


for vehicle_dir in sorted(glob.glob(CONFIG_GLOB)):
    platform_path = f"{vehicle_dir}/platform.json"
    if glob.glob(platform_path):
        cfg = load_json(platform_path)
        if cfg is not None:
            checked += 1
            try:
                with open(PLATFORM_SCHEMA, encoding="utf-8") as fh:
                    validate(cfg, json.load(fh))
                print(f"  OK  {platform_path}")
            except ValidationError as exc:
                fail(platform_path, f"schema — {exc.message} (at {list(exc.absolute_path)})")

    health_path = f"{vehicle_dir}/entity_health.json"
    if glob.glob(health_path):
        cfg = load_json(health_path)
        if cfg is not None:
            checked += 1
            try:
                validate(cfg, entity_health_schema())
            except ValidationError as exc:
                fail(health_path, f"schema — {exc.message} (at {list(exc.absolute_path)})")
            else:
                check_levels_and_fields(health_path, cfg)
                if not any(e.startswith(health_path) for e in errors):
                    print(f"  OK  {health_path}")

if errors:
    print(f"\nconfig validation FAILED ({len(errors)} problem(s)):", file=sys.stderr)
    for err in errors:
        print(f"  - {err}", file=sys.stderr)
    sys.exit(1)

print(f"config validation passed ({checked} file(s) checked)")
