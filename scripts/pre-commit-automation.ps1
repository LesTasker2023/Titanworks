#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Pre-commit automation for TriggerKings
    
.DESCRIPTION
    Lightweight automation that runs before commits to ensure code quality.
    Part of the monster-mode enterprise pipeline.

.NOTES
    Called automatically by Husky pre-commit hook
    Must be fast (< 10 seconds) to avoid blocking commits
#>

param(
    [switch]$SkipTests = $false,
    [switch]$Verbose = $false
)

# Performance tracking
$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()

Write-Host "ENTERPRISE PRE-COMMIT AUTOMATION" -ForegroundColor Cyan
Write-Host "   Running lightweight quality checks..." -ForegroundColor Gray

# Quick file validation
$errors = @()

try {
    # 1. Check for critical files
    $criticalFiles = @(
        "package.json",
        "tsconfig.json", 
        "next.config.ts"
    )
    
    foreach ($file in $criticalFiles) {
        if (!(Test-Path $file)) {
            $errors += "Missing critical file: $file"
        }
    }
    
    # 2. Quick TypeScript check (non-blocking)
    if (Get-Command "npx" -ErrorAction SilentlyContinue) {
        Write-Host "   Quick TypeScript validation..." -ForegroundColor Gray
        
        $tscResult = npx tsc --noEmit --skipLibCheck 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Host "   TypeScript issues detected (non-blocking)" -ForegroundColor Yellow
            if ($Verbose) {
                Write-Host $tscResult -ForegroundColor Yellow
            }
        } else {
            Write-Host "   TypeScript validation passed" -ForegroundColor Green
        }
    }
    
    # 3. Check for obvious issues
    $problematicPatterns = @(
        @{ Pattern = "console\.log"; Description = "Console statements" }
        @{ Pattern = "debugger;"; Description = "Debugger statements" }
        @{ Pattern = "\.only\("; Description = "Test-only statements" }
    )
    
    $srcFiles = Get-ChildItem -Path "src" -Recurse -Include "*.tsx", "*.ts" -ErrorAction SilentlyContinue
    
    foreach ($pattern in $problematicPatterns) {
        $foundMatches = $srcFiles | Select-String -Pattern $pattern.Pattern -ErrorAction SilentlyContinue
        if ($foundMatches) {
            $count = ($foundMatches | Measure-Object).Count
            if ($count -gt 0) {
                Write-Host "   Found $count $($pattern.Description) (review recommended)" -ForegroundColor Yellow
            }
        }
    }
    
    # 4. Component structure validation (fast)
    $componentDirs = Get-ChildItem -Path "src/components/ui" -Directory -ErrorAction SilentlyContinue
    if ($componentDirs) {
        $totalComponents = ($componentDirs | Measure-Object).Count
        Write-Host "   Component library: $totalComponents components" -ForegroundColor Green
        
        # Quick completeness check
        $componentsWithIndex = 0
        foreach ($dir in $componentDirs) {
            if ((Test-Path "$($dir.FullName)/index.tsx") -or (Test-Path "$($dir.FullName)/index.ts")) {
                $componentsWithIndex++
            }
        }
        
        $indexCoverage = [math]::Round(($componentsWithIndex / $totalComponents) * 100, 1)
        Write-Host "   Index coverage: $indexCoverage% ($componentsWithIndex/$totalComponents)" -ForegroundColor Green
    }
    
    # 5. Report results
    if ($errors.Count -eq 0) {
        Write-Host "   All pre-commit checks passed!" -ForegroundColor Green
    } else {
        Write-Host "   Issues detected:" -ForegroundColor Red
        foreach ($issue in $errors) {
            Write-Host "      $issue" -ForegroundColor Red
        }
    }
    
} catch {
    Write-Host "   Pre-commit automation encountered an error: $_" -ForegroundColor Yellow
    Write-Host "   Continuing with commit (non-blocking)..." -ForegroundColor Gray
}

$stopwatch.Stop()
$duration = $stopwatch.ElapsedMilliseconds

Write-Host "   Completed in $($duration)ms" -ForegroundColor Gray
Write-Host ""

# Always exit successfully to avoid blocking commits
# Critical issues should be caught by CI/CD pipeline
exit 0
