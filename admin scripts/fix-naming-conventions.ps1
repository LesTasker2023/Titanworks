# Fix Naming Conventions Script
# Standardizes component files to PascalCase and converts index.ts to index.tsx

Write-Host "🔧 Starting naming convention fixes..." -ForegroundColor Green

$componentsPath = "src/components/ui"
$fixedFiles = @()
$errors = @()

# 1. Fix NavigationMenu kebab-case file
Write-Host "`n1. 🏷️  Fixing NavigationMenu kebab-case file..."

$navMenuPath = "$componentsPath/NavigationMenu"
if (Test-Path "$navMenuPath/navigation-menu.tsx") {
    Write-Host "   📁 Processing NavigationMenu component..."
    
    try {
        # Copy the implementation to PascalCase name
        Copy-Item "$navMenuPath/navigation-menu.tsx" "$navMenuPath/NavigationMenu.tsx" -Force
        Write-Host "   ✅ Copied navigation-menu.tsx → NavigationMenu.tsx" -ForegroundColor Green
        
        # Update the index file
        $indexContent = Get-Content "$navMenuPath/index.tsx" -Raw
        $updatedContent = $indexContent -replace "from './navigation-menu'", "from './NavigationMenu'"
        Set-Content "$navMenuPath/index.tsx" -Value $updatedContent -NoNewline
        Write-Host "   ✅ Updated index.tsx to import from ./NavigationMenu" -ForegroundColor Green
        
        # Remove kebab-case file
        Remove-Item "$navMenuPath/navigation-menu.tsx" -Force
        Write-Host "   ✅ Removed kebab-case navigation-menu.tsx" -ForegroundColor Green
        
        $fixedFiles += "NavigationMenu component"
    }
    catch {
        Write-Host "   ❌ Error processing NavigationMenu: $_" -ForegroundColor Red
        $errors += "NavigationMenu: $_"
    }
}

# 2. Convert index.ts files to index.tsx
Write-Host "`n2. 📄 Converting index.ts files to index.tsx..."

$indexFiles = Get-ChildItem "$componentsPath/*/index.ts" -ErrorAction SilentlyContinue
$convertedCount = 0

foreach ($indexFile in $indexFiles) {
    $componentName = $indexFile.Directory.Name
    $newPath = $indexFile.FullName -replace '\.ts$', '.tsx'
    
    try {
        # Check if file contains JSX-related exports
        $content = Get-Content $indexFile.FullName -Raw -ErrorAction SilentlyContinue
        if ($content -and ($content -match "Demo" -or $content -match "export.*from.*\./")) {
            Rename-Item $indexFile.FullName $newPath -Force
            Write-Host "   ✅ $componentName/index.ts → index.tsx" -ForegroundColor Green
            $convertedCount++
        }
        else {
            Write-Host "   ⏭️  $componentName/index.ts - keeping as .ts" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "   ❌ Error converting $componentName/index.ts: $_" -ForegroundColor Red
        $errors += "$componentName index conversion"
    }
}

$fixedFiles += "$convertedCount index.ts files converted to index.tsx"

# 3. Summary Report
Write-Host "`n📊 Summary Report:" -ForegroundColor Cyan
Write-Host "=================" -ForegroundColor Cyan

if ($fixedFiles.Count -gt 0) {
    Write-Host "`n✅ Successfully fixed:" -ForegroundColor Green
    foreach ($fix in $fixedFiles) {
        Write-Host "   • $fix" -ForegroundColor Green
    }
}

if ($errors.Count -gt 0) {
    Write-Host "`n❌ Errors encountered:" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "   • $error" -ForegroundColor Red
    }
}

Write-Host "`n🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Run 'yarn intel:scan' to verify fixes" -ForegroundColor White
Write-Host "   2. Run 'yarn test' to ensure imports work correctly" -ForegroundColor White
Write-Host "   3. Commit changes if all tests pass" -ForegroundColor White

Write-Host "`n🔧 Naming convention fixes completed!" -ForegroundColor Green
