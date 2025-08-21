# Test the exact pattern matching logic
$DialogContent = Get-Content "src\components\ui\Dialog\dialog.tsx" -Raw
Write-Host "Dialog Content Preview:"
Write-Host ($DialogContent | Select-String -Pattern "default.*:" -AllMatches).Matches.Value

Write-Host "`nTesting variant patterns:"
$variants = @("default", "success", "warning", "danger")
foreach ($variant in $variants) {
    $pattern = "$variant\s*:\s*'"
    $match = $DialogContent -match $pattern
    Write-Host "Pattern '$pattern' - Match: $match"
    if ($match) {
        $matches = [regex]::Matches($DialogContent, $pattern)
        foreach ($m in $matches) {
            Write-Host "  Found: '$($m.Value)'"
        }
    }
}

Write-Host "`nTesting size patterns:"
$sizes = @("sm", "md", "lg", "xl")
foreach ($size in $sizes) {
    $pattern = "$size\s*:\s*'"
    $match = $DialogContent -match $pattern
    Write-Host "Pattern '$pattern' - Match: $match"
    if ($match) {
        $matches = [regex]::Matches($DialogContent, $pattern)
        foreach ($m in $matches) {
            Write-Host "  Found: '$($m.Value)'"
        }
    }
}
