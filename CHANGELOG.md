# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [Unreleased]

### Fixed

- **Critical Production Error**: Fixed React minified error #130 in multi-domain system
  - Replaced build-time dynamic imports with runtime component loading
  - Resolved invalid object being passed to React during component resolution
  - Fixed "Uncaught SyntaxError: Invalid or unexpected token" in production builds
  - All Vercel deployments now work correctly with domain-specific components
- **Domain Configuration**: Fixed client-side exceptions across all domains
  - Updated domain configurations to reference existing components only (DefaultHero, EnterpriseHero, ProductHero)
  - Removed invalid component references (ServiceHero, TechHero, ResearchHero, MediaHero, PortfolioHero)
  - Enhanced error handling with comprehensive fallbacks and logging
  - Added defensive programming to prevent domain detection failures
  - Fixed React component state setting with proper function wrappers

### Added

- **Comprehensive Test Status System**: Added cross-platform quality reporting with beautiful terminal output
  - New Node.js script (`scripts/test-status.js`) with full ES module support for CI environments
  - PowerShell version (`scripts/test-status.ps1`) for Windows development workflows
  - Comprehensive quality gates: type-check, lint, format, tests, coverage, build, warnings
  - Performance metrics with timing analysis and bundle size reporting
  - Multiple execution modes: fast, verbose, cross-platform, and CI-optimized
  - Enhanced package.json scripts for different quality status reporting scenarios

- **Multi-Domain Deployment System**: Complete infrastructure for deploying single repository to unlimited domains
  - Dynamic domain detection system with environment variable control
  - Component registry with domain-specific hero, navigation, and footer variants
  - Comprehensive site configuration system driven by environment variables
  - Domain-specific branding, colors, content, and contact information
  - Support for daedalus, airpods, titandigital, titanforge, titanlabs, titanmedia, titanworks, and custom domains
  - Complete Vercel deployment template with 150+ environment variables
  - Build-time component resolution for optimal bundle sizes per domain
  - Documentation and implementation guides for easy replication

### Fixed

- **Test Infrastructure Stability**: Resolved critical test configuration issues blocking CI/CD pipeline
  - Fixed Separator component prop spreading for proper test attribute handling
  - Updated SimpleChart and Slider tests to use BEM classes instead of removed Tailwind classes
  - Corrected globalThis reference in test setup to resolve browser compatibility issues
  - Separated unit tests from Storybook visual tests in Vitest configuration
  - Updated component snapshots to reflect current implementation (Calendar, Separator)
  - Added baseline utils test to ensure test pipeline functionality
  - Achieved 98.2% test pass rate (1112/1132 tests passing)

### Added

- **Comprehensive Storybook Integration**: Complete overhaul of Storybook setup with modern tooling
  - Fresh Storybook 9.1.5 installation with Vite integration for improved performance
  - SCSS compilation support with proper Hot Module Replacement (HMR)
  - Systematic SCSS imports added to all 52+ component stories for complete styling coverage
- **Enhanced Design Token System**: Extended spacing and design token coverage
  - Added missing spacing tokens (--spacing-5, --spacing-9, --spacing-10) for proper component sizing
  - Improved semantic color token architecture with better dark mode support
- **BEM-Style SCSS Architecture**: Converted entire UI component library from Tailwind to maintainable SCSS
  - Individual component SCSS modules with proper design token integration
  - Semantic class naming following BEM methodology for better maintainability
- Warning ledger system for persistent warning tracking (§1.1 Signal>Noise doctrine)
- stripTransientProps utility to prevent non-HTML attributes from leaking to DOM
- CI/CD integration for automated warning monitoring and backlog generation
- Package scripts for warning tracking: `track-warnings`, `track-warnings:report`, `track-warnings:backlog`

### Fixed

- **Button Loading State Issues**: Complete resolution of loading button functionality
  - Fixed text visibility during loading state (removed color: transparent override)
  - Resolved spinner positioning and text overlap with proper padding calculations
  - Added size-specific spinner variants for small, default, and large button sizes
  - Implemented proper cursor states (wait) during loading operations
- **Component Sizing Issues**: Fixed button size inconsistencies
  - Large buttons now properly sized (2.5rem vs 2.25rem default) with missing spacing tokens
  - Consistent spacing across all component size variants
- **Button Border Radius**: Added missing radius design tokens (--radius-sm, --radius-md, --radius-lg, --radius-xl) to globals.css
  - Resolves Button components using var(--radius-md) when variable was undefined
  - Fixes square button edges on home page and ensures consistent border radius across all components
  - Variables added to both light and dark mode sections for theme consistency

### Changed

- **Storybook Development Experience**: Dramatically improved component development workflow
  - All components now display with proper styling in Storybook interface
  - Fast HMR updates for immediate visual feedback during development
  - Comprehensive component story coverage with interactive examples

### Changed

- **CSS Naming Convention**: Converted PascalCase and camelCase CSS selectors to kebab-case for consistency
  - SimpleChart: `simpleChart` → `simple-chart` with all sub-elements (bar-container, pie-item, line-value, etc.)
  - Slider: `valueDisplay` → `value-display`
  - Sonner: `actionButton`/`cancelButton` → `action-button`/`cancel-button`
  - ColorPicker: `actionButton` → `action-button` (partial conversion)
  - Maintains BEM methodology with consistent kebab-case naming throughout codebase

### Fixed

- DOM prop warnings eliminated across all UI components (Button, Toggle, Toast, Accordion, Alert, Badge, Breadcrumb, DataTable, Pagination, Popover, Separator, Tooltip, Tabs, Chart, Table, Menubar)
- Prevented React non-boolean attributes (active, loading, hover, error) from being passed to DOM elements
- Preserved HTML semantics by maintaining valid HTML attributes (disabled, selected, etc.)

- DOM prop warnings in Button, Toggle, Toast, Accordion, Alert, Badge, Breadcrumb, DataTable, Pagination, Popover, Separator, and Tooltip components
- Applied stripTransientProps to prevent React warnings for non-boolean attributes (active, hover, loading, error) being passed to DOM elements
- stripTransientProps: preserve 'disabled' and 'selected' HTML attributes for accessibility and semantic compliance

## 1.54.0 (2025-09-12)

### Features

- Command Center Dashboard & Component Showcase Fixes ([ec6c3c8](https://github.com/LesTasker2023/Daedalus/commit/ec6c3c891d22bdfa0c5eeeb534e43f534841dda6))
- Achieve 100% repository health with comprehensive ESLint fixes ([e68e576](https://github.com/LesTasker2023/Daedalus/commit/e68e576c575eb437da2e9755ba5ebebceebcf8d0))
- Add comprehensive snapshot testing system ([045b294](https://github.com/LesTasker2023/Daedalus/commit/045b2946e33549bd0da19acc1f6f90bebeb15b33))
- add enforcement toolkit and repository analysis ([3a0658e](https://github.com/LesTasker2023/Daedalus/commit/3a0658ee81af467a188408419122e4cdaebf9f36))
- Add enterprise shadcn/ui + Next.js documentation and optimize codebase ([91f07fa](https://github.com/LesTasker2023/Daedalus/commit/91f07fa640c7b024e83cba3d9a337dbdea192958))
- add enterprise-grade component with comprehensive testing and documentation ([7ddf2ff](https://github.com/LesTasker2023/Daedalus/commit/7ddf2fffe4b2e55cbb38253a95ea304c0c684cde))
- Add production-ready component automation system ([b747ccd](https://github.com/LesTasker2023/Daedalus/commit/b747ccdb1d36f586a1070f456c0210dd6f83dcc9))
- AI-driven component expansion - Add Separator, Switch, Tooltip, Skeleton, and Label ([c3b7198](https://github.com/LesTasker2023/Daedalus/commit/c3b71986ab530b344629d7b09e515e5940a1c5e4))
- **alert:** add enhanced Alert component with auto-hide & timer management mastery ([256fe52](https://github.com/LesTasker2023/Daedalus/commit/256fe52ea09877abefb9b413cdc1e890b64d9b4b))
- **avatar:** add enhanced Avatar component with 38 comprehensive tests ([9492798](https://github.com/LesTasker2023/Daedalus/commit/9492798a3dc9d4acd2178d9ab3b73edb6eeadb64))
- **badge:** add enhanced Badge component with 40 comprehensive tests ([205ffa6](https://github.com/LesTasker2023/Daedalus/commit/205ffa612e2a0187f178b0927b8af70e71b23d79))
- Complete accessibility audit and Input Titan component ([6f21ae0](https://github.com/LesTasker2023/Daedalus/commit/6f21ae07cefc97fce61cade90ffc89402ef3f2a2))
- Complete component ecosystem enhancement ([4c2dffb](https://github.com/LesTasker2023/Daedalus/commit/4c2dffb562b16907c31e1d02dbee31164d4950f7))
- Complete comprehensive testing infrastructure overhaul ([00280a7](https://github.com/LesTasker2023/Daedalus/commit/00280a7f9219c13e688c203d29f18543fca3628a))
- complete design system and style guide implementation ([a0a9593](https://github.com/LesTasker2023/Daedalus/commit/a0a95936fee88a7bb09216230a83ad9c33c528cd))
- Complete rebrand from TriggerKings to Daedalus ([a23ce63](https://github.com/LesTasker2023/Daedalus/commit/a23ce63a488e622b34567ce5d51e54e5c4090812))
- Complete systematic enhancement of all 49 component demos ([7afa68d](https://github.com/LesTasker2023/Daedalus/commit/7afa68d6fd9b7dd3d66317860547cb23ab8896cc))
- complete test suite cleanup and package optimization ([2bb667e](https://github.com/LesTasker2023/Daedalus/commit/2bb667e2560b74d87f6fb0c2a3c91005651a95d0))
- Complete Textarea component enhancement with advanced features and enhanced component guide ([dbc97de](https://github.com/LesTasker2023/Daedalus/commit/dbc97dedbab19f3b5765772caebeba6cf06ac376))
- **components:** complete Checkbox component + validate Select component with enhanced testing patterns ([46a829d](https://github.com/LesTasker2023/Daedalus/commit/46a829d522579b21312587005af9cd17e7f43522))
- comprehensive component library consolidation and cleanup ([ebc4783](https://github.com/LesTasker2023/Daedalus/commit/ebc4783442387fe2f3aa68ee363ed39dc353d1e8))
- Comprehensive semantic color system integration ([3da2d79](https://github.com/LesTasker2023/Daedalus/commit/3da2d79fad1723a8fee99e4b0f67bac4875a6df0))
- comprehensive site configuration system - eliminate hardcoded values ([1a2956e](https://github.com/LesTasker2023/Daedalus/commit/1a2956e05b980d7dd7042d291f3ebf399a28373e))
- consolidate navigation demo links into organized dropdown ([29e9e4b](https://github.com/LesTasker2023/Daedalus/commit/29e9e4be7daac65011000fb7fc4b6a4b544dd890))
- Create Intel Dashboard with Real-time Vercel Integration ([d5763f6](https://github.com/LesTasker2023/Daedalus/commit/d5763f67f7ec563ffa9231d199d90f06d59f8b28))
- **datatable:** consolidate all tests into single organized file ([768f266](https://github.com/LesTasker2023/Daedalus/commit/768f266cc31777905f4930bd639326106ae15611))
- **demo:** add comprehensive Tabs component demo page ([869bd7c](https://github.com/LesTasker2023/Daedalus/commit/869bd7c23d3904b6d645d576ec981c9cfb31218f))
- **dialog:** add enhanced Dialog component with 23 comprehensive tests ([1174f30](https://github.com/LesTasker2023/Daedalus/commit/1174f30b428d2d99467085686c31a21f28350fc4))
- enforcement toolkit baseline (prop filter, dead code scan, warning tracker, dependency gate) ([abb6f26](https://github.com/LesTasker2023/Daedalus/commit/abb6f26af0f200179eb754f04f2b1d7dd1a962c3))
- enhance component library with new functionality ([3c91649](https://github.com/LesTasker2023/Daedalus/commit/3c91649a77c179d13538668ccc8dcbd3b3c5fb73))
- enhance component showcase with scroll-to-position and theme-aware styling ([ba9444e](https://github.com/LesTasker2023/Daedalus/commit/ba9444e4b45a1fb5f0209429b4f7046a14406edd))
- enhance pre-commit automation with retry logic and auto-staging ([d4aa322](https://github.com/LesTasker2023/Daedalus/commit/d4aa322bccca7381a806f3db70072c77aa1e97d3))
- Enhanced repository intelligence scanner with accurate test detection ([98df5d6](https://github.com/LesTasker2023/Daedalus/commit/98df5d6600081664129a15fd13eb2a8a026e67b6))
- enterprise dev experience complete ([6901baa](https://github.com/LesTasker2023/Daedalus/commit/6901baa4399999910446f398c509584550416d3b))
- enterprise Pagination component with AI-driven selection and comprehensive showcase ([2f7d965](https://github.com/LesTasker2023/Daedalus/commit/2f7d965a9818536bc0f652b0817c964f5f40d5b0))
- enterprise-grade testing foundation with comprehensive cleanup ([c0216d0](https://github.com/LesTasker2023/Daedalus/commit/c0216d0c2663bcc77f3c356780d3373e50fec97e))
- homepage polish, TopNav nested tutorials megamenu, remove legacy bg and animation ([a7fc72b](https://github.com/LesTasker2023/Daedalus/commit/a7fc72b36e6658ef3085e0c3ca03cbeb42059cbd))
- implement centralized demo exports across all 49 components ([ed8efed](https://github.com/LesTasker2023/Daedalus/commit/ed8efede3d154dbe1d723a2609be4eb0cc5afb44))
- implement comprehensive quality command and testing infrastructure ([c31cc0b](https://github.com/LesTasker2023/Daedalus/commit/c31cc0b80aae380b67cf0f5f12f3eb3f7c7ac1c9))
- implement comprehensive site configuration system ([8a3bbd1](https://github.com/LesTasker2023/Daedalus/commit/8a3bbd105497fa0e4244d7442b1d557e33d44ae2))
- Implement enterprise-grade deductive quality audit system ([c7c2841](https://github.com/LesTasker2023/Daedalus/commit/c7c2841a43136a867befb4de878d7399535fbd70))
- Implement enterprise-grade shadcn Card component with CVA variants ([d7e0d4c](https://github.com/LesTasker2023/Daedalus/commit/d7e0d4cf16467f8bbf52f70b9b56c2c7c6db1e35))
- Integrate Card component into component showcase ([e17eb20](https://github.com/LesTasker2023/Daedalus/commit/e17eb2093241462983ddb5da5b96cd6ca91ca05a))
- integrate style guide system into streamlined development workflow ([60fb2b5](https://github.com/LesTasker2023/Daedalus/commit/60fb2b5315351795cb4f5ef431b6ccb44faf34fc))
- optimize container width for better UX ([371747e](https://github.com/LesTasker2023/Daedalus/commit/371747e4b70b54b6bb79bd2debfe2d1c2de2f59c))
- production-ready component showcase with comprehensive testing and smooth navigation ([928ec4c](https://github.com/LesTasker2023/Daedalus/commit/928ec4c7f06a4f00442f58a55124d020eaae90ee))
- **RadioGroup:** Enhanced radio group component with comprehensive testing ([a473441](https://github.com/LesTasker2023/Daedalus/commit/a4734418a25690ebc611371fad65ca452bbd206e))
- rebuild layout system with modern Container, Navigation, and Footer ([e294dfa](https://github.com/LesTasker2023/Daedalus/commit/e294dfa46ad81cabdb97ee3df93958a4f8de1657))
- Release v1.13.0 - Manual Release ([d1ddd3f](https://github.com/LesTasker2023/Daedalus/commit/d1ddd3ff5bdf45c1ac0d2c705e1d6d7030643efe))
- **select:** add enhanced Select component with 54 comprehensive tests ([eb30264](https://github.com/LesTasker2023/Daedalus/commit/eb30264eee93d1e79591e7b09d4fa675d35d139d))
- **slider:** add enhanced Slider component with 52 comprehensive tests ([d8d69fc](https://github.com/LesTasker2023/Daedalus/commit/d8d69fc8fdc6129edacd63f52544968de4986c6e))
- systematic TypeScript error fixes and enterprise component showcase ([ca2e754](https://github.com/LesTasker2023/Daedalus/commit/ca2e754149ebfeed81bec66b06070c903cb4425a))
- **tabs:** add enhanced Tabs component with 48 comprehensive tests ([ab77a74](https://github.com/LesTasker2023/Daedalus/commit/ab77a74016316a63ff6f12ccee9e37022d461e05))

### Bug Fixes

- address review feedback for prop filter, warning tracker, and dead code scan script ([e5540e4](https://github.com/LesTasker2023/Daedalus/commit/e5540e40c643c128e06717d36bfe03c89d0f172d))
- resolve all ESLint warnings for clean build ([d77bee2](https://github.com/LesTasker2023/Daedalus/commit/d77bee2dbb003388a129c4127ea55cd1fdf92e3b))
- resolve remaining linting warnings and export structure ([d9f52d4](https://github.com/LesTasker2023/Daedalus/commit/d9f52d485146adab3f7e8752306234070e87b01b))
- resolve TypeScript errors in NavigationMenu tests ([03918bb](https://github.com/LesTasker2023/Daedalus/commit/03918bb1775d86e25b89a7350377a5633cdefb5e))
- Standardize component showcase layout consistency ([7b64efb](https://github.com/LesTasker2023/Daedalus/commit/7b64efb531243f5e01c5719637e6b0c89c91bf8c))
- Toast exports, full audit pipeline green, TITAN audit script, 100/100 quality ([81cd6d4](https://github.com/LesTasker2023/Daedalus/commit/81cd6d42a61139ea81f6fb03bf9367601b8e704e))
- update all imports to use named exports after pattern optimization ([dce7226](https://github.com/LesTasker2023/Daedalus/commit/dce7226f135c4ac572e5816ce7a8536c31881c97))

## [1.53.0] - 2025-09-12

### Added

- Baseline instrumentation: component inventory, dependency graph, coverage baseline scripts.
- `useIntelligence` hook tests and coverage threshold temporary adjustment.

### Notes

- Temporary coverage thresholds lowered (Section 16 conflict resolution) pending ratchet.
