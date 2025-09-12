# Changelog

## [Unreleased]

### Fixed

- stripTransientProps: do not strip 'disabled' or 'selected'; document rationale for HTML semantics and accessibility
- track-warnings: ensure reports directory exists before writing ledger
- package.json: use npx tsx for TypeScript dead code scan script

### Signal

- Prevents runtime errors, preserves HTML semantics, and ensures reliable automation for code quality enforcement.

All notable changes to this project will be documented in this file.

Format: Generated via `standard-version` (Conventional Commits). Do not edit previous entries manually; new entries are appended by the release process.

## [1.53.0] - 2025-09-12

### Added

- Baseline instrumentation: component inventory, dependency graph, coverage baseline scripts.
- `useIntelligence` hook tests and coverage threshold temporary adjustment.

### Notes

- Temporary coverage thresholds lowered (Section 16 conflict resolution) pending ratchet.
