# 🚀 TriggerKings Quick Command Reference

## Most Used Commands (Daily Workflow)

### 🔥 Essential Daily Commands

```bash
yarn dev                     # Start development
yarn test:run                # Run all tests
yarn quality                 # Full quality check
git commit -m "message"      # Commit (auto-stages + triggers automation)
```

### 🎯 Release Management

```bash
yarn release:dry             # Preview release changes
yarn release:manual          # Interactive release
yarn release:force           # Automated release
```

### 🧪 Testing & Quality

```bash
yarn test                    # Test in watch mode
yarn lint:fix                # Auto-fix linting issues
yarn type-check              # TypeScript validation
yarn build                   # Production build test
```

### 🎨 Component Development

```bash
yarn component               # Create new component
yarn quality-audit           # Analyze component health
yarn snapshots               # Backup all components
yarn storybook               # Component documentation
```

### 🛠️ Maintenance & Cleanup

```bash
yarn clean                   # Clean build cache
yarn optimize                # Full optimization
yarn audit:deps             # Security audit
yarn format                 # Format all files
```

---

## 🚨 Emergency Commands

### If Build Breaks

```bash
yarn clean && yarn build     # Clean rebuild
yarn optimize                # Full optimization
yarn type-check              # Check TypeScript only
```

### If Automation Fails

```bash
yarn release:dry             # Check what would happen
yarn pre-commit:dry          # Test automation safely
git reset --soft HEAD~1      # Undo last commit (keep changes)
```

### If Dependencies Break

```bash
yarn clean:install          # Clean reinstall
yarn audit:deps             # Check for issues
yarn check:unused           # Remove unused deps
```

---

## 📊 Current Project Status

- **Version**: 1.4.0 (auto-managed)
- **Components**: 31 total
- **Coverage**: 90.3% stories/tests
- **Quality**: Enterprise-grade automation

## 🎯 Automation Features

- ✅ **Auto-staging** of all changes on commit
- ✅ **Auto-versioning** on every commit
- ✅ **Dashboard sync** with real-time metrics
- ✅ **Quality gates** prevent broken commits
- ✅ **Rollback protection** on failures
- ✅ **Zero manual** version management

---

**💡 Pro Tip**: Just use `git commit` for your daily workflow - automation handles versioning, metrics, and validation automatically! 🚀

---

## 📚 Need More Detail?

- **📋 All Documentation**: `docs/DOCUMENTATION_INDEX.md` - Complete doc map
- **🔧 Complete Commands**: `docs/SCRIPT_COMMANDS.md` - Full command reference
- **🧩 Component Dev**: `docs/COMPONENT_DEVELOPMENT.md` - Component guide
- **🤖 Enterprise Auto**: `docs/PRE_COMMIT_AUTOMATION.md` - Automation system
