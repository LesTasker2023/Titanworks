# Daedalus Script Command Reference

## 📋 Table of Contents

- [🚀 Release & Automation](#-release--automation)
- [🧪 Development & Testing](#-development--testing)
- [🔧 Quality & Maintenance](#-quality--maintenance)
- [🎨 Component Management](#-component-management)
- [🛠️ Utility Scripts](#️-utility-scripts)
- [📊 Analysis & Reporting](#-analysis--reporting)
- [🐛 Debugging & Fixes](#-debugging--fixes)

---

## 🚀 Release & Automation

### Enterprise Pre-Commit Automation

**Automatic version bumping, dashboard updates, and component validation**

```bash
# Automatic execution (runs on git commit via husky)
git commit -m "your message"  # Triggers automation automatically

# Manual execution commands
yarn pre-commit:auto         # Run full automation manually
yarn pre-commit:dry          # Preview automation changes (safe)

# Interactive release management
yarn release:manual          # Interactive release with confirmation
yarn release:dry             # Preview manual release changes
yarn release:force           # Execute release without prompts
```

**What it does:**

- ✅ Bumps minor version (1.4.0 → 1.5.0)
- ✅ Updates dashboard with latest component metrics
- ✅ Refreshes component showcase statistics
- ✅ Validates TypeScript integrity
- ✅ Stages changes automatically
- ✅ Provides rollback on failures

---

## 🧪 Development & Testing

### Next.js Development

```bash
yarn dev                     # Start development server
yarn dev:all                 # Start dev server + Storybook concurrently
yarn build                   # Production build
yarn start                   # Start production server
yarn analyze                 # Bundle analysis with ANALYZE=true
```

### Testing Suite

```bash
yarn test                    # Run tests in watch mode
yarn test:ui                 # Run tests with UI interface
yarn test:run                # Run all tests once with verbose output
yarn test:watch              # Run tests in watch mode
yarn test:snapshots          # Run only snapshot tests
yarn test:components         # Run component tests (excluding snapshots)
```

### Storybook

```bash
yarn storybook               # Start Storybook dev server (port 6006)
yarn build-storybook         # Build Storybook for production
```

---

## 🔧 Quality & Maintenance

### Code Quality

```bash
yarn lint                    # Run ESLint
yarn lint:fix                # Run ESLint with auto-fix
yarn type-check              # TypeScript type checking
yarn format                  # Format all files with Prettier
yarn format:check            # Check if files are formatted
yarn quality                 # Run full quality check (type-check + lint + format + test)
yarn optimize                # Full optimization (clean + lint + type-check + build)
```

### Dependency Management

```bash
yarn audit:deps             # Audit dependencies for vulnerabilities
yarn check:unused           # Check for unused dependencies
yarn clean                  # Clean build artifacts and cache
yarn clean:install          # Clean install (remove node_modules + reinstall)
```

---

## 🎨 Component Management

### Component Creation & Analysis

```bash
yarn component               # Interactive component creation wizard
yarn snapshots               # Snapshot all components for backup
yarn quality-audit           # Comprehensive component quality audit
yarn audit-list             # List all components for audit
yarn audit-quick            # Quick component audit with filters
```

### Shadcn Integration

```bash
yarn shad:analyze           # Analyze shadcn component usage
yarn shad:next              # Shadcn Next.js integration commands
```

---

## 🛠️ Utility Scripts

### Shorthand Processing

```bash
yarn shorthand               # Process shorthand commands
yarn clinical               # Clinical shorthand processing
yarn emergency              # Emergency shorthand processing
yarn scp                    # SCP shorthand processing
```

### Container Management

```bash
yarn container:cleanup      # Clean up container components
yarn container:migrate      # Systematic container migration
```

### Formatting & Fixes

```bash
yarn format:md              # Format Markdown files
yarn fix:headers            # Batch fix component headers
yarn fix:containers         # Fix container component issues
yarn fix:balance            # Balance component structure
yarn fix:tags               # Fix closing tags in components
```

---

## 📊 Analysis & Reporting

### Current Project Status

- **Version**: 1.4.0 (auto-managed)
- **Components**: 31 total
- **Stories Coverage**: 90.3% (28/31 components)
- **Tests Coverage**: 90.3% (28/31 components)
- **Export Coverage**: 100%

### Quality Metrics Commands

```bash
# Get current component statistics
yarn quality-audit          # Full component ecosystem analysis
yarn audit-list             # Detailed component breakdown
yarn shad:analyze           # Shadcn component coverage analysis
```

### Performance Analysis

```bash
yarn analyze                 # Bundle size analysis
yarn build                  # Check build performance
yarn type-check             # TypeScript compilation speed
```

---

## 🐛 Debugging & Fixes

### Common Issues & Solutions

#### Version/Release Issues

```bash
# Check current version
grep "version" package.json

# Preview what automation would do
yarn release:dry

# Manual release if automation fails
yarn release:manual

# Force release (bypass confirmations)
yarn release:force
```

#### Build Issues

```bash
# Clean build
yarn clean && yarn build

# Full optimization
yarn optimize

# Type check only
yarn type-check

# Check linting
yarn lint
```

#### Component Issues

```bash
# Component audit
yarn quality-audit

# Fix common container issues
yarn fix:containers

# Fix component headers
yarn fix:headers

# Balance component structure
yarn fix:balance
```

#### Git/Automation Issues

```bash
# Check pre-commit hook status
cat .husky/pre-commit

# Test automation without committing
yarn pre-commit:dry

# Manual automation execution
yarn pre-commit:auto

# Check git status
git status
```

---

## 🎯 Best Practices

### Daily Development Workflow

1. **Start development**: `yarn dev`
2. **Make changes**: Edit components/features
3. **Test changes**: `yarn test:run`
4. **Check quality**: `yarn quality`
5. **Commit changes**: `git commit -m "feat: your message"`
   - Automation runs automatically
   - Version bumps to next minor
   - Dashboard updates with metrics
   - Changes staged automatically

### Release Management

```bash
# For major releases
yarn release:manual          # Interactive with confirmation

# For quick releases
yarn release:force           # Automated without prompts

# For testing
yarn release:dry             # Preview without changes
```

### Quality Assurance

```bash
# Before committing
yarn quality                 # Full quality check

# Component health check
yarn quality-audit           # Component ecosystem analysis

# Dependency maintenance
yarn audit:deps             # Security audit
yarn check:unused           # Clean unused deps
```

---

## 🚀 Advanced Features

### Enterprise Automation Features

- **Semantic Versioning**: Automatic minor version bumping
- **Dashboard Synchronization**: Real-time component metrics
- **Quality Gates**: TypeScript validation before commits
- **Rollback Protection**: Automatic revert on failures
- **Cross-Platform**: Windows PowerShell optimized

### Customization Options

- **Version Strategy**: Modify `pre-commit-automation.ps1` for patch/major bumps
- **Dashboard Metrics**: Customize component analysis in automation scripts
- **Quality Checks**: Add custom validation steps to pre-commit workflow

### Integration Points

- **Husky**: Git hooks for automation triggers
- **Lint-staged**: Code quality before automation
- **Next.js**: Build validation and optimization
- **Storybook**: Component documentation and testing
- **Vitest**: Comprehensive testing framework

---

## 📞 Support & Troubleshooting

### Quick Diagnostic Commands

```bash
# System health check
yarn quality

# Component ecosystem status
yarn quality-audit

# Release system test
yarn release:dry

# Build system test
yarn build

# TypeScript health
yarn type-check
```

### Emergency Recovery

```bash
# If automation breaks commit
git reset --soft HEAD~1      # Undo last commit, keep changes

# If build fails
yarn clean && yarn optimize  # Full clean rebuild

# If dependencies corrupt
yarn clean:install          # Clean dependency reinstall
```

### Getting Help

- **Automation Docs**: `docs/PRE_COMMIT_AUTOMATION.md`
- **Component Guide**: `docs/COMPONENT_DEVELOPMENT.md`
- **Style Guide**: `docs/STYLE_GUIDE.md`

---

**🎯 Bottom Line**: This command reference covers every aspect of the Daedalus development workflow. From automated releases to component management to quality assurance - everything you need is documented and accessible via simple yarn commands.

**Enterprise-grade tooling, startup-speed execution! 🚀**
