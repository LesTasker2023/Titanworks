# 🎯 Quick Component Validation Script (PowerShell)
# Run this during development to check style guide compliance

param(
    [Parameter(Mandatory=$true)]
    [string]$ComponentPath
)

$ComponentName = Split-Path $ComponentPath -Leaf

Write-Host "🔍 Quick Style Guide Validation for $ComponentName" -ForegroundColor Cyan
Write-Host "=".PadRight(50, '=') -ForegroundColor Cyan

# Check 1: File structure
Write-Host ""
Write-Host "📁 Checking file structure..." -ForegroundColor Yellow

$RequiredFiles = @(
    "$ComponentPath\index.tsx",
    "$ComponentPath\$ComponentName.stories.tsx",
    "$ComponentPath\$ComponentName.test.tsx"
)

foreach ($file in $RequiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $(Split-Path $file -Leaf) exists" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Missing: $(Split-Path $file -Leaf)" -ForegroundColor Red
    }
}

# Check 2: Required variants in main component file
Write-Host ""
Write-Host "🎨 Checking required variants..." -ForegroundColor Yellow

$MainFile = Get-ChildItem "$ComponentPath\*.tsx" | Where-Object { 
    $_.Name -notlike "*.stories.tsx" -and 
    $_.Name -notlike "*.test.tsx" -and 
    $_.Name -ne "index.tsx" 
} | Select-Object -First 1

if ($MainFile) {
    Write-Host "  📄 Analyzing: $($MainFile.Name)" -ForegroundColor Cyan
    $Content = Get-Content $MainFile.FullName -Raw
    
    # Check color variants
    $Variants = @("default", "success", "warning", "danger")
    foreach ($variant in $Variants) {
        if ($Content -match "`"$variant`":") {
            Write-Host "  ✅ $variant variant found" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Missing: $variant variant" -ForegroundColor Red
        }
    }
    
    # Check size variants  
    $Sizes = @("sm", "default", "lg", "xl")
    foreach ($size in $Sizes) {
        if ($Content -match "`"$size`":") {
            Write-Host "  ✅ $size size found" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Missing: $size size" -ForegroundColor Red
        }
    }
    
    # Check required props
    $Props = @("loading", "disabled")
    foreach ($prop in $Props) {
        if ($Content -match "${prop}\?:") {
            Write-Host "  ✅ $prop prop found" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Missing: $prop prop" -ForegroundColor Red
        }
    }
} else {
    Write-Host "  ❌ Cannot find main component file" -ForegroundColor Red
}

# Check 3: Test coverage
Write-Host ""
Write-Host "🧪 Checking test coverage..." -ForegroundColor Yellow

$TestFile = "$ComponentPath\$ComponentName.test.tsx"
if (Test-Path $TestFile) {
    $TestContent = Get-Content $TestFile -Raw
    $TestCount = ([regex]::Matches($TestContent, "it\(")).Count
    Write-Host "  📊 Found $TestCount test cases" -ForegroundColor Cyan
    
    if ($TestCount -ge 30) {
        Write-Host "  ✅ Test count meets requirement (30+)" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Test count below target: $TestCount/30" -ForegroundColor Yellow
    }
    
    # Check test categories
    $Categories = @("Rendering", "Variants", "Events", "Enhanced Features", "Edge Cases", "Accessibility")
    foreach ($category in $Categories) {
        if ($TestContent -match "describe.*$category") {
            Write-Host "  ✅ $category test category found" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Missing: $category test category" -ForegroundColor Red
        }
    }
} else {
    Write-Host "  ❌ Test file not found" -ForegroundColor Red
}

# Check 4: Story coverage
Write-Host ""
Write-Host "📚 Checking story coverage..." -ForegroundColor Yellow

$StoryFile = "$ComponentPath\$ComponentName.stories.tsx"
if (Test-Path $StoryFile) {
    $StoryContent = Get-Content $StoryFile -Raw
    $StoryCount = ([regex]::Matches($StoryContent, "export const")).Count
    Write-Host "  📖 Found $StoryCount stories" -ForegroundColor Cyan
    
    if ($StoryCount -ge 10) {
        Write-Host "  ✅ Story count meets requirement (10+)" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Story count below target: $StoryCount/10" -ForegroundColor Yellow
    }
    
    # Check required stories
    $Stories = @("AllVariants", "AllSizes", "LoadingState", "DisabledState")
    foreach ($story in $Stories) {
        if ($StoryContent -match "export const $story") {
            Write-Host "  ✅ $story story found" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Missing: $story story" -ForegroundColor Red
        }
    }
} else {
    Write-Host "  ❌ Story file not found" -ForegroundColor Red
}

# Check 5: Quick tests
Write-Host ""
Write-Host "🔨 Running quick validation tests..." -ForegroundColor Yellow

try {
    $BuildResult = & yarn build 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Build passes" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Build fails - check for errors" -ForegroundColor Red
    }
} catch {
    Write-Host "  ❌ Build test failed" -ForegroundColor Red
}

try {
    $LintResult = & yarn lint 2>$null  
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Lint passes" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Lint issues found - run 'yarn lint --fix'" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  ⚠️  Lint check failed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=".PadRight(50, '=') -ForegroundColor Cyan
Write-Host "🏁 Quick validation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Fix any ❌ issues above"
Write-Host "  2. Run full validation: node scripts/validate-component.js $ComponentPath"  
Write-Host "  3. Target: 80%+ validation score for shipping"
Write-Host ""
Write-Host "📖 References:" -ForegroundColor Cyan
Write-Host "  - Style Guide Card: docs/STYLE_GUIDE_CARD.txt"
Write-Host "  - Quick Reference: docs/STYLE_GUIDE_QUICK_REFERENCE.md"
