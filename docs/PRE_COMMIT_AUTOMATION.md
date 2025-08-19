# Enterprise Pre-Commit Automation System

## Overview

A comprehensive automation system that automatically handles version bumping, dashboard updates, and component validation when all quality checks pass during commits.

## How It Works

### Automatic Pre-Commit Workflow

1. **Developer makes commit** → `git commit -m "your message"`
2. **Husky triggers pre-commit hook** → Runs lint-staged
3. **Lint-staged executes quality checks**:
   - ESLint fixes TypeScript/JavaScript files
   - Prettier formats all files
4. **If all checks pass** → Enterprise automation triggers automatically
5. **Automation performs**:
   - ✅ Bumps minor version (e.g., 1.1.0 → 1.2.0)
   - ✅ Updates dashboard with latest component metrics
   - ✅ Refreshes component showcase statistics
   - ✅ Validates build still works
   - ✅ Stages all changes automatically

### Manual Release Options

#### Quick Commands

```bash
# Preview what would happen
yarn release:dry

# Interactive manual release
yarn release:manual

# Force release without prompts
yarn release:force

# Just run automation (for debugging)
yarn pre-commit:auto
yarn pre-commit:dry
```

## File Structure

```
scripts/
├── pre-commit-automation.ps1  # Core automation logic
├── manual-release.ps1          # Interactive manual release tool
└── ...

.husky/
└── pre-commit                  # Git hook that triggers automation

package.json                    # Contains automation npm scripts
```

## What Gets Updated

### Version (package.json)

- Automatic minor version bump
- Follows semantic versioning (MAJOR.MINOR.PATCH)
- Resets patch to 0 on minor bump

### Dashboard (src/app/dashboard/page.tsx)

- Version number in title and comments
- Total component count
- Stories coverage percentage
- Tests coverage percentage
- Activity logs with release notes
- Export coverage metrics

### Component Showcase (src/app/component-showcase/page.tsx)

- Component statistics
- Coverage metrics
- Latest counts

## Quality Validation

- **Type Safety**: Runs `yarn type-check` after updates
- **Build Validation**: Runs `yarn build --no-lint` to ensure no breakage
- **Rollback Protection**: Automatically reverts changes if validation fails
- **Staging**: Only stages changes if all validations pass

## Enterprise Features

- 🔄 **Automatic Rollback**: If anything fails, changes are reverted
- 📊 **Comprehensive Metrics**: Tracks 31 components with 90.3% coverage
- 🎯 **Smart Detection**: Only triggers when actual changes are present
- 🚀 **Performance Optimized**: Minimal overhead on commit process
- 📝 **Rich Logging**: Detailed execution logs for debugging
- 🛡️ **Error Handling**: Graceful failure with clear error messages

## Customization

### Modify Version Bump Strategy

Edit `Update-MinorVersion` function in `pre-commit-automation.ps1`:

```powershell
# Current: Minor bump (1.1.0 → 1.2.0)
$newVersion = "$major.$($minor + 1).0"

# Patch bump alternative: (1.1.0 → 1.1.1)
$newVersion = "$major.$minor.$($patch + 1)"
```

### Customize Dashboard Updates

Edit `Update-Dashboard` function to modify:

- Activity log format
- Metric calculations
- Date formatting
- Version display patterns

### Add Component Detection

Extend `Get-ComponentStats` function to:

- Check for additional file types
- Add custom validation rules
- Include dependency analysis

## Best Practices

1. **Commit Early, Commit Often**: Let automation handle the versioning
2. **Quality First**: Fix lint/type errors before committing
3. **Review Automation**: Use `yarn release:dry` to preview changes
4. **Manual Override**: Use `yarn release:manual` for custom releases
5. **Monitor Metrics**: Dashboard shows real-time component health

## Troubleshooting

### Common Issues

- **"Package.json not found"**: Run commands from project root
- **"Build validation failed"**: Fix TypeScript errors before committing
- **"Git staging failed"**: Check git status and resolve conflicts

### Debug Commands

```bash
# Test automation without changes
yarn pre-commit:dry

# Validate current build
yarn type-check && yarn build --no-lint

# Check component stats manually
Get-ComponentStats  # In PowerShell from project root
```

## Success Metrics

Current project status (as of automation setup):

- ✅ **31 Components** in enterprise ecosystem
- ✅ **90.3% Stories Coverage** (28/31 components)
- ✅ **90.3% Tests Coverage** (28/31 components)
- ✅ **Zero Build Errors** with 3.0s compile time
- ✅ **100% Export Coverage** (all components properly exported)

This automation system transforms manual, error-prone release processes into bulletproof, enterprise-grade workflows. No more forgetting to update versions, no more inconsistent dashboard data, no more broken builds making it to production.

**Bottom line**: Commit your code, automation handles the rest. Enterprise-grade quality, startup-speed execution. 🚀
