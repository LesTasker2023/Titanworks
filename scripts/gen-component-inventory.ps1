<#!
.SYNOPSIS
  Generates a JSON inventory of UI components.
.DESCRIPTION
  Scans src/components/ui/** for component folders, capturing:
    name, path, fileCount, hasTest, hasStory, exports (rough via default export line match)
  Writes to reports/component-inventory.json
.NOTES
  Phase 0 baseline tool. Improve with AST in Phase 2.
#>

$ErrorActionPreference = 'Stop'
$root = Join-Path $PSScriptRoot '..'
$src  = Join-Path $root 'src/components/ui'
$reportDir = Join-Path $root 'reports'
$outFile = Join-Path $reportDir 'component-inventory.json'

if (!(Test-Path $src)) { Write-Error "UI components directory not found: $src" }
if (!(Test-Path $reportDir)) { New-Item -ItemType Directory -Path $reportDir | Out-Null }

$components = Get-ChildItem -Path $src -Directory -Recurse | Where-Object { $_.FullName -notmatch "__snapshots__" }

$result = @()
foreach ($dir in $components) {
  $files = Get-ChildItem -Path $dir.FullName -File -Recurse
  $tsFiles = $files | Where-Object { $_.Extension -match 'tsx?$' }
  $test = $tsFiles | Where-Object { $_.Name -match '\.test\.tsx$' }
  $story = $tsFiles | Where-Object { $_.Name -match '\.stories\.tsx$' }
  $exportLines = @()
  foreach ($f in $tsFiles) {
    $content = Get-Content -Raw -Path $f.FullName
    if ($content -match 'export (const|function|class) ') { $exportLines += ($content | Select-String 'export (const|function|class) ' -AllMatches).Matches.Value }
  }
  # Derive clean relative path (normalize to forward slashes)
  $relative = Resolve-Path -Relative $dir.FullName 2>$null
  if (-not $relative) {
    $relative = ($dir.FullName.Substring($root.Length)).TrimStart('\\/')
  }
  $relative = $relative -replace '\\','/'

  $result += [pscustomobject]@{
    name      = $dir.Name
    category  = 'ui'
    path      = $relative
    fileCount = $files.Count
    tests     = ($test | Measure-Object).Count
    stories   = ($story | Measure-Object).Count
    exports   = $exportLines | Sort-Object -Unique
  }
}

$result | ConvertTo-Json -Depth 5 | Set-Content -Path $outFile -Encoding UTF8
Write-Host "Component inventory written to $outFile" -ForegroundColor Green
