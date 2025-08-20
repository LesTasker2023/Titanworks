#!/usr/bin/env node

/**
 * Component Showcase Reorganization Script
 *
 * This script helps reorganize the component showcase alphabetically
 * by extracting component blocks and reordering them.
 */

import fs from 'fs';
import path from 'path'; // Component mapping for alphabetical order
const ALPHABETICAL_ORDER = [
  'Accordion',
  'Alert',
  'AlertDialog',
  'AspectRatio',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Button',
  'Calendar',
  'Card',
  'Checkbox',
  'Collapsible',
  'Combobox',
  'Command',
  'ContextMenu',
  'Dialog',
  'DropdownMenu',
  'Form',
  'HoverCard',
  'Input',
  'Label',
  'Menubar',
  'NavigationMenu',
  'Popover',
  'Progress',
  'ResizablePanel',
  'ScrollArea',
  'Select',
  'Separator',
  'Sheet',
  'Skeleton',
  'Slider',
  'Switch',
  'Table',
  'Tabs',
  'Textarea',
  'Toggle',
  'Tooltip',
];

function extractComponentBlocks(fileContent) {
  const blocks = [];
  const lines = fileContent.split('\n');

  let currentBlock = null;
  let depth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Look for component comment headers
    const commentMatch = line.match(/\s*\{\/\* \d+\. (\w+) \*\/\}/);
    if (commentMatch) {
      // Save previous block if exists
      if (currentBlock) {
        blocks.push(currentBlock);
      }

      // Start new block
      currentBlock = {
        name: commentMatch[1],
        startLine: i,
        lines: [line],
      };
      depth = 0;
      continue;
    }

    if (currentBlock) {
      currentBlock.lines.push(line);

      // Track Card depth to know when component ends
      if (line.includes('<Card')) {
        depth++;
      } else if (line.includes('</Card>')) {
        depth--;

        // Component block ends when we close the main Card
        if (depth === 0) {
          currentBlock.endLine = i;
          blocks.push(currentBlock);
          currentBlock = null;
        }
      }
    }
  }

  return blocks;
}

function reorganizeShowcase(filePath) {
  console.log('🔄 Starting showcase reorganization...');

  const content = fs.readFileSync(filePath, 'utf8');

  // Extract component blocks
  const componentBlocks = extractComponentBlocks(content);
  console.log(`📦 Found ${componentBlocks.length} component blocks`);

  // Sort by alphabetical order
  const sortedBlocks = componentBlocks.sort((a, b) => {
    const aIndex = ALPHABETICAL_ORDER.indexOf(a.name);
    const bIndex = ALPHABETICAL_ORDER.indexOf(b.name);

    if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });

  // Update component numbers and badge colors
  const updatedBlocks = sortedBlocks.map((block, index) => {
    const newNumber = index + 1;
    const updatedLines = block.lines.map(line => {
      // Update comment header
      line = line.replace(/\{\/\* \d+\. (\w+) \*\/\}/, `{/* ${newNumber}. $1 */}`);

      // Update badge number and color
      line = line.replace(
        /<span className="bg-\w+-500 text-white text-xs px-2 py-1 rounded">\d+<\/span>/,
        `<span className="bg-green-500 text-white text-xs px-2 py-1 rounded">${newNumber}</span>`
      );

      return line;
    });

    return {
      ...block,
      lines: updatedLines,
      newNumber,
    };
  });

  console.log('✅ Reorganization complete!');
  console.log('📋 New order:');
  updatedBlocks.forEach((block, index) => {
    console.log(`   ${index + 1}. ${block.name}`);
  });

  return updatedBlocks;
}

// Export for use as module or run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const showcasePath = path.join(process.cwd(), 'src/app/component-showcase/page.tsx');

  try {
    reorganizeShowcase(showcasePath);
    console.log('\n💡 Run this script with --apply flag to apply changes');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

export { reorganizeShowcase, ALPHABETICAL_ORDER };
