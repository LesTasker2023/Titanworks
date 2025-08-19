#!/usr/bin/env pwsh
<#
.SYNOPSIS
Enterprise Pre-Commit Automation Script - Triggered ONLY after successful lint-staged checks
.DESCRIPTION
Automatically handles version bumping, dashboard updates, and component showcase synchronization
when all quality checks pass. This maintains enterprise-grade automation standards.

.NOTES
Version: 1.0.0
Author: Daedalus Enterprise Team  
Last Modified: August 2025
Execution Policy: Bypass required for automated execution
#>

param(
    [switch]$DryRun = $false,
    [switch]$Verbose = $false
)

# Enterprise error handling
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

# Utility functions
function Write-EnterpriseLog {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $color = switch ($Level) {
        "SUCCESS" { "Green" }
        "WARNING" { "Yellow" }
        "ERROR" { "Red" }
        default { "White" }
    }
    Write-Host "[$timestamp] [$Level] $Message" -ForegroundColor $color
}

function Write-FileWithRetry {
    param(
        [string]$Path,
        [string]$Content,
        [int]$MaxRetries = 3,
        [int]$DelaySeconds = 1
    )
    
    for ($i = 1; $i -le $MaxRetries; $i++) {
        try {
            Set-Content $Path $Content -NoNewline -ErrorAction Stop
            return $true
        }
        catch {
            if ($i -eq $MaxRetries) {
                Write-EnterpriseLog "Failed to write $Path after $MaxRetries attempts: $($_.Exception.Message)" "ERROR"
                return $false
            }
            Write-EnterpriseLog "Write attempt $i failed for $Path, retrying in $DelaySeconds seconds..." "WARNING"
            Start-Sleep -Seconds $DelaySeconds
        }
    }
}

function Get-CurrentVersion {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    return $packageJson.version
}

function Update-MinorVersion {
    param([string]$currentVersion)
    
    $versionParts = $currentVersion.Split('.')
    $major = [int]$versionParts[0]
    $minor = [int]$versionParts[1]
    # Patch will be reset to 0 for minor version bump
    
    $newMinor = $minor + 1
    $newVersion = "$major.$newMinor.0"
    
    if (-not $DryRun) {
        # Update package.json
        $packageContent = Get-Content "package.json" -Raw
        $packageContent = $packageContent -replace "`"version`": `"$currentVersion`"", "`"version`": `"$newVersion`""
        
        if (-not (Write-FileWithRetry "package.json" $packageContent)) {
            throw "Failed to update package.json"
        }
        
        Write-EnterpriseLog "Version updated: $currentVersion -> $newVersion" "SUCCESS"
    } else {
        Write-EnterpriseLog "[DRY RUN] Would update version: $currentVersion -> $newVersion" "WARNING"
    }
    
    return $newVersion
}

function Get-ComponentStats {
    # Analyze component directory structure
    $componentDir = "src/components"
    $uiDir = "$componentDir/ui"
    
    $totalComponents = 0
    $componentsWithStories = 0
    $componentsWithTests = 0
    
    if (Test-Path $uiDir) {
        $componentFolders = Get-ChildItem $uiDir -Directory
        $totalComponents = $componentFolders.Count
        
        foreach ($folder in $componentFolders) {
            $componentName = $folder.Name
            
            # Check for stories
            $storiesPattern = "$uiDir/$componentName/*.stories.*"
            if (Get-ChildItem $storiesPattern -ErrorAction SilentlyContinue) {
                $componentsWithStories++
            }
            
            # Check for tests
            $testsPattern = "$uiDir/$componentName/*.test.*"
            if (Get-ChildItem $testsPattern -ErrorAction SilentlyContinue) {
                $componentsWithTests++
            }
        }
    }
    
    return @{
        TotalComponents = $totalComponents
        ComponentsWithStories = $componentsWithStories
        ComponentsWithTests = $componentsWithTests
        StoriesCoverage = if ($totalComponents -gt 0) { [math]::Round(($componentsWithStories / $totalComponents) * 100, 1) } else { 0 }
        TestsCoverage = if ($totalComponents -gt 0) { [math]::Round(($componentsWithTests / $totalComponents) * 100, 1) } else { 0 }
    }
}

function Update-Dashboard {
    param([string]$newVersion, [hashtable]$componentStats)
    
    $dashboardPath = "src/app/dashboard/page.tsx"
    
    if (-not (Test-Path $dashboardPath)) {
        Write-EnterpriseLog "Dashboard file not found: $dashboardPath" "ERROR"
        return
    }
    
    $currentDate = Get-Date -Format "MMMM yyyy"
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    if (-not $DryRun) {
        $dashboardContent = Get-Content $dashboardPath -Raw
        
        # Update version in dashboard title comment
        $dashboardContent = $dashboardContent -replace "v\d+\.\d+\.\d+", "v$newVersion"
        
        # Update enterprise dashboard title
        $dashboardContent = $dashboardContent -replace "Enterprise Dashboard - .* - v\d+\.\d+\.\d+", "Enterprise Dashboard - $currentDate - v$newVersion"
        
        # Update component statistics in the dashboard data
        # This regex finds the totalComponents value and updates it
        $dashboardContent = $dashboardContent -replace "totalComponents: \d+", "totalComponents: $($componentStats.TotalComponents)"
        
        # Update stories coverage
        $dashboardContent = $dashboardContent -replace "storiesCoverage: \d+\.?\d*", "storiesCoverage: $($componentStats.StoriesCoverage)"
        
        # Update tests coverage  
        $dashboardContent = $dashboardContent -replace "testsCoverage: \d+\.?\d*", "testsCoverage: $($componentStats.TestsCoverage)"
        
        # Add new activity log entry (find the activities array and prepend new entry)
        $newActivity = @"
      {
        id: '$([System.Guid]::NewGuid().ToString().Substring(0,8))',
        type: 'release' as const,
        title: 'v$newVersion Released',
        description: 'Automated release: $($componentStats.TotalComponents) components, $($componentStats.StoriesCoverage)% stories coverage',
        timestamp: '$timestamp',
        severity: 'info' as const,
      },
"@
        
        # Insert new activity at the beginning of activities array
        $dashboardContent = $dashboardContent -replace "(const activities = \[\s*)", "`$1$newActivity`n      "
        
        if (-not (Write-FileWithRetry $dashboardPath $dashboardContent)) {
            throw "Failed to update dashboard file"
        }
        Write-EnterpriseLog "Dashboard updated with v$newVersion metrics" "SUCCESS"
    } else {
        Write-EnterpriseLog "[DRY RUN] Would update dashboard with v$newVersion and component stats" "WARNING"
    }
}

function Update-SiteConfig {
    param([string]$newVersion, [hashtable]$componentStats)
    
    $configPath = "data/siteConfig.json"
    
    if (-not (Test-Path $configPath)) {
        Write-EnterpriseLog "Site config not found: $configPath" "WARNING"
        return
    }
    
    $currentDate = Get-Date -Format "yyyy-MM-dd"
    $timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ"
    
    if (-not $DryRun) {
        # Read current config
        $configContent = Get-Content $configPath -Raw | ConvertFrom-Json
        
        # Update project info
        $configContent.project.version = $newVersion
        $configContent.project.lastUpdated = $currentDate
        
        # Update metrics
        $configContent.metrics.totalComponents = $componentStats.TotalComponents
        $configContent.metrics.storiesCoverage = $componentStats.StoriesCoverage
        $configContent.metrics.testsCoverage = $componentStats.TestsCoverage
        
        # Update build info
        $configContent.build.timestamp = $timestamp
        $configContent.build.deploymentId = "auto-$newVersion-$(Get-Date -Format 'yyyyMMddHHmmss')"
        
        # Convert back to JSON and save
        $updatedConfig = ConvertTo-Json $configContent -Depth 10
        if (-not (Write-FileWithRetry $configPath $updatedConfig)) {
            throw "Failed to update site configuration"
        }
        Write-EnterpriseLog "Site configuration updated with v$newVersion metrics" "SUCCESS"
    } else {
        Write-EnterpriseLog "[DRY RUN] Would update site config with v$newVersion and component stats" "WARNING"
    }
}

function Update-ComponentShowcase {
    param([hashtable]$componentStats)
    
    $showcasePath = "src/app/component-showcase/page.tsx"
    
    if (-not (Test-Path $showcasePath)) {
        Write-EnterpriseLog "Component showcase not found: $showcasePath" "WARNING"
        return
    }
    
    if (-not $DryRun) {
        # Read current showcase content
        $showcaseContent = Get-Content $showcasePath -Raw
        
        # Update component count in showcase if it exists
        $showcaseContent = $showcaseContent -replace "Total Components: \d+", "Total Components: $($componentStats.TotalComponents)"
        $showcaseContent = $showcaseContent -replace "Stories: \d+", "Stories: $($componentStats.ComponentsWithStories)"
        $showcaseContent = $showcaseContent -replace "Tests: \d+", "Tests: $($componentStats.ComponentsWithTests)"
        
        if (-not (Write-FileWithRetry $showcasePath $showcaseContent)) {
            throw "Failed to update component showcase file"
        }
        Write-EnterpriseLog "Component showcase updated with latest statistics" "SUCCESS"
    } else {
        Write-EnterpriseLog "[DRY RUN] Would update component showcase with latest stats" "WARNING"
    }
}

function Test-BuildValidity {
    Write-EnterpriseLog "Validating build after updates..." "INFO"
    
    # Run type check
    try {
        $typeCheckResult = & yarn type-check 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-EnterpriseLog "Type check failed after automation updates" "ERROR"
            return $false
        }
    } catch {
        Write-EnterpriseLog "Type check execution failed" "ERROR"
        return $false
    }
    
    # Run build test (no-lint since we already passed lint-staged)
    try {
        $buildResult = & yarn build --no-lint 2>&1
        $buildExitCode = $LASTEXITCODE
        
        # Check if build was successful (exit code 0)
        if ($buildExitCode -eq 0) {
            Write-EnterpriseLog "Build validation successful" "SUCCESS"
            return $true
        } else {
            Write-EnterpriseLog "Build failed with exit code: $buildExitCode" "ERROR"
            return $false
        }
    } catch {
        Write-EnterpriseLog "Build execution failed" "ERROR"
        return $false
    }
}

function Main {
    Write-EnterpriseLog "Starting Enterprise Pre-Commit Automation" "INFO"
    
    if ($DryRun) {
        Write-EnterpriseLog "Running in DRY RUN mode - no changes will be made" "WARNING"
    }
    
    try {
        # Get current state
        $currentVersion = Get-CurrentVersion
        Write-EnterpriseLog "Current version: $currentVersion" "INFO"
        
        # Analyze component ecosystem
        Write-EnterpriseLog "Analyzing component ecosystem..." "INFO"
        $componentStats = Get-ComponentStats
        
        Write-EnterpriseLog "Component Analysis:" "INFO"
        Write-EnterpriseLog "  Total Components: $($componentStats.TotalComponents)" "INFO"
        Write-EnterpriseLog "  Stories Coverage: $($componentStats.StoriesCoverage)%" "INFO"
        Write-EnterpriseLog "  Tests Coverage: $($componentStats.TestsCoverage)%" "INFO"
        
        # Update minor version
        $newVersion = Update-MinorVersion -currentVersion $currentVersion
        
        # Update dashboard with new metrics
        Update-Dashboard -newVersion $newVersion -componentStats $componentStats
        
        # Update site configuration
        Update-SiteConfig -newVersion $newVersion -componentStats $componentStats
        
        # Update component showcase
        Update-ComponentShowcase -componentStats $componentStats
        
        # Validate changes don't break build
        if (-not $DryRun) {
            # Run type check to ensure no TypeScript errors
            Write-EnterpriseLog "Validating TypeScript after updates..." "INFO"
            $typeCheckResult = & yarn type-check 2>&1
            if ($LASTEXITCODE -ne 0) {
                Write-EnterpriseLog "Type check failed - rolling back changes" "ERROR"
                & git checkout -- package.json data/siteConfig.json src/app/dashboard/page.tsx src/app/component-showcase/page.tsx
                exit 1
            }
            Write-EnterpriseLog "TypeScript validation successful" "SUCCESS"
            
            # Stage the automated changes
            & git add package.json data/siteConfig.json src/app/dashboard/page.tsx src/app/component-showcase/page.tsx
            Write-EnterpriseLog "Automated changes staged for commit" "SUCCESS"
        }
        
        Write-EnterpriseLog "Enterprise automation completed successfully!" "SUCCESS"
        Write-EnterpriseLog "Version: $currentVersion -> $newVersion" "SUCCESS"
        Write-EnterpriseLog "Components: $($componentStats.TotalComponents) | Stories: $($componentStats.StoriesCoverage)% | Tests: $($componentStats.TestsCoverage)%" "SUCCESS"
        
    } catch {
        Write-EnterpriseLog "Enterprise automation failed" "ERROR"
        Write-EnterpriseLog $_.Exception.Message "ERROR"
        exit 1
    }
}

# Execute main function
Main
