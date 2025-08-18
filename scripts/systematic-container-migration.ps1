# Systematic Container Migration - Clinical Precision
# Replaces ALL remaining container patterns with proper Container components

param(
    [string]$FilePath = "src/app/component-showcase/page.tsx"
)

Write-Host "🔬 SYSTEMATIC CONTAINER MIGRATION" -ForegroundColor Cyan
Write-Host "Clinical precision - zero tolerance for loose ends" -ForegroundColor Gray

$content = Get-Content $FilePath -Raw
$replacements = 0

# Define all component showcase patterns to replace
$patterns = @(
    @{
        Name = "Border Container Divs"
        Old = '<div className="border border-border rounded-lg p-8 space-y-8">'
        New = '<Container size="7xl" padding="lg" className="border border-border rounded-lg space-y-8">'
    },
    @{
        Name = "BG-Card Container Divs"
        Old = '<div className="bg-card border border-border rounded-lg p-8 space-y-8">'
        New = '<Container size="7xl" padding="lg" className="bg-card border border-border rounded-lg space-y-8">'
    },
    @{
        Name = "Text-Center Header Divs"
        Old = '<div className="text-center">'
        New = '<Container size="none" padding="none" className="text-center">'
    }
)

foreach ($pattern in $patterns) {
    $oldContent = $content
    $content = $content -replace [regex]::Escape($pattern.Old), $pattern.New
    
    if ($content -ne $oldContent) {
        $count = (($oldContent -split [regex]::Escape($pattern.Old)).Length - 1)
        Write-Host "✅ $($pattern.Name): $count replacements" -ForegroundColor Green
        $replacements += $count
    }
}

# Save the updated content
$content | Set-Content $FilePath -NoNewline

Write-Host "`n🎯 MIGRATION COMPLETE" -ForegroundColor Green
Write-Host "Total replacements: $replacements" -ForegroundColor Green
Write-Host "`n⚠️  NEXT STEP: Manual closing tag fixes needed" -ForegroundColor Yellow
Write-Host "Replace remaining component closing div tags with closing Container tags" -ForegroundColor White

# Show current status
$remainingDivs = ($content | Select-String 'border border-border rounded-lg p-8 space-y-8' -AllMatches).Matches.Count
$remainingBgDivs = ($content | Select-String 'bg-card border border-border rounded-lg p-8 space-y-8' -AllMatches).Matches.Count

Write-Host "`n📊 STATUS:" -ForegroundColor Cyan
Write-Host "Remaining border divs: $remainingDivs" -ForegroundColor $(if($remainingDivs -eq 0){'Green'}else{'Red'})
Write-Host "Remaining bg-card divs: $remainingBgDivs" -ForegroundColor $(if($remainingBgDivs -eq 0){'Green'}else{'Red'})
