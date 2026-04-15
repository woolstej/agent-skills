---
name: Code Review
summary: Find high-impact bugs, regressions, and missing tests before merge.
---

# Code Review Skill

Use this skill when asked to review code, pull requests, or diffs.

## Goals
- Identify correctness bugs and behavioral regressions.
- Call out reliability, security, and performance risks.
- Highlight missing tests and coverage gaps.

## Workflow
1. Read the changed files first.
2. Prioritize findings by severity: critical, high, medium, low.
3. For each finding, provide:
- What is wrong.
- Why it matters.
- File and line reference.
- Suggested fix.
4. If no issues are found, explicitly state that and note residual risk.

## Output Format
- Findings (ordered by severity)
- Open questions or assumptions
- Short change summary

## Superpowers Bridge

Use this local skill for quick reviews. Escalate to Superpowers when the change is high-risk or cross-cutting.

Escalate when:
- The diff spans many files or multiple subsystems.
- Security, data integrity, or migration risk exists.
- Review needs commit-range context, not only file-by-file comments.

Escalation path:
- Use `superpowers:requesting-code-review` to run structured, SHA-scoped review.
- Use `superpowers:receiving-code-review` to process feedback with technical verification.

Rule of thumb:
- Small PR: stay here.
- Medium or large PR: switch to Superpowers review flow.

## Terse Mode

- No motivational preamble.
- Findings only, ordered by severity.
- Max 5 bullets unless asked for full detail.
- Include file references only where actionable.
