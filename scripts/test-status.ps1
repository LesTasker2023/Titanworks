# Test Status Runner - Comprehensive Quality Check with Beautiful Reporting
# MuskMode-aligned: Signal-focused output with clear pass/fail indicators

param(
    [switch]$SkipBuild = $false,
    [switch]$SkipCoverage = $false,
    [switch]$Verbose = $false,
    [switch]$CI = $false
)

# Color definitions
$colors = @{
    Green = "Green"
    Red = "Red"
    Yellow = "Yellow"
    Blue = "Blue"
    Cyan = "Cyan"
    Magenta = "Magenta"
    White = "White"
    Gray = "Gray"
}

# Test results storage
$results = @{
    TypeCheck = @{ Status = "Pending"; Duration = 0; Output = "" }
    Lint = @{ Status = "Pending"; Duration = 0; Output = "" }
    Format = @{ Status = "Pending"; Duration = 0; Output = "" }
    Tests = @{ Status = "Pending"; Duration = 0; Output = ""; Stats = @{} }
    Coverage = @{ Status = "Pending"; Duration = 0; Output = ""; Stats = @{} }
    Build = @{ Status = "Pending"; Duration = 0; Output = ""; Size = 0 }
    Warnings = @{ Status = "Pending"; Duration = 0; Output = ""; Count = 0 }
    DeadCode = @{ Status = "Pending"; Duration = 0; Output = ""; Files = 0 }
    TotalDuration = 0
}

# Helper functions
function Write-StatusLine {
    param($Text, $Color = "White")
    if (-not $CI) {
        Write-Host $Text -ForegroundColor $Color
    } else {
        Write-Host $Text
    }
}

function Write-Section {
    param($Title)
    Write-StatusLine "`n$("="*60)" -Color "Blue"
    Write-StatusLine " $Title" -Color "Blue"
    Write-StatusLine "$("="*60)" -Color "Blue"
}

function Measure-Command {
    param([ScriptBlock]$Command)
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    $result = & $Command
    $stopwatch.Stop()
    return @{
        Result = $result
        Duration = $stopwatch.Elapsed.TotalSeconds
    }
}

function Run-TestStep {
    param(
        [string]$Name,
        [string]$Command,
        [scriptblock]$OutputParser = $null,
        [bool]$Required = $true
    )
    
    Write-StatusLine "`n🔄 Running $Name..." -Color "Yellow"
    
    $measure = Measure-Command {
        $output = ""
        $exitCode = 0
        
        try {
            # Capture both stdout and stderr
            $pinfo = New-Object System.Diagnostics.ProcessStartInfo
            $pinfo.FileName = "yarn"
            $pinfo.Arguments = $Command.Replace("yarn ", "")
            $pinfo.RedirectStandardOutput = $true
            $pinfo.RedirectStandardError = $true
            $pinfo.UseShellExecute = $false
            $pinfo.CreateNoWindow = $true
            
            $process = New-Object System.Diagnostics.Process
            $process.StartInfo = $pinfo
            $process.Start() | Out-Null
            
            $stdout = $process.StandardOutput.ReadToEnd()
            $stderr = $process.StandardError.ReadToEnd()
            $process.WaitForExit()
            $exitCode = $process.ExitCode
            
            $output = $stdout + $stderr
        } catch {
            $output = $_.Exception.Message
            $exitCode = 1
        }
        
        return @{ Output = $output; ExitCode = $exitCode }
    }
    
    $commandResult = $measure.Result
    $duration = $measure.Duration
    
    # Determine status
    $status = if ($commandResult.ExitCode -eq 0) { "Passed" } else { "Failed" }
    $color = if ($status -eq "Passed") { "Green" } else { "Red" }
    
    # Store results
    $results[$Name].Status = $status
    $results[$Name].Duration = $duration
    $results[$Name].Output = $commandResult.Output
    
    # Parse output if parser provided
    if ($OutputParser) {
        $parsed = & $OutputParser $commandResult.Output
        $results[$Name].Stats = $parsed
    }
    
    # Show immediate result
    $icon = if ($status -eq "Passed") { "✅" } else { "❌" }
    Write-StatusLine "$icon $Name - $status (${duration:F1}s)" -Color $color
    
    if ($status -eq "Failed" -and $Required) {
        Write-StatusLine "   Error: $($commandResult.Output | Select-Object -First 3)" -Color "Red"
    }
    
    return $status -eq "Passed"
}

# Output parsers
$TestOutputParser = {
    param($output)
    $stats = @{}
    
    if ($output -match "Tests\s+(\d+)\s+passed\s+\((\d+)\)") {
        $stats.Passed = [int]$matches[1]
        $stats.Total = [int]$matches[2]
        $stats.Failed = $stats.Total - $stats.Passed
        $stats.PassRate = [math]::Round(($stats.Passed / $stats.Total) * 100, 1)
    }
    
    if ($output -match "Duration\s+([0-9.]+)s") {
        $stats.TestDuration = [double]$matches[1]
    }
    
    return $stats
}

$CoverageOutputParser = {
    param($output)
    $stats = @{}
    
    # Parse coverage percentages
    if ($output -match "All files\s*\|\s*([0-9.]+)\s*\|\s*([0-9.]+)\s*\|\s*([0-9.]+)\s*\|\s*([0-9.]+)") {
        $stats.Statements = [double]$matches[1]
        $stats.Branches = [double]$matches[2]
        $stats.Functions = [double]$matches[3]
        $stats.Lines = [double]$matches[4]
        $stats.Average = [math]::Round(($stats.Statements + $stats.Branches + $stats.Functions + $stats.Lines) / 4, 1)
    }
    
    return $stats
}

$BuildOutputParser = {
    param($output)
    $stats = @{}
    
    # Parse bundle size
    if ($output -match "First Load JS shared by all\s+([0-9.]+)\s*(kB|MB)") {
        $size = [double]$matches[1]
        $unit = $matches[2]
        $stats.BundleSize = if ($unit -eq "MB") { $size * 1024 } else { $size }
    }
    
    # Count routes
    $routes = ($output | Select-String "├|└" | Measure-Object).Count
    $stats.Routes = $routes
    
    return $stats
}

$WarningsOutputParser = {
    param($output)
    $stats = @{}
    
    # Count warnings
    $warningCount = ($output | Select-String "warning" -AllMatches | Measure-Object).Count
    $stats.Count = $warningCount
    
    return $stats
}

# Main execution
Write-Section "🚀 TITANWORKS QUALITY GATE - COMPREHENSIVE TEST SUITE"
Write-StatusLine "Running comprehensive quality checks with detailed reporting..." -Color "Cyan"
Write-StatusLine "Start time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -Color "Gray"

$overallStart = Get-Date

# Run all tests
$allPassed = $true

# 1. Type Check
$allPassed = (Run-TestStep "TypeCheck" "type-check") -and $allPassed

# 2. Linting
$allPassed = (Run-TestStep "Lint" "lint") -and $allPassed

# 3. Format Check
$allPassed = (Run-TestStep "Format" "format:check") -and $allPassed

# 4. Test Suite
$allPassed = (Run-TestStep "Tests" "test:run" -OutputParser $TestOutputParser) -and $allPassed

# 5. Coverage (if not skipped)
if (-not $SkipCoverage) {
    $allPassed = (Run-TestStep "Coverage" "test:coverage" -OutputParser $CoverageOutputParser -Required $false) -and $allPassed
}

# 6. Build (if not skipped)
if (-not $SkipBuild) {
    $allPassed = (Run-TestStep "Build" "build" -OutputParser $BuildOutputParser) -and $allPassed
}

# 7. Warning Tracking
$allPassed = (Run-TestStep "Warnings" "track-warnings" -OutputParser $WarningsOutputParser -Required $false) -and $allPassed

# 8. Dead Code Scan (optional)
if ($Verbose) {
    try {
        $allPassed = (Run-TestStep "DeadCode" "scan-dead-code" -Required $false) -and $allPassed
    } catch {
        Write-StatusLine "⚠️  Dead code scan skipped (tool not available)" -Color "Yellow"
    }
}

$overallEnd = Get-Date
$results.TotalDuration = ($overallEnd - $overallStart).TotalSeconds

# Generate Beautiful Summary Report
Write-Section "COMPREHENSIVE TEST RESULTS SUMMARY"

# Overall Status
$overallStatus = if ($allPassed) { "ALL SYSTEMS GO [PASS]" } else { "ATTENTION REQUIRED [FAIL]" }
$overallColor = if ($allPassed) { "Green" } else { "Red"
}

Write-StatusLine "`nOVERALL STATUS: $overallStatus" -Color $overallColor
Write-StatusLine "Total Execution Time: $([math]::Round($results.TotalDuration, 1)) seconds" -Color "Cyan"
Write-StatusLine "📅 Completed: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -Color "Gray"

# Detailed Results Table
Write-StatusLine "`n📋 DETAILED RESULTS:" -Color "Blue"
Write-StatusLine "$("-"*80)" -Color "Gray"
Write-StatusLine "| Check        | Status | Duration | Details" -Color "White"
Write-StatusLine "$("-"*80)" -Color "Gray"

foreach ($check in @("TypeCheck", "Lint", "Format", "Tests", "Coverage", "Build", "Warnings", "DeadCode")) {
    if ($results[$check].Status -eq "Pending") { continue }
    
    $status = $results[$check].Status
    $duration = "$([math]::Round($results[$check].Duration, 1))s"
    $statusIcon = if ($status -eq "Passed") { "✅" } else { "❌" }
    
    # Add specific details
    $details = ""
    switch ($check) {
        "Tests" { 
            if ($results.Tests.Stats.Total) {
                $details = "$($results.Tests.Stats.Passed)/$($results.Tests.Stats.Total) passed ($($results.Tests.Stats.PassRate)%)"
            }
        }
        "Coverage" {
            if ($results.Coverage.Stats.Average) {
                $details = "Avg: $($results.Coverage.Stats.Average)%"
            }
        }
        "Build" {
            if ($results.Build.Stats.BundleSize) {
                $details = "Bundle: $([math]::Round($results.Build.Stats.BundleSize, 0))kB"
            }
        }
        "Warnings" {
            if ($results.Warnings.Stats.Count -ne $null) {
                $details = "Count: $($results.Warnings.Stats.Count)"
            }
        }
    }
    
    Write-StatusLine "| $($check.PadRight(12)) | $statusIcon $($status.PadRight(6)) | $($duration.PadLeft(8)) | $details" -Color "White"
}

Write-StatusLine "$("-"*80)" -Color "Gray"

# Key Metrics
if ($results.Tests.Stats.Total) {
    Write-StatusLine "`n🧪 TEST METRICS:" -Color "Blue"
    Write-StatusLine "   • Total Tests: $($results.Tests.Stats.Total)" -Color "White"
    Write-StatusLine "   • Passed: $($results.Tests.Stats.Passed) ($($results.Tests.Stats.PassRate)%)" -Color "Green"
    if ($results.Tests.Stats.Failed -gt 0) {
        Write-StatusLine "   • Failed: $($results.Tests.Stats.Failed)" -Color "Red"
    }
    Write-StatusLine "   • Test Execution: $([math]::Round($results.Tests.Stats.TestDuration, 1))s" -Color "Cyan"
}

if ($results.Coverage.Stats.Average) {
    Write-StatusLine "`n📈 COVERAGE METRICS:" -Color "Blue"
    Write-StatusLine "   • Overall: $($results.Coverage.Stats.Average)%" -Color "White"
    Write-StatusLine "   • Statements: $($results.Coverage.Stats.Statements)%" -Color "White"
    Write-StatusLine "   • Branches: $($results.Coverage.Stats.Branches)%" -Color "White"
    Write-StatusLine "   • Functions: $($results.Coverage.Stats.Functions)%" -Color "White"
    Write-StatusLine "   • Lines: $($results.Coverage.Stats.Lines)%" -Color "White"
}

if ($results.Build.Stats.BundleSize) {
    Write-StatusLine "`n📦 BUILD METRICS:" -Color "Blue"
    Write-StatusLine "   • Bundle Size: $([math]::Round($results.Build.Stats.BundleSize, 0))kB" -Color "White"
    Write-StatusLine "   • Routes: $($results.Build.Stats.Routes)" -Color "White"
    Write-StatusLine "   • Build Duration: $([math]::Round($results.Build.Duration, 1))s" -Color "Cyan"
}

# Performance Assessment
Write-StatusLine "`n⚡ PERFORMANCE ASSESSMENT:" -Color "Blue"
$perf = switch ($results.TotalDuration) {
    { $_ -lt 30 } { @{ Rating = "🚀 EXCELLENT"; Color = "Green"; Note = "Sub-30s execution time" } }
    { $_ -lt 60 } { @{ Rating = "✅ GOOD"; Color = "Yellow"; Note = "Under 1 minute" } }
    { $_ -lt 120 } { @{ Rating = "⚠️  ACCEPTABLE"; Color = "Yellow"; Note = "Under 2 minutes" } }
    default { @{ Rating = "🐌 NEEDS OPTIMIZATION"; Color = "Red"; Note = "Over 2 minutes" } }
}

Write-StatusLine "   • Speed Rating: $($perf.Rating)" -Color $perf.Color
Write-StatusLine "   • Note: $($perf.Note)" -Color "Gray"

# Final Actions
if ($allPassed) {
    Write-StatusLine "`n🎉 ALL QUALITY GATES PASSED!" -Color "Green"
    Write-StatusLine "   Ready for commit and deployment. ✈️" -Color "Green"
    exit 0
} else {
    Write-StatusLine "`n🚨 QUALITY ISSUES DETECTED!" -Color "Red"
    Write-StatusLine "   Please review and fix issues before committing." -Color "Red"
    
    # Show failed checks
    $failed = $results.GetEnumerator() | Where-Object { $_.Value.Status -eq "Failed" } | ForEach-Object { $_.Key }
    if ($failed.Count -gt 0) {
        Write-StatusLine "`n   Failed checks: $($failed -join ", ")" -Color "Yellow"
    }
    exit 1
}