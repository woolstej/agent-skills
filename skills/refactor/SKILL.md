---
name: Refactor Safely
summary: Improve structure and readability while preserving behavior.
---

# Refactor Skill

Use this skill when the user requests cleanup, simplification, or architecture improvements.

## Goals
- Improve readability, maintainability, and structure.
- Keep behavior unchanged.
- Reduce risk through incremental edits and validation.

## Workflow
1. Define the refactor boundary (what is in scope and out of scope).
2. Add safety checks first (tests, snapshots, baseline outputs).
3. Refactor in small steps and keep code compiling.
4. Validate after each step.
5. Summarize what changed and why it is safer now.

## Heuristics
- Prefer extraction over large rewrites.
- Rename symbols to clarify intent.
- Remove dead code only when verified unused.
- Keep public APIs stable unless explicitly requested.

## Superpowers Bridge

Use this local skill for tactical cleanup and contained refactors. Escalate when refactor scope needs formal planning and stronger verification.

Escalate when:
- Refactor touches multiple modules or shared interfaces.
- You need staged rollout with explicit checkpoints.
- Behavior risk is high and confidence depends on disciplined test cycles.

Escalation path:
- Use `superpowers:writing-plans` for multi-step refactor plans.
- Use `superpowers:test-driven-development` for red-green-refactor loops.
- Use `superpowers:requesting-code-review` before merge.
- Use `superpowers:verification-before-completion` before completion claims.

Rule of thumb:
- Local cleanup and rename: stay here.
- Architecture-adjacent or broad change: use Superpowers workflow.

## Terse Mode

- No extended rationale unless requested.
- Report only scope, change set, and verification.
- Keep status updates under 5 bullets.
- Prefer concrete file paths over narrative prose.
