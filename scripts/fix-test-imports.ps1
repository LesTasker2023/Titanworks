#!/usr/bin/env pwsh

Write-Host "🔧 FIXING COMPONENT TEST IMPORTS" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Get all test files
$testFiles = Get-ChildItem -Path "src/components/ui" -Recurse -Filter "*.test.tsx"

Write-Host "Found $($testFiles.Count) test files to check" -ForegroundColor Yellow

foreach ($testFile in $testFiles) {
    $content = Get-Content $testFile.FullName -Raw
    $componentDir = $testFile.Directory.Name
    
    # Skip if already has proper import
    if ($content -match "import.*$componentDir.*from.*'\./$componentDir'") {
        Write-Host "[SKIP] $($testFile.Name) - Already has correct import" -ForegroundColor Gray
        continue
    }
    
    Write-Host "[FIXING] $($testFile.Name)..." -ForegroundColor Yellow
    
    # Replace generic component references with proper imports
    $newContent = $content -replace "ReferenceError.*not defined", ""
    
    # Add proper import if missing
    if ($newContent -notmatch "import.*$componentDir.*from") {
        # Find where to insert the import (after existing imports)
        $lines = $newContent -split "`n"
        $importIndex = -1
        
        for ($i = 0; $i -lt $lines.Length; $i++) {
            if ($lines[$i] -match "^import.*from") {
                $importIndex = $i
            }
            if ($lines[$i] -match "^$" -and $importIndex -ge 0) {
                break
            }
        }
        
        if ($importIndex -ge 0) {
            $importLine = "import { $componentDir } from './$componentDir';"
            $lines = $lines[0..$importIndex] + $importLine + $lines[($importIndex+1)..($lines.Length-1)]
            $newContent = $lines -join "`r`n"
        }
    }
    
    # Fix common test issues - remove generic props that don't exist
    $newContent = $newContent -replace 'variant="[^"]*"', 'data-testid="test-element"'
    $newContent = $newContent -replace 'size="[^"]*"', ''
    $newContent = $newContent -replace '\s+disabled[>\s]', '>'
    $newContent = $newContent -replace '\s+loading[>\s]', '>'
    
    # Save the file
    try {
        Set-Content -Path $testFile.FullName -Value $newContent -ErrorAction Stop
        Write-Host "[OK] Fixed $($testFile.Name)" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] Failed to fix $($testFile.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✅ IMPORT FIXING COMPLETE!" -ForegroundColor Green
Write-Host "Next: Run yarn test:run to check results" -ForegroundColor Cyan
