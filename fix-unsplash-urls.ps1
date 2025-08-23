# Fix Unsplash URLs Script
# This PowerShell script fixes all the old Unsplash URL format to the new format

$files = @(
    "src\app\restaurant\page.tsx",
    "src\app\wedding\page.tsx", 
    "src\app\product\page.tsx",
    "src\app\youtube\page.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Fixing URLs in $file..."
        
        # Read the file content
        $content = Get-Content $file -Raw
        
        # Replace old format with new format
        $content = $content -replace 'images\.unsplash\.com/photo-([^?]+)\?w=(\d+)&h=(\d+)&fit=crop', 'images.unsplash.com/photo-$1?ixlib=rb-4.0.3&auto=format&fit=crop&w=$2&h=$3'
        $content = $content -replace 'images\.unsplash\.com/photo-([^?]+)\?w=(\d+)&h=(\d+)&fit=crop&crop=face', 'images.unsplash.com/photo-$1?ixlib=rb-4.0.3&auto=format&fit=crop&w=$2&h=$3'
        
        # Write back to file
        Set-Content -Path $file -Value $content -NoNewline
        
        Write-Host "Fixed $file ✓"
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "All image URLs have been updated to the new Unsplash format!"
