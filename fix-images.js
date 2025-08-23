const fs = require('fs');
const path = require('path');

const files = [
  'src/app/restaurant/page.tsx',
  'src/app/wedding/page.tsx',
  'src/app/product/page.tsx',
  'src/app/youtube/page.tsx',
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`Fixing URLs in ${file}...`);

    let content = fs.readFileSync(file, 'utf8');

    // Replace old format with new format
    content = content.replace(
      /images\.unsplash\.com\/photo-([^?]+)\?w=(\d+)&h=(\d+)&fit=crop/g,
      'images.unsplash.com/photo-$1?ixlib=rb-4.0.3&auto=format&fit=crop&w=$2&h=$3'
    );

    content = content.replace(
      /images\.unsplash\.com\/photo-([^?]+)\?w=(\d+)&h=(\d+)&fit=crop&crop=face/g,
      'images.unsplash.com/photo-$1?ixlib=rb-4.0.3&auto=format&fit=crop&w=$2&h=$3'
    );

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed ${file} ✓`);
  } else {
    console.log(`File not found: ${file}`);
  }
});

console.log('All image URLs have been updated to the new Unsplash format!');
