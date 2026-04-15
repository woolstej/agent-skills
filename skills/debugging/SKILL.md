---
name: Debugging
summary: Reproduce failures quickly, isolate root causes, and validate fixes.
---

# Debugging Skill

Use this skill when code is failing, flaky, or producing unexpected output.

## Goals
- Reproduce the issue reliably.
- Isolate root cause with the smallest failing case.
- Implement a minimal, safe fix.
- Verify with tests or direct reproduction.

## Workflow
1. Capture exact error text, stack traces, and affected inputs.
2. Reproduce with a deterministic command.
3. Narrow scope using logs, breakpoints, or targeted prints.
4. Form and test one hypothesis at a time.
5. Implement the smallest fix that addresses root cause.
6. Re-run reproduction and related tests.

## Guardrails
- Do not mask errors with broad try/except.
- Avoid unrelated refactors during a hot fix.
- Add or update tests for the bug path.

## Superpowers Bridge

Use this local skill for straightforward, single-component bugs. Escalate to Superpowers when debugging is unclear or repeatedly failing.

Escalate when:
- The issue crosses service, process, or environment boundaries.
- Root cause is unclear after one focused investigation pass.
- Two fix attempts fail or new symptoms keep appearing.

Escalation path:
- Use `superpowers:systematic-debugging` for strict root-cause-first phases.
- Use `superpowers:test-driven-development` before final fix implementation.
- Use `superpowers:verification-before-completion` before claiming resolution.

Rule of thumb:
- One-file, obvious bug: stay here.
- Multi-layer or recurring bug: switch to Superpowers process.

## Terse Mode

- No long recap of debugging theory.
- Report only: evidence, hypothesis, test, outcome.
- Max 5 bullets per update unless asked.
- Always end with next concrete diagnostic step.
