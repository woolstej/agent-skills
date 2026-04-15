---
name: feature-dev
description: "Structured 7-phase feature development workflow. Use when building new features, especially ones touching multiple files or requiring architectural decisions. Trigger: /feature-dev"
argument-hint: "Describe the feature you want to build"
---

# Feature Development Skill

A systematic 7-phase workflow for building features: Understand the codebase first, clarify requirements, design architecture, implement, review, then summarize. Never jump straight to code.

## When to Use
- New features touching multiple files
- Features requiring architectural decisions
- Complex integrations with existing code
- Requirements that are somewhat unclear

**Skip this workflow for:** single-line fixes, trivial changes, urgent hotfixes.

---

## The 7 Phases

### Phase 1 — Discovery
**Goal:** Understand what needs to be built.

1. If the feature request is vague, ask clarifying questions before anything else:
   - What problem does this solve?
   - Are there constraints (performance, backwards-compat, libraries to use/avoid)?
   - Who are the users of this feature?
2. Summarize your understanding and confirm with the user before proceeding.

---

### Phase 2 — Codebase Exploration
**Goal:** Understand relevant existing code and patterns.

Run these searches in parallel across the codebase:
- Find features similar to what's being built — trace their full implementation
- Map the architecture and abstractions in the relevant area
- Identify the conventions used (naming, file structure, error handling, testing patterns)

Read all identified key files. Present a summary:
- Similar features found and how they work
- Architecture patterns in use
- Key files to understand before implementing
- Any landmines or gotchas observed

---

### Phase 3 — Clarifying Questions
**Goal:** Resolve all ambiguities before design begins.

Based on codebase findings, identify and ask about:
- Edge cases not yet addressed
- Error handling expectations
- Integration points with existing code
- Backward compatibility requirements
- Performance or scale considerations

**Do not proceed to Phase 4 until these are answered.**

---

### Phase 4 — Architecture Design
**Goal:** Present multiple implementation approaches with trade-offs.

Design 2–3 concrete approaches, such as:
- **Minimal changes**: Smallest diff, maximum reuse of existing code
- **Clean architecture**: Best maintainability and testability
- **Pragmatic balance**: Speed + quality, fits existing patterns

For each approach, state:
- What changes / what new files are created
- Pros and cons
- Fit with existing codebase conventions

Give a clear recommendation with rationale. **Wait for explicit approval before implementing.**

---

### Phase 5 — Implementation
**Goal:** Build the feature following the approved architecture.

- Re-read all relevant files identified in Phase 2 before writing any code
- Follow the conventions and patterns discovered — do not invent new ones
- Track progress with todos, marking each step complete as you go
- Do not start the next step until the current one is confirmed working

---

### Phase 6 — Quality Review
**Goal:** Ensure code is correct, simple, DRY, and follows project conventions.

Review the implementation across three lenses:

1. **Correctness & bugs** — logic errors, missing error handling, edge cases
2. **Simplicity & DRY** — duplication, overly complex logic, unnecessary abstractions
3. **Conventions** — naming, file placement, patterns, adherence to what was found in Phase 2

For each finding, provide:
- What is wrong and why it matters
- File and line reference
- Suggested fix

Ask the user: fix now, fix later, or proceed as-is?

---

### Phase 7 — Summary
**Goal:** Document what was accomplished.

Produce a concise summary:
- What was built (1–2 sentences)
- Key architectural decisions made
- Files created or modified (with paths)
- Suggested next steps (tests, docs, follow-on work)

---

## Quick Reference

| Phase | Key Action | Gate |
|-------|-----------|------|
| 1. Discovery | Understand the ask | Confirm with user |
| 2. Exploration | Search & read codebase | — |
| 3. Clarifying Questions | Ask before designing | Wait for answers |
| 4. Architecture | Present 2–3 options | Wait for approval |
| 5. Implementation | Build it | Approved approach only |
| 6. Quality Review | 3-lens review | User decides fixes |
| 7. Summary | Document outcome | — |

## Invocation

```
/feature-dev Add rate limiting to the API
/feature-dev Add user authentication with OAuth
/feature-dev  ← (no argument = will prompt for description in Phase 1)
```
