$filePath = "src\app\command-center\CommandCenterClient.tsx"
$content = Get-Content $filePath -Raw

# Replace purple text colors with theme colors
$content = $content -replace 'text-purple-200', 'text-content-secondary'
$content = $content -replace 'text-purple-300', 'text-content-tertiary'
$content = $content -replace 'text-white', 'text-content-primary'
$content = $content -replace 'text-red-400', 'text-status-error'

# Replace remaining card borders if any missed
$content = $content -replace 'bg-black/40 border-purple-500/30', 'bg-surface-secondary/40 border-border-default'

# Replace specific text in sections
$content = $content -replace 'border border-purple-500/20 rounded-lg p-4 bg-black/20', 'border border-border-default rounded-lg p-4 bg-surface-secondary/20'
$content = $content -replace 'bg-purple-900/20 border border-purple-500/30', 'bg-surface-accent/20 border border-border-default'
$content = $content -replace 'text-purple-100', 'text-content-primary'
$content = $content -replace 'text-purple-200', 'text-content-secondary'
$content = $content -replace 'text-purple-300', 'text-content-tertiary'

Set-Content $filePath $content

Write-Host "✅ Command Center colors updated to use theme system"
