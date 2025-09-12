# Repository Mastery Roadmap

> Objective: Transform the codebase into a self-describing, continuously learning system that compounds engineering leverage while minimizing entropy.

## Phase 0 · Baseline Reality Capture (Immediate)

Goal: Remove blind spots.
Artifacts:

- `reports/component-inventory.json`
- `reports/dependency-graph.json`
- `reports/coverage-baseline.json`
- `reports/test-durations.json`
  Actions:

1. Generate component inventory.
2. Generate dependency graph (initial regex import scan; upgrade to TS program walker in Phase 2).
3. Capture coverage & test duration snapshot.
4. Identify orphaned modules & largest untested files.
   Exit Criteria: >95% of source lines represented in inventory; zero unknown directories.

## Phase 1 · Mapping & Classification

Goal: Attach semantic meaning (category, risk, complexity).
Add fields: `category`, `riskScore`, `complexity`, `hasTests`, `dependents`.
Actions:

1. Enrich inventory JSON.
2. Compute basic complexity heuristic (lines + branch points).
3. Rank top 20 high-risk modules (used widely + untested + high complexity).
4. Emit `reports/refactor-opportunities.json`.
   Exit Criteria: Each module has a category & risk; top 10 prioritized.

## Phase 2 · Automation & Guardrails

Goal: Prevent regression & surface silent drift early.
New scripts (PowerShell):

- `inventory:components` – component manifest
- `inventory:graph` – dependency edges
- `analyze:coverage:diff` – compares last vs current
- `scan:dead` – dead export detection (`knip` or `ts-prune`)
- `analyze:bundle` – bundle analyzer JSON (after analyzer install)
  Add `quality:strict` combining gates.
  Exit Criteria: CI/local gate fails on coverage drop, new dead code, bundle bloat.

## Phase 3 · Predictive Insight

Goal: Forecast blast radius before changes.
Scripts:

- `analyze:impact <paths>` returns affected dependents.
- Flake detector (runtime variance store) – future.
  Exit Criteria: Impact report used in PR planning.

## Phase 4 · Optimization & Continuous Learning

Goal: Self-ratcheting quality & institutional memory.
Automations:

- Weekly trend generation (coverage, bundle, churn vs stability)
- Threshold ratchet proposal when safe (+5–10%)
- Breakthrough log pruning & consolidation (Section 19)
  Exit Criteria: Manual oversight limited to strategic exceptions.

## Feedback Loops

1. Observe → Inventory & metrics.
2. Classify → Risk scoring.
3. Enforce → Threshold gates.
4. Learn → Section 19 breakthrough entries.
5. Ratchet → Automatic threshold increases.
6. Predict → Impact analysis.

## Metrics (Tracked Minimum)

| Category    | Metric                                    | Source         | Notes                                          |
| ----------- | ----------------------------------------- | -------------- | ---------------------------------------------- |
| Coverage    | Global %, Critical Path %                 | vitest JSON    | Critical path = high dependents + exported API |
| Structure   | Orphans, circulars                        | graph          | Circular threshold = 0 tolerated               |
| Performance | Bundle size, build time                   | analyzer/build | Single chunk <150kb gz target                  |
| Stability   | Flake variance, failure rate              | test runs      | Needs historical store                         |
| Debt        | Disabled ESLint rules count, TODO density | lint scan      | TODO density <15 / KLOC target                 |
| Learning    | Breakthroughs logged vs consolidated      | Section 19     | >40% consolidation ratio                       |

## Initial Coverage Exclusion Policy

Rationale: Avoid denominator poisoning from marketing/demo/page shells. Full-surface audit still possible via `test:coverage:full`.
Exclude (in config):

- `src/app/**/page.tsx`
- `src/app/**/layout.tsx`
- `src/components/ui/**/demo.tsx`
- `**/*.stories.tsx`
- `**/index.tsx` re-export barrels (optional future)
  Periodic full run: weekly or before release.

## Section 19 Integration

Each time a script removes manual toil or a threshold ratchets successfully → evaluate for breakthrough entry using required format. Prune stale or trivial entries. Merge into main rule sections when recurring.

## First Sprint (Approved Set)

1. Add coverage exclusions + `test:coverage:full` script.
2. Component inventory script + JSON output.
3. Dependency graph (v1 regex) script.
4. Reports folder + baseline JSON commit.
5. Hook test for `useIntelligence` (behavior + edge case error path).
   Stretch: coverage diff script stub.

## Risk Controls

- Over-exclusion risk → periodic full coverage diff logged.
- Script rot → mark each script with owner + last verified date.
- False dependency edges → replace regex with TS walker in Phase 2.

## Ownership & Cadence

- Steward: AI Agent (automated) + human maintainer override.
- Weekly Monday: Run inventory + full coverage; prune logs.
- Monthly: Evaluate threshold ratchet; update Section 4 if raised.

---

Generated initial version; evolve via breakthrough process (Section 19).
