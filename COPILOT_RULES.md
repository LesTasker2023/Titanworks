# Rule: Always start with the first high-leverage topic from LEARNINGS.md and, if possible, build something for the project using it before moving to the next topic. This ensures practical, project-driven mastery of each concept.

## 13. PowerShell Command Syntax Standard

- **Always use PowerShell syntax** for all terminal commands and scripts in this Windows environment
- Use semicolon (`;`) as command separator instead of `&&`
- Use PowerShell cmdlets and syntax patterns consistently
- Examples:
  - ✅ `cd "path"; yarn command`
  - ❌ `cd "path" && yarn command`
  - ✅ `powershell -ExecutionPolicy Bypass "script.ps1"`
  - ✅ `Get-ChildItem`, `Copy-Item`, `Remove-Item`
- All automation scripts should be PowerShell (.ps1) format
- Terminal tool calls must use proper PowerShell command chaining

## 12. Vitest Test Imports

- All test files must explicitly import `describe`, `it`, and `expect` from 'vitest' for consistency, type safety, and to avoid global/environment issues.

## 11. Communicate Actions

- Always assume consent for any action, but clearly communicate what is being done. Never ask for permission, but always inform the user of changes, fixes, or decisions.

# COPILOT_RULES.md

# Copilot Rules (Single Source of Truth)

This file contains the codified rules, dos, and do not's for Copilot and all contributors. These are derived from all project guides, style guides, validation docs, and tutorials. All actions must comply with these rules.

---

## General Principles

- **Do** always reference the latest AI_GUIDES_PAYLOAD.json for all actions and decisions.
- **Do** treat this rules file as the law for all code, documentation, and automation.
- **Do not** act without referencing the full documentation payload and this rules file.

---

## Component Development

### Do:

- Use shadcn/ui as the baseline for all components.
- Follow the 6-step component workflow: Plan, Scaffold, Implement, Test, Document, Audit.
- Ensure every component is style guide compliant and accessible.
- Write comprehensive tests for all components (unit, integration, accessibility).
- Use CVA (Class Variance Authority) patterns for variants and state management.
- Document every component with usage, props, and accessibility notes.
- Validate all code with linting, type-checking, and quality audits before merging.
- Reference COMPONENT_DEVELOPMENT.md and relevant tutorials for every new component.

### Do Not:

- Do not bypass the workflow steps or skip documentation/testing.
- Do not use legacy or deprecated patterns/components.
- Do not merge code that fails validation or style checks.
- Do not introduce breaking changes without migration guides.

---

## Style Guide & Patterns

### Do:

- Follow the STYLE_GUIDE.md for naming, structure, and CSS conventions.
- Use Tailwind and design tokens for all styling.
- Ensure all UI is responsive and theme-aware.
- Use semantic HTML and ARIA attributes for accessibility.

### Do Not:

- Do not use inline styles or hardcoded values.
- Do not ignore accessibility or responsive design requirements.
- Do not use non-semantic HTML for interactive elements.

---

## Validation & Testing

### Do:

- Run all tests and audits (yarn test, yarn quality-audit) before PRs.
- Write tests for all edge cases and accessibility scenarios.
- Use the VALIDATION.md checklist for every PR.
- Fix all errors and warnings before merging.

### Do Not:

- Do not ignore test failures or quality audit issues.
- Do not skip accessibility or edge case testing.

---

## Documentation

### Do:

- Keep all documentation up to date with code changes.
- Reference and update tutorials for new patterns or workflows.
- Use clear, concise language in all docs and comments.
- Store all guides in the docs directory and update AI_GUIDES_PAYLOAD.json as the single source of truth.

### Do Not:

- Do not leave outdated or incorrect documentation.
- Do not add undocumented features or patterns.

---

## Automation & AI Agent

### Do:

- Always reference AI_GUIDES_PAYLOAD.json and COPILOT_RULES.md before acting.
- Enforce all rules, validation, and workflow steps automatically.
- Report on all actions, referencing the relevant guide or rule.
- Update the rules file and payload as new guides or rules are added.

### Do Not:

- Do not act without full context from the guides and rules.
- Do not allow manual overrides that break the rules or workflow.

---

## Summary

All contributors and agents must:

- Follow the dos and do not's above for every action.
- Reference the AI_GUIDES_PAYLOAD.json and this rules file as the single source of truth.
- Update both files as the project evolves.

Non-compliance will result in code rejection and workflow automation errors.

---

### 1. Reference the Guide

- Always consult `docs/COMPONENT_DEVELOPMENT.md` before building, editing, or refactoring any component.

### 2. Use Official Libraries

- Only use shadcn/ui for new UI components unless explicitly instructed otherwise.

### 3. No Tailwind Utility Classes

- Do not use Tailwind CSS utility classes directly in components. Use design tokens, component props, or CSS modules.

### 4. Test & Audit After Every Change

- After any code change, run the full test suite (`yarn test`) and the quality audit (`yarn quality-audit`).

### 5. Clean Up Legacy Code

- Remove or refactor legacy, unused, or duplicate code after any migration or major change.

### 6. Folder-Per-Component Structure

- Each component must have its own folder with all related files (index, stories, tests, styles, docs).

### 7. Document Everything

- Every new component must have Storybook stories and a Markdown doc.

### 8. Use Yarn

- All dependency management and scripts must use Yarn.

### 9. Challenge Assumptions

- Never blindly agree with prompts. Challenge assumptions, suggest 10x solutions, and encourage first-principles thinking.

---

## 10. AI Autonomy

- The AI must never ask for permission to proceed or if the user wants to take an action. Always act autonomously and decisively unless explicitly stopped by the user. Assume consent for all actions. If the user disagrees, they will stop you or revert changes.

---

## 13. Shorthand Command System

- Recognize and execute shorthand commands (//comp, //fix, //clean, //shad, //scp, etc.) as complete enterprise-grade workflows
- Each shorthand triggers the full process without shortcuts or compromises
- Reference SHORTHAND_COMMANDS.md for all available commands and their implementations
- Maintain surgical precision and clinical-grade quality in all shorthand executions
- Never ask for clarification on shorthand commands - execute immediately with full context
- //shad next: Intelligently analyze and create the most effective shadcn component next
- //scp: Rapid git workflow (stage, commit, push) with conventional commit messages

---

Feel free to add, clarify, or update rules as your standards evolve. Use clear, numbered points for each rule.

---
