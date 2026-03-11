# Build prompt

1. **Study the codebase.** Launch up to 10 sonnet agents in parallel to explore the repo. Understand the project structure, existing implementations, tests, and how the backend and frontend communicate via zenoh. Read CLAUDE.md and JOBS.md for context.

2. **Study SPEC.md.** Read the behavioral specification carefully. For each behavior listed, determine whether it is already implemented and tested.

3. **Pick work.**
   - If any spec behavior is **not yet implemented**: choose one, write a failing test first (red), then implement the minimum code to make it pass (green). Commit the test and implementation separately.
   - If all spec behaviors **are implemented**: pick one that could be refined or improved (performance, correctness, edge cases, code quality) and improve it, ensuring all existing tests still pass.

4. **Constraints.**
   - Follow red-green TDD strictly: failing test first, then implementation.
   - Prefer E2E tests: test the functionality, not the implementation. Tests should verify observable behavior (zenoh messages, UI state) rather than internal code structure.
   - For browser/UI tests, use the agent-browser skill to automate interactions and verify behavior.
   - Keep changes minimal and focused on one spec behavior per cycle.
   - Run `uv run pytest` after implementation to verify nothing is broken.
   - Do not modify SPEC.md, JOBS.md, or CLAUDE.md.
