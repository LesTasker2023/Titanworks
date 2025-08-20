param(
    [switch]$Force = $false,
    [switch]$DryRun = $false
)

function Get-CurrentVersion {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    return $packageJson.version
}

function Get-ComponentStats {
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
            
            $storiesPattern = "$uiDir/$componentName/*.stories.*"
            if (Get-ChildItem $storiesPattern -ErrorAction SilentlyContinue) {
                $componentsWithStories++
            }
            
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

Write-Host "Daedalus MANUAL RELEASE TOOL" -ForegroundColor Magenta
Write-Host "======================================" -ForegroundColor Magenta
Write-Host ""

if ($DryRun) {
    Write-Host "DRY RUN MODE - No changes will be made" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "CURRENT PROJECT STATUS" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

$currentVersion = Get-CurrentVersion
$componentStats = Get-ComponentStats

Write-Host "Current Version: $currentVersion" -ForegroundColor White
Write-Host "Total Components: $($componentStats.TotalComponents)" -ForegroundColor White
Write-Host "Stories Coverage: $($componentStats.StoriesCoverage)%" -ForegroundColor White
Write-Host "Tests Coverage: $($componentStats.TestsCoverage)%" -ForegroundColor White

$versionParts = $currentVersion.Split('.')
$major = [int]$versionParts[0]
$minor = [int]$versionParts[1]
$newVersion = "$major.$($minor + 1).0"

Write-Host ""
Write-Host "PROPOSED CHANGES" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Yellow
Write-Host "New Version: $currentVersion -> $newVersion" -ForegroundColor Green
Write-Host "Dashboard: Will be updated with latest metrics" -ForegroundColor Green
Write-Host "Component Showcase: Will reflect current stats" -ForegroundColor Green
Write-Host ""

if (-not $DryRun -and -not $Force) {
    do {
        $response = Read-Host "Continue with these changes? (y/n)"
        $response = $response.ToLower()
    } while ($response -ne 'y' -and $response -ne 'n' -and $response -ne 'yes' -and $response -ne 'no')
    
    if ($response -eq 'n' -or $response -eq 'no') {
        Write-Host "Operation cancelled by user" -ForegroundColor Red
        exit 0
    }
}

Write-Host "Executing automation..." -ForegroundColor Blue
Write-Host ""

try {
    if ($DryRun) {
        & "$PSScriptRoot\pre-commit-automation.ps1" -DryRun -Verbose
    } else {
        & "$PSScriptRoot\pre-commit-automation.ps1" -Verbose
    }
    
    if (-not $DryRun) {
        $finalVersion = Get-CurrentVersion
        Write-Host ""
        Write-Host "MANUAL RELEASE COMPLETED!" -ForegroundColor Green
        Write-Host "================================" -ForegroundColor Green
        Write-Host "Changes have been staged automatically" -ForegroundColor White
        Write-Host "Ready to commit with your custom message" -ForegroundColor White
        Write-Host ""
        Write-Host "Suggested next steps:" -ForegroundColor Cyan
        Write-Host "   git commit -m 'feat: Release v$finalVersion - Manual Release'" -ForegroundColor Gray
        Write-Host "   git push origin main" -ForegroundColor Gray
    }
} catch {
    Write-Host "Manual release failed" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}
