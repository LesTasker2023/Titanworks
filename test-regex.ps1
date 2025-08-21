# Test regex pattern for CVA variant detection
$content = Get-Content "src\components\ui\Dialog\Dialog.tsx" -Raw

Write-Host "Testing regex patterns..."
Write-Host ""

# Test basic patterns
$patterns = @(
    "default",
    "default:",
    "default\s*:",
    "default\s*:\s*'",
    "default\s*:\s*['""]"
)

foreach ($pattern in $patterns) {
    $match = $content -match $pattern
    Write-Host "Pattern: $pattern = $match"
}

# Show a snippet of content around 'default'
$lines = $content -split "`n"
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match "default") {
        Write-Host ""
        Write-Host "Found 'default' at line $($i+1):"
        Write-Host "  $($lines[$i].Trim())"
        break
    }
}
