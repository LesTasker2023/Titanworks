<#
  Script: save-coverage-baseline.ps1
  Purpose: Capture current coverage-final.json (Vitest) as baseline artifact in reports/coverage-baseline.json.
  Usage: Run AFTER `vitest run --coverage` (e.g., via yarn coverage:baseline).
#>

$ErrorActionPreference = 'Stop'

$coverageFile = Join-Path -Path (Resolve-Path .) -ChildPath 'coverage/coverage-final.json'
$baselineTarget = Join-Path -Path (Resolve-Path .) -ChildPath 'reports/coverage-baseline.json'

if (!(Test-Path $coverageFile)) {
  Write-Error "Coverage file not found at $coverageFile. Run 'yarn test:coverage' first.";
  exit 1
}

# Read coverage JSON
$coverageJson = Get-Content $coverageFile -Raw | ConvertFrom-Json

# Compute aggregate quick metrics (lines pct, functions pct, branches pct, files count)
$totalLines = 0
$coveredLines = 0
$totalFns = 0
$coveredFns = 0
$totalBranches = 0
$coveredBranches = 0
$fileCount = 0

$coverageJson.PSObject.Properties | ForEach-Object {
  $file = $_.Value
  if ($file -and $file.s) {
    $fileCount++
    # statements counts exist but use lines detail (l) if present
    if ($file.l) {
      $file.l.PSObject.Properties | ForEach-Object {
        $totalLines++
        if ($_.Value -gt 0) { $coveredLines++ }
      }
    }
    if ($file.f) {
      $file.f.PSObject.Properties | ForEach-Object { $totalFns++ }
      if ($file.fnMap) {
        # treat any function with hits > 0 as covered
        $file.f.PSObject.Properties | ForEach-Object {
          if ($_.Value -gt 0) { $coveredFns++ }
        }
      }
    }
    if ($file.b) {
      # branch map uses arrays per branch index
      $file.b.PSObject.Properties | ForEach-Object {
        $branchHits = $_.Value
        if ($branchHits -is [System.Array]) {
          $totalBranches += $branchHits.Length
          $coveredBranches += ($branchHits | Where-Object { $_ -gt 0 }).Count
        }
      }
    }
  }
}

function pct($covered, $total) { if ($total -eq 0) { return 0 } [math]::Round(($covered / $total) * 100, 2) }

$summary = [PSCustomObject]@{
  generated    = (Get-Date).ToUniversalTime().ToString('o')
  files        = $fileCount
  lines        = @{ covered = $coveredLines; total = $totalLines; pct = (pct $coveredLines $totalLines) }
  functions    = @{ covered = $coveredFns; total = $totalFns; pct = (pct $coveredFns $totalFns) }
  branches     = @{ covered = $coveredBranches; total = $totalBranches; pct = (pct $coveredBranches $totalBranches) }
  source       = 'vitest v8 (coverage-final.json)'
  note         = 'Baseline snapshot. Do not edit manually.'
}

$baseline = @{ summary = $summary; raw = $coverageJson } | ConvertTo-Json -Depth 50

Set-Content -Path $baselineTarget -Value $baseline -Encoding UTF8

Write-Host "Coverage baseline saved -> $baselineTarget"