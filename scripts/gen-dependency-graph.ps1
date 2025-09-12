<#!
.SYNOPSIS
  Generates a lightweight dependency graph (v1) for TypeScript/TSX files.
.DESCRIPTION
  Scans src/**/*.ts,tsx (excluding tests, stories, demos) and extracts import edges.
  Outputs reports/dependency-graph.json with nodes + edges.
.NOTES
  Phase 0 implementation using regex; upgrade to TS Compiler API in Phase 2.
#>
$ErrorActionPreference = 'Stop'
$root = Join-Path $PSScriptRoot '..'
$srcDir = Join-Path $root 'src'
$reportDir = Join-Path $root 'reports'
$outFile = Join-Path $reportDir 'dependency-graph.json'
if (!(Test-Path $reportDir)) { New-Item -ItemType Directory -Path $reportDir | Out-Null }

$files = Get-ChildItem -Path $srcDir -Recurse -Include *.ts,*.tsx | Where-Object { $_.FullName -notmatch '\.(test|stories)\.tsx$' -and $_.Name -notmatch 'demo\.tsx$' }
$nodes = @{}
$edges = @()

function Normalize-Rel($full) {
  $rel = Resolve-Path -Relative $full 2>$null
  if (-not $rel) { $rel = $full.Substring($root.Length).TrimStart('\\/') }
  return ($rel -replace '\\','/')
}

foreach ($file in $files) {
  $pathRel = Normalize-Rel $file.FullName
  if (-not $nodes.ContainsKey($pathRel)) { $nodes[$pathRel] = @{ id = $pathRel } }
  $content = Get-Content -Raw -Path $file.FullName
  $importPattern = @'
import[^;]+from\s+['"']([^'"']+)['"']
'@
  $matches = Select-String -InputObject $content -Pattern $importPattern -AllMatches
  foreach ($m in $matches.Matches) {
    $target = $m.Groups[1].Value
    if ($target.StartsWith('.')) {
      # Resolve relative import
      $base = Split-Path $file.FullName
      $resolved = Join-Path $base $target
      # Append .ts/.tsx heuristics
      $resolvedFile = @(
        "$resolved.ts",
        "$resolved.tsx",
        (Join-Path $resolved 'index.ts'),
        (Join-Path $resolved 'index.tsx')
      ) | Where-Object { Test-Path $_ } | Select-Object -First 1
      if ($resolvedFile) {
        $toRel = Normalize-Rel $resolvedFile
        if (-not $nodes.ContainsKey($toRel)) { $nodes[$toRel] = @{ id = $toRel } }
        $edges += @{ from = $pathRel; to = $toRel }
      }
    } elseif ($target.StartsWith('@')) {
      # Path alias resolution (@/ -> src/)
      $aliasTarget = $target -replace '^@/', ''
      $resolved = Join-Path $srcDir $aliasTarget
      $resolvedFile = @(
        "$resolved.ts",
        "$resolved.tsx",
        (Join-Path $resolved 'index.ts'),
        (Join-Path $resolved 'index.tsx')
      ) | Where-Object { Test-Path $_ } | Select-Object -First 1
      if ($resolvedFile) {
        $toRel = Normalize-Rel $resolvedFile
        if (-not $nodes.ContainsKey($toRel)) { $nodes[$toRel] = @{ id = $toRel } }
        $edges += @{ from = $pathRel; to = $toRel }
      }
    } else {
      # External dependency - skip for now (could store as virtual node later)
      continue
    }
  }
}

$graph = [pscustomobject]@{
  nodes = ($nodes.Keys | Sort-Object | ForEach-Object { $nodes[$_] })
  edges = $edges
  meta  = @{ version = 1; generated = (Get-Date).ToUniversalTime().ToString('o'); strategy = 'regex'; }
}
$graph | ConvertTo-Json -Depth 6 | Set-Content -Path $outFile -Encoding UTF8
Write-Host "Dependency graph written to $outFile" -ForegroundColor Green
