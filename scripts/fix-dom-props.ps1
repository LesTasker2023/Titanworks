# Fix DOM Prop Warnings
# Apply stripTransientProps to components with DOM prop warnings

$components = @(
    "Accordion",
    "Alert", 
    "Badge",
    "Breadcrumb",
    "DataTable",
    "Menubar",
    "Pagination", 
    "Popover",
    "Separator",
    "Tabs",
    "Tooltip"
)

foreach ($component in $components) {
    $filePath = "src\components\ui\$component\$component.tsx"
    
    if (Test-Path $filePath) {
        Write-Host "Processing $component..." -ForegroundColor Yellow
        
        # Read current content
        $content = Get-Content $filePath -Raw
        
        # Check if stripTransientProps already imported
        if ($content -notmatch "stripTransientProps") {
            # Add import after utils import
            $content = $content -replace "import \{ cn \} from '@/lib/utils';", "import { cn } from '@/lib/utils';`nimport { stripTransientProps } from '@/utils/stripTransientProps';"
            
            # Find and replace props spreading patterns
            $content = $content -replace "\{\.\.\.\s*props\s*\}", "{...stripTransientProps(props)}"
            
            # Write back to file
            Set-Content -Path $filePath -Value $content -NoNewline
            
            Write-Host "  Applied stripTransientProps to $component" -ForegroundColor Green
        } else {
            Write-Host "  $component already has stripTransientProps" -ForegroundColor Gray
        }
    } else {
        Write-Host "  $component.tsx not found" -ForegroundColor Red
    }
}

Write-Host "DOM prop fix script completed." -ForegroundColor Cyan