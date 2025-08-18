# PowerShell script to replace all repetitive container divs with enterprise-grade Container component
# This eliminates the ~20 repetitive patterns in component-showcase/page.tsx

$filePath = "src/app/component-showcase/page.tsx"
$content = Get-Content $filePath -Raw

# Replace all remaining border container divs with Container component
$content = $content -replace 'div className="border border-border rounded-lg p-8 space-y-8"', 'Container size="7xl" padding="lg" className="border border-border rounded-lg space-y-8"'

# Replace bg-card containers with Container component
$content = $content -replace 'div className="bg-card border border-border rounded-lg p-8 space-y-8"', 'Container size="7xl" padding="lg" className="bg-card border border-border rounded-lg space-y-8"'

# Replace text-center div headers with Container
$content = $content -replace '<div className="text-center">', '<Container size="none" padding="none" className="text-center">'

# Replace the corresponding closing divs with Container closing tags
# This is a more targeted replacement for the container sections
$content = $content -replace '</div>\s*\n\s*{/\* [A-Za-z\s]+ Showcase \*/}', '</Container>${0}'

Write-Output "Converting repetitive containers to enterprise-grade Container components..."
$content | Set-Content $filePath -NoNewline

Write-Output "✅ Successfully replaced container patterns in component showcase!"
Write-Output "📊 Eliminated repetitive div containers for DRY principle compliance"
