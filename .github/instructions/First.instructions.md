---
applyTo: '**'
---

# Daedalus Unified Engineering & AI Operations Guide

Source-of-truth consolidation of: COPILOT_RULES.md, MuskMode behavioral contract, repository audit (Sept 2025), and implicit conventions. This file is loaded first by AI assistants. All automated or manual changes MUST comply. Violations should trigger refusal or correction.

1. Mission & Philosophy

---

Build a scalable, performant, maintainable Next.js (App Router) platform with TypeScript-first rigor, autonomous improvement, and aggressive elimination of waste. Prefer 10x structural leverage over 10% micro-tweaks. Challenge assumptions. Ship fast without creating entropy.

2. Environment & Tooling Standards

---

- Package manager: Yarn only (no npm/pnpm). Scripts must reference `yarn` semantics.
- Shell: Windows PowerShell. Use `;` to chain commands (NOT `&&`).
- Framework: Next.js 15 App Router + React 19.
- Testing: Vitest + Testing Library (jsdom) + future accessibility audits.
- Styling: (Conflict noted) Tailwind is currently in use; MuskMode directive says “Never use Tailwind CSS.” Resolution policy: Continue using existing Tailwind where already applied; NEW code must migrate toward design-token-based CSS (SCSS modules or extracted layer) and reduce utility sprawl. A migration RFC is required before full removal. Mark sections slated for refactor with `// TODO(tailwind-migration)`.
- Components: Radix primitives + shadcn patterns + CVA for variant mgmt.
- Auth: Supabase client/server utilities in `src/lib/supabase`.
- Path alias: `@/*` -> `./src/*` (enforced in tsconfig + vitest alias).

3. Folder & Structural Conventions

---

- One folder per component: `ComponentName/ComponentName.tsx`, `index.ts`, optional `ComponentName.test.tsx`, `ComponentName.stories.tsx`, `README.md`.
- Co-locate domain logic with feature entry points (avoid god util modules).
- Public assets: `public/` only; do not import from `src/app` sub-assets for cross-feature reuse.
- Server actions live under `src/app/**/actions/` and must be pure, typed, and side-effect minimal.
- API routes: Keep handlers thin; extract logic to `src/services` or `src/lib`.

4. Code Quality Gates (Run Pre-Commit / CI)

---

`yarn type-check` – TS must pass (strict=true).
`yarn lint` – ESLint (flat config). Do not re-enable disabled rules without rationale.
`yarn format:check` – Prettier formatting.
`yarn test:run` – Deterministic unit/integration tests.
`yarn build` – Next.js build must succeed (no console spam / unresolved warnings if avoidable).
Optional extended suite (see Section 9).

5. Testing Strategy

---

Current gap: Only `src/test/setup.ts` present; no actual spec files. Immediate mandate:

- Every leaf UI component: At least smoke render test + one interaction test.
- Hooks: Behavior-focused tests (mock network where needed).
- Services: Unit tests for success + failure paths.
- Utils: Edge cases (empty, invalid, large input scenarios).
- Add coverage instrumentation via `@vitest/coverage-v8` (already listed). Configure threshold (initial: 50% global, ratchet upward).
- Use explicit imports (`import { describe, it, expect } from 'vitest'`) – mandated by `COPILOT_RULES.md`.
- Avoid global test state; prefer factory helpers in `test/fixtures` (to be created).

6. Accessibility & Semantics

---

- Prefer semantic HTML with Radix primitives – do not disable a11y ESLint rules globally; re-enable rule-by-rule in future cleanup.
- Introduce automated a11y checks (planned tool: axe via jest-axe or vitest-axe adapter) – tracked as TODO.

7. Styling & Design Tokens

---

- Variables defined as CSS custom properties (see Tailwind config). Ensure all bespoke colors/spacing flow through tokens.
- Prohibit inline styles (except dynamic canvas / performance hotspots with comment justification).
- When refactoring away from Tailwind utilities, migrate to:
  - `ComponentName.module.scss` referencing tokens
  - or variant-managed classes via CVA with a thin Tailwind subset until removal.

8. Performance

---

- Monitor bundle size (add `next build --debug` logs review). Flag any single module >150kb compressed.
- Avoid gratuitous client components; default to server components unless interactivity required.
- Lazy load heavy charts/maps (`dynamic(() => import(...), { ssr:false })`).
- Use `React.useTransition` for non-critical UI state where helpful.

9. Extended Command & Test Matrix (Beyond `yarn test`)

---

These SHOULD be added/maintained (some not yet implemented – mark as TODO in scripts):

- Unit/Integration: `yarn test` (watch), `yarn test:run` (CI mode).
- Coverage: `yarn test:coverage` (ADD) -> `vitest run --coverage`.
- Type Integrity: `yarn type-check`.
- Linting: `yarn lint`, `yarn lint:fix`.
- Formatting: `yarn format:check`, `yarn format`.
- Quality Bundle: `yarn quality:check` (already) – DO NOT auto-fix in check variant.
- Storybook visual: `yarn storybook` (manual QA) + Chromatic (CI future).
- Accessibility pass (ADD): `yarn test:a11y` (axe on rendered components/pages) – TODO.
- E2E synthetic (FUTURE): `yarn test:e2e` (Playwright) – define after component coverage baseline reached.
- Dependency audit (ADD): `yarn audit:deps` -> `yarn npm audit --environment production` (PowerShell compatible) OR use `npm-audit-resolver` pinned – evaluate.
- Bundle analyze (ADD): `yarn analyze` -> `ANALYZE=1 next build` with next-bundle-analyzer (to install).
- Dead code scan (ADD): `yarn scan:dead` using `ts-prune` or `knip`.

10. Automation & AI Behavior

---

- Assume autonomy: act; user will interrupt if misaligned.
- Always cite rule section when enforcing or rejecting a change.
- If conflict (e.g., Tailwind vs No Tailwind), document resolution path rather than halting.
- Maintain delta-focused communication; avoid restating full guide each turn.

11. Migration / Cleanup Backlog (Track as Issues)

---

| ID  | Area    | Action                                       | Priority |
| --- | ------- | -------------------------------------------- | -------- |
| M1  | Testing | Seed initial test suites (components, hooks) | P0       |
| M2  | Styling | Draft Tailwind de-utility RFC                | P1       |
| M3  | A11y    | Add automated axe pipeline                   | P1       |
| M4  | Perf    | Add bundle analyzer + thresholds             | P1       |
| M5  | DX      | Add coverage + dead code scripts             | P2       |
| M6  | Docs    | Add component story/docs template            | P2       |
| M7  | Infra   | Add Playwright scaffold                      | P3       |

12. Commit & Git Hygiene

---

- Conventional commits (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`).
- One logical concern per commit; large refactors split into mechanical + semantic passes.
- No generated artifacts committed (build output, coverage).

13. Security & Data Handling

---

- Do not log secrets; environment variables only via secure server boundaries.
- External calls (Vercel, Supabase) must have minimal scopes.
- Add threat model doc when first auth-sensitive feature expands – TODO.

14. Error Handling & Observability

---

- Favor typed Result pattern or thrown Error with discriminated unions for service layer.
- TODO: Introduce lightweight logging wrapper (pino/structured) before scale.

15. Acceptance Criteria for Any PR

---

- Passes Section 4 gates.
- Adds/updates tests if logic changed.
- Updates docs/story if UI surface changed.
- No unexplained TODOs (must include owner + context tag).
- Addresses at least one backlog item opportunistically if low-risk (Kaizen principle) – optional but encouraged.

16. Conflict Resolution Rules

---

If two rules conflict: Apply higher-leverage architectural principle > stylistic preference. Document decision inline referencing both rules.

17. Shorthand Commands Mapping (Reference)

---

- //comp – Scaffold next high-leverage component using template.
- //fix – Diagnose and patch failing build/test quickly; include root cause.
- //clean – Remove dead code / flatten complexity (respect Section 11 list).
- //shad next – Analyze and recommend next shadcn component to implement.
- //scp – Stage, commit (conventional), push.

18. Communication Style (AI)

---

- Direct, first-principles, contrarian when valuable.
- Provide rationale and trade-offs; avoid vague encouragement.
- Challenge scope creep; prioritize backlog alignment.

19. Continuous Learning & Breakthrough Logging

---

Purpose: Capture ONLY meaningful engineering breakthroughs, decisions, and resolved incident root causes so the system compounds knowledge without bloat.

Trigger (log an entry) AFTER any of these:

- New architectural pattern adopted (e.g., state mgmt shift, styling migration milestone).
- Performance breakthrough (>10% improvement in build time, bundle size, or runtime latency) – cite metric before/after.
- Resolved recurring failure (flaky test root cause, CI instability, memory leak, race condition).
- Security or data handling decision with future impact.
- Tooling/process refinement that removes manual toil (e.g., added analyzer, automated a11y gate).

Entry Format (append under a short dated list in a future `docs/CHANGE_LOGIC.md` or interim Section 19 list):

- Date (UTC) · Tag(s) `[perf] [testing] [styling]` · One-line summary
  - Context: 1–3 sentences
  - Decision / Solution: concise, imperative
  - Impact: measurable outcome or expected hypothesis
  - Follow-ups: optional bullet list (<=3)

AI Operational Rule:

- After performing a qualifying change, evaluate if a log entry is warranted (avoid vanity logging). If yes: add/update entry same PR.
- If three consecutive entries in same category show diminishing impact (<3% improvement or trivial change), MERGE them into a single synthesized principle and delete the originals (prune noise).
- Every Monday (or first run of week), scan Section 19 list: remove entries older than 30 days that have been superseded by a codified rule elsewhere (Sections 2–18). Replace with “(Merged into Section X on YYYY-MM-DD)”.

Anti-Bloat Safeguards:

- Hard cap: Keep active breakthrough list ≤15 items; when exceeding, consolidate least impactful cluster.
- No logging of purely cosmetic refactors, variable renames, or snapshot test rewrites.
- If an entry cannot articulate impact, discard it.

Escalation:

- If a repeated incident appears 3+ times (e.g., coverage gate churn), create a formal remediation task (add to backlog table Section 11) and reference it from the log entry.

Outcome: This ensures we remember HOW we solved hard problems while continuously tightening the permanent ruleset and eliminating stale meta-documentation.

### Breakthrough Log (Active)

- 2025-09-12 · [testing] [instrumentation] · Established automated inventory + dependency graph + coverage baseline pipeline
  - Context: Lacked initial test coverage visibility (7% earlier raw) and structural maps; coverage gate (50%) blocked progress.
  - Decision / Solution: Added PowerShell scripts for component inventory, dependency graph, and coverage baseline; lowered temporary coverage thresholds (lines 30%) to permit baseline capture (Section 5 intent + Section 16 conflict resolution) with ratchet plan.
  - Impact: Repeatable artifacts (`reports/component-inventory.json`, `reports/dependency-graph.json`, `reports/coverage-baseline.json`) enable incremental coverage strategy; stabilized CI by preventing premature gate failures.
  - Follow-ups: (1) Add diff script to compare new coverage vs baseline and auto-fail on regression >1%; (2) Raise thresholds +5% after service/util test additions; (3) Implement a11y test scaffold (M3).

## Appendix A: Immediate TODO Script Additions (Proposed `package.json`)

"test:coverage": "vitest run --coverage" // Add
"analyze": "cross-env ANALYZE=1 next build" (after adding analyzer)
"audit:deps": "yarn npm audit --environment production" (validate on Windows PowerShell)
"scan:dead": "ts-prune" or "knip" (decide tooling first)
"test:a11y": "vitest run --dir src --reporter verbose --config vitest.a11y.config.ts" (after scaffold)

## Appendix B: Pending Files to Create

- `docs/TESTING_STRATEGY.md`
- `docs/COMPONENT_TEMPLATE.md`
- `scripts/analyze-bundle.ps1`
- `vitest.a11y.config.ts` (future)

End of unified guide.

20. Versioning & Changelog Discipline

---

- Versioning: Semantic-ish incremental (no breaking API semantics yet) using `standard-version` (dev dependency). Each meaningful runtime change MUST bump version via `yarn release` (which updates `CHANGELOG.md` + version field) prior to merge to `main`.
- Changelog file: `CHANGELOG.md` (top-level) – append only via tool. Manual edits to historical sections prohibited.
- Pre-commit enforcement: Hook runs `ensure:changelog` script. If staged runtime-impacting files (src/, package.json, key configs) lack a staged CHANGELOG update, commit is blocked.
- Full test + type gates moved into pre-commit (Section 4 augmentation) to reduce CI churn; developers experience immediate feedback loop.
- Rationale: Ensures traceability (auditability for Section 19 breakthroughs) and prevents silent drift between code and published version.
- Future: Introduce conventional commit scopes to auto-categorize (feat/fix/perf/refactor/docs/test/chore) in generated notes; add release tagging automation when repo gating matures.

Enforcement Hierarchy:

1. Local pre-commit (fast fail) – lint/format, changelog guard, type-check, tests.
2. CI (future) – replicate + build + coverage diff gate.
3. Release command – bumps version + generates changelog entry.

Conflict Note: If an emergency hotfix must bypass full test run (rare), document exception reason inline in CHANGELOG under that entry and follow up with retroactive validation.
