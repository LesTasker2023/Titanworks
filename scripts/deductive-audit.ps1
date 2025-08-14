# TriggerKings Deductive Smart Audit - Start at 100, lose points for failures
param(
    [string]$OutputFile = "reports\QUALITY_REPORT.md",
    [string]$JsonReport = "reports\quality-report.json",
    [string[]]$ComponentFilter = @(),
    [switch]$ListComponents
)

Write-Host "TITAN DEDUCTIVE SMART AUDIT" -ForegroundColor Cyan

# Ensure reports directory exists
if (-not (Test-Path "reports")) {
    New-Item -ItemType Directory -Path "reports" | Out-Null
}

# Component-specific prop requirements - only test what should exist
$ComponentSpecs = @{
    "Avatar" = @{ 
        Variants = @(); # Avatar doesn't use variants 
        Sizes = @("sm", "default", "lg", "xl"); 
        Props = @("src", "alt", "fallback"); 
        Context = "User profile images" 
        TestsFor = @("size") # Only test size variations
    }
    "Button" = @{ 
        Variants = @("default", "destructive", "secondary", "ghost", "outline"); 
        Sizes = @("sm", "default", "lg"); 
        Props = @("disabled", "loading"); 
        Context = "Interactive actions" 
        TestsFor = @("variant", "size", "disabled", "loading")
    }
    "Badge" = @{ 
        Variants = @("default", "secondary", "destructive", "outline"); 
        Sizes = @("sm", "default", "lg"); 
        Props = @("removable"); 
        Context = "Status indicators" 
        TestsFor = @("variant", "size")
    }
    "Input" = @{ 
        Variants = @(); # Input uses HTML input variants
        Sizes = @(); # Input uses HTML size attribute (number)
        Props = @("disabled", "placeholder", "type"); 
        Context = "Text input fields" 
        TestsFor = @("disabled", "type", "placeholder")
    }
    "Alert" = @{ 
        Variants = @("default", "destructive", "warning", "success", "info"); 
        Sizes = @(); # Alert doesn't use sizes
        Props = @(); 
        Context = "User notifications" 
        TestsFor = @("variant")
    }
    "Progress" = @{ 
        Variants = @("default", "success", "warning", "danger"); 
        Sizes = @("sm", "default", "lg", "xl"); 
        Props = @("value", "showLabel"); 
        Context = "Progress indicators" 
        TestsFor = @("variant", "size", "value")
    }
    "Checkbox" = @{ 
        Variants = @(); # Checkbox uses Radix variants
        Sizes = @(); 
        Props = @("checked", "disabled"); 
        Context = "Form checkboxes" 
        TestsFor = @("checked", "disabled")
    }
    "DataTable" = @{ 
        Variants = @("default", "success", "warning", "danger"); 
        Sizes = @(); 
        Props = @("data", "columns"); 
        Context = "Data tables" 
        TestsFor = @("variant", "data", "columns")
    }
    "Dialog" = @{ 
        Variants = @(); # Dialog doesn't use variants
        Sizes = @("sm", "md", "lg", "xl"); 
        Props = @(); 
        Context = "Modal dialogs" 
        TestsFor = @("size")
    }
    "NavigationMenu" = @{ 
        Variants = @(); # Navigation doesn't use variants
        Sizes = @(); 
        Props = @(); 
        Context = "Navigation menus" 
        TestsFor = @()
    }
    "RadioGroup" = @{ 
        Variants = @(); # RadioGroup uses Radix variants
        Sizes = @(); 
        Props = @("defaultValue"); 
        Context = "Radio button groups" 
        TestsFor = @("defaultValue")
    }
    "Select" = @{ 
        Variants = @(); # Select uses Radix variants
        Sizes = @(); 
        Props = @(); 
        Context = "Select dropdowns" 
        TestsFor = @()
    }
    "Slider" = @{ 
        Variants = @("default", "success", "warning", "danger"); 
        Sizes = @("sm", "default", "lg", "xl"); 
        Props = @("defaultValue", "max", "min", "step"); 
        Context = "Range sliders" 
        TestsFor = @("variant", "size", "defaultValue")
    }
    "Tabs" = @{ 
        Variants = @(); # Tabs doesn't use variants
        Sizes = @("sm", "default", "lg", "xl"); 
        Props = @("defaultValue"); 
        Context = "Tab navigation" 
        TestsFor = @("size", "defaultValue")
    }
    "Textarea" = @{ 
        Variants = @(); # Textarea uses HTML variants
        Sizes = @(); # Textarea uses HTML sizing
        Props = @("disabled", "placeholder"); 
        Context = "Multi-line text input" 
        TestsFor = @("disabled", "placeholder")
    }
}

$StartTime = Get-Date
$AllComponents = Get-ChildItem "src\components\ui" -Directory | Where-Object { $_.Name -ne "index.ts" }

# Handle component listing
if ($ListComponents) {
    Write-Host "TRIGGERKINGS COMPONENT LIST" -ForegroundColor Cyan
    Write-Host "Available components:" -ForegroundColor Yellow
    foreach ($comp in $AllComponents | Sort-Object Name) {
        Write-Host "  - $($comp.Name)" -ForegroundColor Gray
    }
    Write-Host ""
    Write-Host "Usage examples:" -ForegroundColor Yellow
    Write-Host "  powershell scripts/deductive-audit.ps1 -ComponentFilter Button" -ForegroundColor Gray
    Write-Host "  powershell scripts/deductive-audit.ps1 -ComponentFilter Avatar" -ForegroundColor Gray
    Write-Host "  powershell scripts/deductive-audit.ps1   # (all components)" -ForegroundColor Gray
    exit 0
}

# Filter components if specified
if ($ComponentFilter.Count -gt 0) {
    $Components = $AllComponents | Where-Object { $_.Name -in $ComponentFilter }
    if ($Components.Count -eq 0) {
        Write-Host "No matching components found. Available components:" -ForegroundColor Red
        foreach ($comp in $AllComponents | Sort-Object Name) {
            Write-Host "  - $($comp.Name)" -ForegroundColor Gray
        }
        exit 1
    }
    Write-Host "TRIGGERKINGS TARGETED AUDIT" -ForegroundColor Cyan
    Write-Host "Testing specific components: $($ComponentFilter -join ', ')" -ForegroundColor Yellow
} else {
    $Components = $AllComponents
    Write-Host "TRIGGERKINGS DEDUCTIVE SMART AUDIT" -ForegroundColor Cyan
}

$TotalComponents = $Components.Count
$PassingComponents = 0
$ComponentDetails = @()

Write-Host "Analyzing $TotalComponents components with deductive validation..." -ForegroundColor Yellow

foreach ($component in $Components) {
    $Name = $component.Name
    $Spec = $ComponentSpecs[$Name]
    $Score = 100  # START AT 100 - DEDUCTIVE SCORING
    $Issues = @()
    
    Write-Host "  $Name..." -ForegroundColor Gray
    
    # File structure validation - lose points for missing files
    if (-not (Test-Path "$($component.FullName)\index.tsx")) { 
        $Score -= 10; $Issues += "Missing index.tsx" 
    }
    if (-not (Test-Path "$($component.FullName)\$Name.stories.tsx")) { 
        $Score -= 5; $Issues += "Missing stories file" 
    }
    if (-not (Test-Path "$($component.FullName)\$Name.test.tsx")) { 
        $Score -= 15; $Issues += "Missing test file" 
    }
    
    $MainFiles = Get-ChildItem "$($component.FullName)\*.tsx" | Where-Object { 
        $_.Name -match "^[a-z-]+\.tsx$" -and $_.Name -ne "index.tsx" 
    }
    if (-not $MainFiles) { 
        # Fallback to any .tsx file that's not index.tsx
        $MainFiles = Get-ChildItem "$($component.FullName)\*.tsx" | Where-Object { $_.Name -ne "index.tsx" }
    }
    if (-not $MainFiles) { 
        $Score -= 20; $Issues += "Missing main component file" 
    }
    
    # Component implementation validation - smart checking
    if ($MainFiles) {
        $MainFile = $MainFiles | Select-Object -First 1
        $Content = Get-Content $MainFile.FullName -Raw
        
        if ($Content) {
            # CVA usage for components that should have variants/sizes
            if (($Spec.Variants.Count -gt 0 -or $Spec.Sizes.Count -gt 0) -and $Content -notmatch "cva\s*\(") {
                $Score -= 10; $Issues += "Should use CVA for variants/sizes"
            }
            
            # Variant validation - only check if component should have variants
            if ($Spec.Variants.Count -gt 0) {
                $MissingVariants = @()
                foreach ($variant in $Spec.Variants) {
                    if ($Content -notmatch "$variant\s*:\s*['""]") {
                        $MissingVariants += $variant
                    }
                }
                if ($MissingVariants.Count -gt 0) {
                    $Score -= ($MissingVariants.Count * 3)
                    $Issues += "Missing variants: $($MissingVariants -join ', ')"
                }
            }
            
            # Size validation - only check if component should have sizes  
            if ($Spec.Sizes.Count -gt 0) {
                $MissingSizes = @()
                foreach ($size in $Spec.Sizes) {
                    if ($Content -notmatch "$size\s*:\s*['""]") {
                        $MissingSizes += $size
                    }
                }
                if ($MissingSizes.Count -gt 0) {
                    $Score -= ($MissingSizes.Count * 2)
                    $Issues += "Missing sizes: $($MissingSizes -join ', ')"
                }
            }
        } else {
            $Score -= 30; $Issues += "Cannot read main component file"
        }
    }
    
    # Test validation - only check for tests that should exist
    $TestFile = "$($component.FullName)\$Name.test.tsx"
    if (Test-Path $TestFile) {
        $TestContent = Get-Content $TestFile -Raw
        if ($TestContent) {
            # Check for proper test structure
            if ($TestContent -notmatch "describe\(") { 
                $Score -= 5; $Issues += "Missing test structure" 
            }
            if ($TestContent -notmatch "expect\(") { 
                $Score -= 5; $Issues += "Missing assertions" 
            }
            
            # Only check for tests that make sense for this component
            if ($Spec.TestsFor -contains "variant" -and $TestContent -notmatch "variant") {
                $Score -= 3; $Issues += "Missing variant tests"
            }
            if ($Spec.TestsFor -contains "size" -and $TestContent -notmatch "size") {
                $Score -= 3; $Issues += "Missing size tests"
            }
            if ($Spec.TestsFor -contains "disabled" -and $TestContent -notmatch "disabled") {
                $Score -= 2; $Issues += "Missing disabled tests"
            }
        } else {
            $Score -= 10; $Issues += "Cannot read test file"
        }
    }
    
    # Build validation - Skip per-component builds, rely on system-level check
    # Individual component build checks removed for performance and to avoid CSS warning spam
    
    # Ensure score doesn't go below 0
    $Score = [Math]::Max(0, $Score)
    
    $Status = if ($Score -ge 80) { "PASS"; $PassingComponents++ } else { "IMPROVING" }
    $ComponentDetails += [PSCustomObject]@{
        Name = $Name
        Score = $Score
        Status = $Status
        Context = if ($Spec) { $Spec.Context } else { "Standard component" }
        Issues = $Issues -join "; "
    }
    
    # Enhanced console output with issue details
    $StatusColor = if ($Status -eq "PASS") { "Green" } else { "Yellow" }
    Write-Host "    [$Status] $Score/100" -ForegroundColor $StatusColor
    
    if ($Issues.Count -gt 0) {
        foreach ($issue in $Issues) {
            Write-Host "      [X] $issue" -ForegroundColor Red
        }
    } else {
        Write-Host "      [OK] All checks passed" -ForegroundColor Green
    }
}

# System health checks - deductive
$SystemScore = 100
$SystemIssues = @()

# Build check
try {
    $BuildOutput = & "yarn" "build" 2>&1 | Out-String
    # Filter out harmless CSS nesting warnings and PowerShell errors - build still succeeds
    $BuildErrors = $BuildOutput -split "`n" | Where-Object { 
        $_ -match "Error|Failed|failed" -and 
        $_ -notmatch "CSS nesting" -and 
        $_ -notmatch "Nested CSS was detected" -and
        $_ -notmatch "FullyQualifiedErrorId" -and
        $_ -notmatch "NativeCommandError"
    }
    $BuildStatus = if ($LASTEXITCODE -eq 0) { "PASS" } else { "FAIL"; $SystemScore -= 30; $SystemIssues += "Build failed" }
    
    # Only show build warnings if there are actual errors (not CSS warnings or PS noise)
    if ($BuildErrors.Count -gt 0) {
        Write-Host "Build Issues Found:" -ForegroundColor Yellow
        foreach ($buildError in $BuildErrors | Select-Object -First 3) {
            Write-Host "  - $buildError" -ForegroundColor Red
        }
    }
} catch {
    $BuildStatus = "FAIL"; $SystemScore -= 30; $SystemIssues += "Build check failed"
}

# TypeScript check  
try {
    & "yarn" "type-check" 2>&1 | Out-Null
    $TypeStatus = if ($LASTEXITCODE -eq 0) { "PASS" } else { "FAIL"; $SystemScore -= 40; $SystemIssues += "TypeScript errors" }
} catch {
    $TypeStatus = "FAIL"; $SystemScore -= 40; $SystemIssues += "TypeScript check failed"
}

# Lint check
try {
    & "yarn" "lint" 2>&1 | Out-Null
    $LintStatus = if ($LASTEXITCODE -eq 0) { "PASS" } else { "FAIL"; $SystemScore -= 20; $SystemIssues += "Lint errors" }
} catch {
    $LintStatus = "FAIL"; $SystemScore -= 20; $SystemIssues += "Lint check failed"
}

# Test check
try {
    $TestOutput = & "yarn" "test:run" 2>&1 | Out-String
    Write-Host "\n---\nTEST OUTPUT (verbose):\n---" -ForegroundColor Yellow
    Write-Output $TestOutput
    $TestsPassed = if ($TestOutput -match "(\d+) passed") { [int]$Matches[1] } else { 0 }
    $TestsFailed = if ($TestOutput -match "(\d+) failed") { [int]$Matches[1] } else { 0 }
    if ($TestsFailed -gt 0) {
        $SystemScore -= ($TestsFailed * 2)
        $SystemIssues += "$TestsFailed failing tests"
    }
} catch {
    $SystemScore -= 10; $SystemIssues += "Test execution failed"
}

# Calculate overall quality
$ComponentAverage = ($ComponentDetails | Measure-Object -Property Score -Average).Average
$OverallScore = [Math]::Round(($ComponentAverage + $SystemScore) / 2, 1)

Write-Host "System checks..." -ForegroundColor Yellow
Write-Host "  Build: $BuildStatus | Type: $TypeStatus | Lint: $LintStatus" -ForegroundColor Gray
Write-Host "  Tests: $TestsPassed passed, $TestsFailed failed" -ForegroundColor Gray

# Show common issues summary
$AllIssues = $ComponentDetails | Where-Object { $_.Issues } | ForEach-Object { $_.Issues -split "; " }
if ($AllIssues.Count -gt 0) {
    Write-Host ""
    Write-Host "Common Issues Summary:" -ForegroundColor Yellow
    $IssueGroups = $AllIssues | Group-Object | Sort-Object Count -Descending
    foreach ($group in $IssueGroups | Select-Object -First 5) {
        $IssueType = if ($group.Name -match "Missing.*test") { "[TEST]" } 
                     elseif ($group.Name -match "Missing.*variant") { "[VARIANT]" }
                     elseif ($group.Name -match "Missing.*size") { "[SIZE]" }
                     elseif ($group.Name -match "CVA") { "[CVA]" }
                     else { "[OTHER]" }
        Write-Host "  $IssueType $($group.Count)x: $($group.Name)" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "Quality Score: $OverallScore/100" -ForegroundColor $(if ($OverallScore -ge 80) { "Green" } else { "Yellow" })

# Generate JSON Reports
$IsFullAudit = $ComponentFilter.Count -eq 0
$Timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
$Version = Get-Date -Format "yyyyMMdd-HHmm"

if ($IsFullAudit) {
    # Full system audit - comprehensive JSON report
    Write-Host "Generating comprehensive JSON report..." -ForegroundColor Yellow
    
    # Load existing full report
    $ExistingReport = @{ 
        metadata = @{}
        components = @{}
        history = @()
    }
    
    if (Test-Path $JsonReport) {
        try {
            $ExistingReport = Get-Content $JsonReport -Raw | ConvertFrom-Json
        } catch {
            Write-Host "Warning: Could not parse existing JSON report, creating new one" -ForegroundColor Yellow
        }
    }
    
    # Build comprehensive report
    $FullReport = @{
        metadata = @{
            reportType = "full-audit"
            version = $Version
            timestamp = $Timestamp
            duration = $Duration
            totalComponents = $TotalComponents
            passingComponents = $PassingComponents
            overallScore = $OverallScore
            grade = if ($OverallScore -ge 90) { "A+" } elseif ($OverallScore -ge 80) { "A" } elseif ($OverallScore -ge 70) { "B+" } elseif ($OverallScore -ge 60) { "B" } else { "NEEDS_WORK" }
        }
        systemHealth = @{
            build = @{
                status = $BuildStatus
                passed = ($BuildStatus -eq "PASS")
            }
            typescript = @{
                status = $TypeStatus
                passed = ($TypeStatus -eq "PASS")
            }
            linting = @{
                status = $LintStatus
                passed = ($LintStatus -eq "PASS")
            }
            tests = @{
                passed = $TestsPassed
                failed = $TestsFailed
                total = $TestsPassed + $TestsFailed
                passRate = if (($TestsPassed + $TestsFailed) -gt 0) { [Math]::Round($TestsPassed / ($TestsPassed + $TestsFailed) * 100, 1) } else { 0 }
            }
        }
        components = @{}
        commonIssues = @()
        history = @()
    }
    
    # Add component details
    foreach ($comp in $ComponentDetails) {
        $FullReport.components[$comp.Name] = @{
            score = $comp.Score
            status = $comp.Status
            context = $comp.Context
            issues = if ($comp.Issues) { $comp.Issues -split "; " } else { @() }
            passing = ($comp.Status -eq "PASS")
            lastUpdated = $Timestamp
        }
    }
    
    # Add common issues analysis
    if ($AllIssues.Count -gt 0) {
        $IssueGroups = $AllIssues | Group-Object | Sort-Object Count -Descending
        foreach ($group in $IssueGroups | Select-Object -First 10) {
            $IssueType = if ($group.Name -match "Missing.*test") { "MISSING_TESTS" } 
                         elseif ($group.Name -match "Missing.*variant") { "MISSING_VARIANTS" }
                         elseif ($group.Name -match "Missing.*size") { "MISSING_SIZES" }
                         elseif ($group.Name -match "CVA") { "NEEDS_CVA" }
                         else { "OTHER" }
            
            $FullReport.commonIssues += @{
                type = $IssueType
                description = $group.Name
                count = $group.Count
                affectedComponents = @($ComponentDetails | Where-Object { $_.Issues -and $_.Issues.Contains($group.Name) } | ForEach-Object { $_.Name })
            }
        }
    }
    
    # Preserve and add to history (keep last 50 runs)
    if ($ExistingReport.history) {
        $FullReport.history = @($ExistingReport.history | Select-Object -Last 49)
    }
    
    $FullReport.history += @{
        version = $Version
        timestamp = $Timestamp
        duration = $Duration
        overallScore = $OverallScore
        passingComponents = $PassingComponents
        totalComponents = $TotalComponents
        systemHealth = @{
            build = ($BuildStatus -eq "PASS")
            typescript = ($TypeStatus -eq "PASS")
            linting = ($LintStatus -eq "PASS")
            testsPass = $TestsFailed -eq 0
        }
    }
    
    # Save full report
    $FullReport | ConvertTo-Json -Depth 10 | Set-Content $JsonReport -Encoding UTF8
    Write-Host "JSON Report: $JsonReport updated" -ForegroundColor Green
    
} else {
    # Component-specific audit - individual report
    $ComponentReportFile = "reports\quality-report-$($ComponentFilter -join '-').json"
    Write-Host "Generating component-specific JSON report..." -ForegroundColor Yellow
    
    $ComponentReport = @{
        metadata = @{
            reportType = "component-audit"
            version = $Version
            timestamp = $Timestamp
            duration = $Duration
            targetComponents = $ComponentFilter
            totalComponents = $TotalComponents
            overallScore = $OverallScore
        }
        systemHealth = @{
            build = @{
                status = $BuildStatus
                passed = ($BuildStatus -eq "PASS")
            }
            typescript = @{
                status = $TypeStatus
                passed = ($TypeStatus -eq "PASS")
            }
            linting = @{
                status = $LintStatus
                passed = ($LintStatus -eq "PASS")
            }
            tests = @{
                passed = $TestsPassed
                failed = $TestsFailed
                total = $TestsPassed + $TestsFailed
            }
        }
        components = @{}
        issues = @{}
    }
    
    # Add detailed component analysis
    foreach ($comp in $ComponentDetails) {
        $ComponentReport.components[$comp.Name] = @{
            score = $comp.Score
            status = $comp.Status
            context = $comp.Context
            issues = if ($comp.Issues) { $comp.Issues -split "; " } else { @() }
            passing = ($comp.Status -eq "PASS")
            timestamp = $Timestamp
        }
        
        # Detailed issue breakdown
        if ($comp.Issues) {
            $ComponentReport.issues[$comp.Name] = @{
                total = ($comp.Issues -split "; ").Count
                breakdown = @()
            }
            
            foreach ($issue in ($comp.Issues -split "; ")) {
                $IssueType = if ($issue -match "Missing.*test") { "MISSING_TESTS" }
                             elseif ($issue -match "Missing.*variant") { "MISSING_VARIANTS" }
                             elseif ($issue -match "Missing.*size") { "MISSING_SIZES" }
                             elseif ($issue -match "CVA") { "NEEDS_CVA" }
                             elseif ($issue -match "Missing.*file") { "MISSING_FILES" }
                             else { "OTHER" }
                
                $ComponentReport.issues[$comp.Name].breakdown += @{
                    type = $IssueType
                    description = $issue
                    severity = if ($issue -match "Missing.*file|Cannot read") { "HIGH" }
                               elseif ($issue -match "CVA|Missing.*variant") { "MEDIUM" }
                               else { "LOW" }
                }
            }
        }
    }
    
    # Save component report
    $ComponentReport | ConvertTo-Json -Depth 10 | Set-Content $ComponentReportFile -Encoding UTF8
    Write-Host "Component Report: $ComponentReportFile created" -ForegroundColor Green
}

# Generate markdown report - DASHBOARD STYLE
$Duration = [Math]::Round(((Get-Date) - $StartTime).TotalSeconds, 0)
$NewVersion = if (Test-Path $OutputFile) { 
    $ExistingContent = Get-Content $OutputFile -Raw
    $VersionMatch = $ExistingContent | Select-String "Version.*?: (\d+)"
    if ($VersionMatch) { [int]$VersionMatch.Matches[0].Groups[1].Value + 1 } else { 1 }
} else { 1 }

# Read existing report to preserve component scores and test history
$ExistingComponents = @{}
$ExistingTestHistory = @()

if (Test-Path $OutputFile) {
    $ExistingContent = Get-Content $OutputFile -Raw
    
    # Extract existing component scores (to update with latest)
    $ComponentMatches = [regex]::Matches($ExistingContent, '\| ([A-Za-z]+) \| (\d+)/100 \| ([A-Z]+) \|')
    foreach ($match in $ComponentMatches) {
        $ExistingComponents[$match.Groups[1].Value] = @{
            Score = $match.Groups[2].Value
            Status = $match.Groups[3].Value
        }
    }
    
    # Extract existing test history
    $HistoryStart = $ExistingContent.IndexOf("## Test History")
    if ($HistoryStart -ge 0) {
        $HistorySection = $ExistingContent.Substring($HistoryStart)
        $HistoryMatches = [regex]::Matches($HistorySection, '\| (\d+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|')
        foreach ($match in $HistoryMatches) {
            $ExistingTestHistory += [PSCustomObject]@{
                Version = $match.Groups[1].Value
                Date = $match.Groups[2].Value.Trim()
                Duration = $match.Groups[3].Value.Trim()
                Quality = $match.Groups[4].Value.Trim()
                Components = $match.Groups[5].Value.Trim()
                Build = $match.Groups[6].Value.Trim()
                Tests = $match.Groups[7].Value.Trim()
            }
        }
    }
}

# Update component scores with latest results
foreach ($comp in $ComponentDetails) {
    $ExistingComponents[$comp.Name] = @{
        Score = $comp.Score
        Status = $comp.Status
        Context = $comp.Context
        Issues = $comp.Issues
    }
}

# Create the dashboard report
$DashboardReport = @"
# TriggerKings Quality Dashboard

**Latest Version**: $NewVersion | **Generated**: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') | **Quality Score**: **$OverallScore/100**

---

## Component Scorecard

| Component | Score | Status | Purpose | Latest Issues |
|-----------|-------|--------|---------|---------------|
"@

# Add all components to scorecard (sorted by score desc)
$SortedComponents = $ExistingComponents.GetEnumerator() | Sort-Object { [int]($_.Value.Score) } -Descending
foreach ($comp in $SortedComponents) {
    $Name = $comp.Key
    $Data = $comp.Value
    $Issues = if ($Data.Issues) { $Data.Issues } else { "[OK] All checks passed" }
    $Context = if ($Data.Context) { $Data.Context } else { "Standard component" }
    
    $DashboardReport += @"
| $Name | $($Data.Score)/100 | $($Data.Status) | $Context | $Issues |
"@
}

$DashboardReport += @"

---

## System Status

**Build**: $BuildStatus | **TypeScript**: $TypeStatus | **Linting**: $LintStatus | **Tests**: $TestsPassed passed, $TestsFailed failed

---

## Test History

| Ver | Date | Duration | Quality | Components | Build/Type/Lint | Tests |
|-----|------|----------|---------|------------|-----------------|-------|
"@

# Add current test result to history
$CurrentTestResult = "| $NewVersion | $(Get-Date -Format 'MM-dd HH:mm') | ${Duration}s | $OverallScore/100 | $PassingComponents/$TotalComponents | $BuildStatus/$TypeStatus/$LintStatus | $TestsPassed/$($TestsPassed + $TestsFailed) |"
$DashboardReport += "`n$CurrentTestResult"

# Add existing test history (keep last 10 runs)
$HistoryToKeep = $ExistingTestHistory | Select-Object -Last 9
foreach ($historyItem in $HistoryToKeep) {
    $DashboardReport += @"
| $($historyItem.Version) | $($historyItem.Date) | $($historyItem.Duration) | $($historyItem.Quality) | $($historyItem.Components) | $($historyItem.Build) | $($historyItem.Tests) |
"@
}

$DashboardReport += @"

---

*TriggerKings Deductive Smart Quality Audit - Dashboard View*
"@

Set-Content $OutputFile -Value $DashboardReport -Encoding UTF8

Write-Host "AUDIT COMPLETE" -ForegroundColor Green
Write-Host "Version: $Version" -ForegroundColor Gray
Write-Host "Quality: $OverallScore/100" -ForegroundColor $(if ($OverallScore -ge 80) { "Green" } else { "Yellow" })
Write-Host "Components: $PassingComponents/$TotalComponents passing smart validation" -ForegroundColor Gray
Write-Host "Reports Generated:" -ForegroundColor Gray
if ($IsFullAudit) {
    Write-Host "  - Markdown: $OutputFile" -ForegroundColor Cyan
    Write-Host "  - JSON: $JsonReport" -ForegroundColor Cyan
} else {
    Write-Host "  - Component JSON: $ComponentReportFile" -ForegroundColor Cyan
}
