#!/usr/bin/env pwsh
param(
    [switch]$ShowAll = $false,
    [switch]$Validate = $false
)

$ErrorActionPreference = "Stop"

function Write-ConfigLog {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $color = switch ($Level) {
        "SUCCESS" { "Green" }
        "WARNING" { "Yellow" }
        "ERROR" { "Red" }
        "HEADER" { "Cyan" }
        default { "White" }
    }
    Write-Host "[$timestamp] [$Level] $Message" -ForegroundColor $color
}

function Test-ConfigurationFile {
    $configPath = "data/siteConfig.json"
    
    if (-not (Test-Path $configPath)) {
        Write-ConfigLog "Configuration file not found: $configPath" "ERROR"
        return $false
    }
    
    try {
        $config = Get-Content $configPath -Raw | ConvertFrom-Json
        Write-ConfigLog "Configuration file is valid JSON" "SUCCESS"
        
        # Validate required sections
        $requiredSections = @("site", "project", "metrics", "content", "contact", "branding", "technical", "features")
        $missingSection = $false
        
        foreach ($section in $requiredSections) {
            if (-not $config.PSObject.Properties.Name -contains $section) {
                Write-ConfigLog "Missing required section: $section" "ERROR"
                $missingSection = $true
            }
        }
        
        if ($missingSection) {
            return $false
        }
        
        Write-ConfigLog "All required configuration sections present" "SUCCESS"
        return $config
    }
    catch {
        Write-ConfigLog "Invalid JSON in configuration file" "ERROR"
        return $false
    }
}

function Show-ConfigurationSummary {
    param($config)
    
    Write-ConfigLog "=== SITE CONFIGURATION SUMMARY ===" "HEADER"
    Write-Host ""
    
    Write-Host "SITE INFO:" -ForegroundColor Yellow
    Write-Host "   Name: $($config.site.name)"
    Write-Host "   Title: $($config.site.title)"
    Write-Host "   URL: $($config.site.url)"
    Write-Host "   Brand: $($config.site.brand.displayName)"
    Write-Host ""
    
    Write-Host "PROJECT STATUS:" -ForegroundColor Yellow
    Write-Host "   Version: $($config.project.version)"
    Write-Host "   Grade: $($config.project.grade)"
    Write-Host "   Last Updated: $($config.project.lastUpdated)"
    Write-Host "   Status: $($config.project.status)"
    Write-Host ""
    
    Write-Host "METRICS:" -ForegroundColor Yellow
    Write-Host "   Total Components: $($config.metrics.totalComponents)"
    Write-Host "   Stories Coverage: $($config.metrics.storiesCoverage)%"
    Write-Host "   Tests Coverage: $($config.metrics.testsCoverage)%"
    Write-Host "   Quality Score: $($config.metrics.qualityScore)"
    Write-Host ""
    
    Write-Host "TECHNICAL STACK:" -ForegroundColor Yellow
    Write-Host "   Framework: $($config.technical.framework)"
    Write-Host "   Language: $($config.technical.language)"
    Write-Host "   Testing: $($config.technical.testingFramework)"
    Write-Host "   Documentation: $($config.technical.documentation)"
    Write-Host ""
}

# Main execution
try {
    Write-ConfigLog "Starting site configuration validation..." "INFO"
    
    $config = Test-ConfigurationFile
    if (-not $config) {
        Write-ConfigLog "Configuration validation failed" "ERROR"
        exit 1
    }
    
    if ($Validate) {
        Write-ConfigLog "Configuration validation completed successfully" "SUCCESS"
        exit 0
    }
    
    if ($ShowAll) {
        Write-ConfigLog "=== COMPLETE SITE CONFIGURATION ===" "HEADER"
        Write-Host ""
        $config | ConvertTo-Json -Depth 10 | Write-Host
    } else {
        Show-ConfigurationSummary -config $config
    }
    
    Write-ConfigLog "Configuration display completed" "SUCCESS"
}
catch {
    Write-ConfigLog "Script execution failed" "ERROR"
    exit 1
}
