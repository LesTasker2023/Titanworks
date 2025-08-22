# Quality Audit System
# Essential PowerShell automation for codebase auditing

param(
    [switch]$ListComponents,
    [string]$ComponentFilter,
    [switch]$Help
)

if ($Help) {
    Write-Host "📊 Quality Audit System" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Green  
    Write-Host "  yarn quality-audit              # Full audit"
    Write-Host "  yarn audit-list                 # List all components"
    Write-Host "  yarn audit-quick <pattern>      # Quick component check"
    Write-Host ""
    exit 0
}

$ComponentsPath = "src/components/ui"

if ($ListComponents) {
    Write-Host "📋 UI Components:" -ForegroundColor Cyan
    Get-ChildItem $ComponentsPath -Directory | ForEach-Object {
        $name = $_.Name
        $hasTest = Test-Path "$ComponentsPath/$name/$name.test.tsx"
        $hasStory = Test-Path "$ComponentsPath/$name/$name.stories.tsx"
        $hasIndex = Test-Path "$ComponentsPath/$name/index.ts"
        
        $status = @()
        if ($hasTest) { $status += "✅ Test" } else { $status += "❌ Test" }
        if ($hasStory) { $status += "✅ Story" } else { $status += "❌ Story" }
        if ($hasIndex) { $status += "✅ Index" } else { $status += "❌ Index" }
        
        Write-Host "  $name`: $($status -join ', ')" -ForegroundColor Yellow
    }
    exit 0
}

Write-Host "🔍 Running Quality Audit..." -ForegroundColor Cyan

# Count components
$componentCount = (Get-ChildItem $ComponentsPath -Directory).Count
Write-Host "📦 Found $componentCount UI components" -ForegroundColor Green

# Check test coverage
$testFiles = Get-ChildItem "$ComponentsPath/**/*.test.tsx" -Recurse
$testCoverage = [math]::Round(($testFiles.Count / $componentCount) * 100, 1)
Write-Host "🧪 Test coverage: $testCoverage%" -ForegroundColor $(if ($testCoverage -ge 90) { "Green" } else { "Yellow" })

# Check for missing files
$missingTests = 0
$missingStories = 0
$missingIndex = 0

Get-ChildItem $ComponentsPath -Directory | ForEach-Object {
    $name = $_.Name
    if (!(Test-Path "$ComponentsPath/$name/$name.test.tsx")) { $missingTests++ }
    if (!(Test-Path "$ComponentsPath/$name/$name.stories.tsx")) { $missingStories++ }
    if (!(Test-Path "$ComponentsPath/$name/index.ts")) { $missingIndex++ }
}

Write-Host "📊 Quality Summary:" -ForegroundColor Cyan
Write-Host "  Missing tests: $missingTests" -ForegroundColor $(if ($missingTests -eq 0) { "Green" } else { "Red" })
Write-Host "  Missing stories: $missingStories" -ForegroundColor $(if ($missingStories -eq 0) { "Green" } else { "Red" })
Write-Host "  Missing index files: $missingIndex" -ForegroundColor $(if ($missingIndex -eq 0) { "Green" } else { "Red" })

$overallScore = [math]::Round((($componentCount - $missingTests - $missingStories - $missingIndex) / ($componentCount * 3)) * 100, 1)
Write-Host "🎯 Overall Quality Score: $overallScore%" -ForegroundColor $(if ($overallScore -ge 90) { "Green" } elseif ($overallScore -ge 70) { "Yellow" } else { "Red" })

if ($overallScore -lt 90) {
    Write-Host ""
    Write-Host "💡 Recommendations:" -ForegroundColor Yellow
    if ($missingTests -gt 0) { Write-Host "  • Run 'yarn fix:missing-files' to create missing test files" }
    if ($missingStories -gt 0) { Write-Host "  • Consider adding Storybook stories for better documentation" }
    if ($missingIndex -gt 0) { Write-Host "  • Run 'yarn fix:missing-files' to create missing index files" }
}
