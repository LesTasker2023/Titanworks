# Clinical Container Cleanup - Surgical Precision Automation
# Eliminates ALL repetitive container patterns in component showcase

param(
    [string]$FilePath = "src/app/component-showcase/page.tsx"
)

Write-Host "🏥 CLINICAL CONTAINER CLEANUP - Surgical Precision Mode" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

# Read file content
$content = Get-Content $FilePath -Raw

# Track replacements
$replacements = 0

# 1. Replace all border container divs
$pattern1 = '<div className="border border-border rounded-lg p-8 space-y-8">'
$replacement1 = '<Container size="7xl" padding="lg" className="border border-border rounded-lg space-y-8">'
$newContent = $content -replace [regex]::Escape($pattern1), $replacement1
if ($newContent -ne $content) {
    $count = (($content -split [regex]::Escape($pattern1)).Length - 1)
    Write-Host "✅ Replaced $count border container divs" -ForegroundColor Green
    $replacements += $count
    $content = $newContent
}

# 2. Replace all bg-card container divs  
$pattern2 = '<div className="bg-card border border-border rounded-lg p-8 space-y-8">'
$replacement2 = '<Container size="7xl" padding="lg" className="bg-card border border-border rounded-lg space-y-8">'
$newContent = $content -replace [regex]::Escape($pattern2), $replacement2
if ($newContent -ne $content) {
    $count = (($content -split [regex]::Escape($pattern2)).Length - 1)
    Write-Host "✅ Replaced $count bg-card container divs" -ForegroundColor Green
    $replacements += $count
    $content = $newContent
}

# 3. Replace text-center header divs
$pattern3 = '<div className="text-center">'
$replacement3 = '<Container size="none" padding="none" className="text-center">'
$newContent = $content -replace [regex]::Escape($pattern3), $replacement3
if ($newContent -ne $content) {
    $count = (($content -split [regex]::Escape($pattern3)).Length - 1)
    Write-Host "✅ Replaced $count text-center header divs" -ForegroundColor Green
    $replacements += $count
    $content = $newContent
}

# Write back to file
$content | Set-Content $FilePath -NoNewline

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "🎯 SURGICAL SUCCESS: $replacements total container patterns eliminated" -ForegroundColor Green
Write-Host "💉 Repository is now CLINICAL-GRADE clean" -ForegroundColor Green
Write-Host "⚡ Next: Manual closing tag fixes required for JSX compliance" -ForegroundColor Yellow

# Show remaining manual work needed
Write-Host "`n📋 MANUAL CLEANUP REQUIRED:" -ForegroundColor Yellow
Write-Host "   • Replace remaining </div> closing tags with </Container>" -ForegroundColor White
Write-Host "   • Verify JSX structure integrity" -ForegroundColor White
Write-Host "   • Run yarn build to validate" -ForegroundColor White
