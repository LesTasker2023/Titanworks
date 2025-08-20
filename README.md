# Daedalus

> **Enterprise-grade Next.js application with automated versioning, comprehensive component system, and production-ready tooling.**

**Enterprise automation**: Auto-versioning, dashboard sync, 31 components with 90.3% coverage, zero manual release management.

## 🚀 Quick Start

```bash
# Development
yarn dev                     # Start development server
git commit -m "message"      # Commit (triggers auto-versioning)

# Testing & Quality
yarn test:run                # Run all tests
yarn quality                 # Full quality check

# Release Management
yarn release:manual          # Interactive release
yarn release:dry             # Preview changes
```

## 📚 Documentation

### Quick Access

- **[⚡ Quick Reference](QUICK_REFERENCE.md)** - Essential daily commands
- **[📋 Documentation Index](docs/DOCUMENTATION_INDEX.md)** - Complete doc navigation
- **[🔧 All Commands](docs/SCRIPT_COMMANDS.md)** - Full command reference
- **[🤖 Enterprise Automation](docs/PRE_COMMIT_AUTOMATION.md)** - Automation system

### For Developers

- **[🧩 Component Development](docs/COMPONENT_DEVELOPMENT.md)** - Component creation guide
- **[🎨 Style Guide](docs/STYLE_GUIDE.md)** - Code standards & patterns
- **[📖 Tutorials](docs/tutorials/README.md)** - Step-by-step learning paths

### Enterprise Features

- **🎯 Auto-staging**: All changes automatically staged on commit
- **🔄 Automated Versioning**: Minor version bumps on every commit (1.4.0 → 1.5.0)
- **📊 Dashboard Sync**: Real-time component metrics and activity logs
- **🛡️ Quality Gates**: TypeScript validation and automated rollback
- **🎯 Zero Manual Releases**: Git commit triggers full automation workflow

## 🎯 Current Status

- **Version**: 1.4.0 (auto-managed)
- **Components**: 31 enterprise-grade components
- **Stories Coverage**: 90.3% (28/31 components)
- **Tests Coverage**: 90.3% (28/31 components)
- **Export Coverage**: 100%

## 🚀 Enterprise Automation

The Daedalus automation system handles:

- ✅ **Version Management**: Automatic semantic versioning
- ✅ **Dashboard Updates**: Real-time component metrics
- ✅ **Quality Validation**: TypeScript and build checks
- ✅ **File Staging**: Automatic git staging of changes
- ✅ **Rollback Protection**: Revert on validation failures

### Automation Workflow

1. **Developer commits** → `git commit -m "feat: new feature"`
2. **Lint-staged runs** → ESLint, Prettier, formatting
3. **Enterprise automation** → Version bump, dashboard sync, validation
4. **Commit completes** → With updated version and metrics

## 🧩 Component System

### Component Architecture

- **31 Total Components** in production-ready ecosystem
- **Folder-per-component** structure for maintainability
- **100% Export Coverage** - all components properly exported
- **Stories & Tests** for 90.3% of components
- **TypeScript strict mode** for enterprise reliability

### Component Categories

- **UI Components**: Buttons, Inputs, Cards, etc.
- **Layout Components**: Containers, Grids, Spacing
- **Advanced Components**: Data tables, Forms, Navigation
- **Form Components**: Enhanced form handling with server actions

## 🛠️ Development Tools

### Essential Commands

```bash
# Component development
yarn component               # Create new component wizard
yarn storybook               # Component documentation
yarn snapshots               # Backup all components

# Quality assurance
yarn quality-audit           # Component ecosystem analysis
yarn lint:fix                # Auto-fix code issues
yarn type-check              # TypeScript validation

# Maintenance
yarn clean                   # Clean build artifacts
yarn optimize                # Full optimization pipeline
yarn audit:deps             # Security audit
```

### IDE Integration

- **VS Code**: Optimized settings and extensions
- **TypeScript**: Strict mode with comprehensive type safety
- **ESLint**: Enterprise-grade linting rules
- **Prettier**: Consistent code formatting
- **Husky**: Git hooks for automation

## 📊 Performance Metrics

### Build Performance

- **Build Time**: ~3.0 seconds for production build
- **Bundle Size**: Optimized with Next.js 15.4.6
- **Static Pages**: 19 pre-rendered routes
- **Type Safety**: Zero TypeScript errors maintained

### Quality Metrics

- **Component Coverage**: 90.3% with stories and tests
- **Export Integrity**: 100% proper component exports
- **Documentation**: Comprehensive guides and references
- **Automation**: Zero manual intervention required

## 🔧 Architecture

### Technology Stack

- **Next.js 15.4.6**: React framework with app router
- **TypeScript**: Strict mode for enterprise reliability
- **Tailwind CSS**: Utility-first styling (enterprise patterns)
- **Vitest**: Modern testing framework
- **Storybook**: Component documentation and testing
- **Husky**: Git hooks for automation

### Project Structure

```
src/
├── app/                     # Next.js app router
├── components/              # Component ecosystem
│   ├── ui/                  # Core UI components
│   ├── forms/               # Form components
│   ├── layout/              # Layout components
│   └── advanced/            # Advanced components
├── lib/                     # Utility libraries
└── styles/                  # Global styles

docs/                        # Comprehensive documentation
scripts/                     # Automation and utility scripts
```

## 🎯 Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager
- Windows PowerShell (for automation scripts)

### Installation

```bash
# Clone repository
git clone https://github.com/LesTasker2023/Daedalus.git
cd Daedalus

# Install dependencies
yarn install

# Start development
yarn dev
```

### First Commit

```bash
# Make changes to code
# Add files
git add .

# Commit (triggers automation)
git commit -m "feat: your first feature"

# Automation will:
# - Bump version (1.4.0 → 1.5.0)
# - Update dashboard metrics
# - Validate TypeScript
# - Stage changes automatically
```

## 📞 Support

### Documentation

- **[Complete Command Reference](docs/SCRIPT_COMMANDS.md)**
- **[Quick Commands](QUICK_REFERENCE.md)**
- **[Automation Guide](docs/PRE_COMMIT_AUTOMATION.md)**

### Troubleshooting

```bash
# System health check
yarn quality

# Component status
yarn quality-audit

# Release system test
yarn release:dry

# Emergency recovery
yarn clean && yarn optimize
```

---

**🎯 Daedalus delivers enterprise-grade automation with startup-speed execution. Just commit your code - automation handles the rest!** 🚀
