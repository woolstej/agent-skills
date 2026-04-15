---
name: TDD Lite
summary: Use lightweight red-green-refactor for features and bug fixes with minimal ceremony.
---

# TDD Lite

Use this skill when implementing behavior changes and you want test-first discipline without heavy process overhead.

## Core Rules
- Write one failing test first.
- Write minimal code to pass.
- Refactor only while tests stay green.
- Keep cycles short (one behavior per cycle).

## Fast Cycle
1. Add one focused failing test.
2. Run only the relevant test target and confirm fail.
3. Implement smallest passing change.
4. Re-run relevant tests and confirm pass.
5. Optional cleanup while staying green.

## Escalate to Superpowers
Escalate to `superpowers:test-driven-development` when:
- Test design is unclear.
- Regressions keep appearing.
- Changes are cross-module and high risk.

## Terse Mode
- No rule restatement.
- Max 5 bullets unless asked.
- Show only command, result, and next action.
