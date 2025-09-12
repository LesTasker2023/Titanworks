#!/usr/bin/env tsx
/**
 * Warning Persistence Tracker
 *
 * Monitors test/build warnings over time to enforce §1.1 Signal>Noise doctrine:
 * "A console warning present for >1 week without remediation plan becomes a backlog item"
 *
 * Usage:
 *   yarn track-warnings            # Update warning ledger
 *   yarn track-warnings --report   # Show persistent warnings
 *   yarn track-warnings --backlog  # Generate backlog items for >7 day warnings
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

interface WarningEntry {
  id: string; // Hash of warning content for deduplication
  content: string; // Warning message content
  source: string; // Source file/component
  firstSeen: string; // ISO date when first observed
  lastSeen: string; // ISO date when last observed
  count: number; // Number of occurrences
  category: string; // 'dom-prop' | 'a11y' | 'performance' | 'other'
  resolved: boolean; // Whether warning is resolved
}

interface WarningLedger {
  lastUpdate: string;
  entries: WarningEntry[];
}

const REPORTS_DIR = 'reports';
const LEDGER_FILE = path.join(REPORTS_DIR, 'warning-ledger.json');
const PERSISTENCE_THRESHOLD_DAYS = 7;

/**
 * Generate unique ID for warning based on content and source
 */
function generateWarningId(content: string, source: string): string {
  return crypto.createHash('md5').update(`${content}:${source}`).digest('hex').slice(0, 12);
}

/**
 * Categorize warning based on content patterns
 */
function categorizeWarning(content: string): string {
  if (content.includes('non-boolean attribute') || content.includes('React does not recognize')) {
    return 'dom-prop';
  }
  if (
    content.includes('aria-') ||
    content.includes('DialogTitle') ||
    content.includes('screen reader')
  ) {
    return 'a11y';
  }
  if (
    content.includes('width(0)') ||
    content.includes('height(0)') ||
    content.includes('performance')
  ) {
    return 'performance';
  }
  return 'other';
}

/**
 * Load existing warning ledger or create new one
 */
function loadLedger(): WarningLedger {
  if (fs.existsSync(LEDGER_FILE)) {
    const content = fs.readFileSync(LEDGER_FILE, 'utf-8');
    return JSON.parse(content);
  }

  return {
    lastUpdate: new Date().toISOString(),
    entries: [],
  };
}

/**
 * Save warning ledger to disk
 */
function saveLedger(ledger: WarningLedger): void {
  // Ensure reports directory exists
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  ledger.lastUpdate = new Date().toISOString();
  fs.writeFileSync(LEDGER_FILE, JSON.stringify(ledger, null, 2));
}

/**
 * Parse warnings from test output (stderr)
 */
function parseWarningsFromTestOutput(testOutput: string): WarningEntry[] {
  const warnings: WarningEntry[] = [];
  const lines = testOutput.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines and non-warning content
    if (!line || !line.includes('stderr')) continue;

    // Extract warning content after stderr marker
    const warningMatch = line.match(/stderr.*?\|.*?>(.*)/);
    if (!warningMatch) continue;

    let warningContent = warningMatch[1].trim();

    // Handle multi-line warnings by reading subsequent lines
    let j = i + 1;
    while (j < lines.length && !lines[j].includes('stderr') && !lines[j].includes('✓')) {
      const nextLine = lines[j].trim();
      if (nextLine) {
        warningContent += ' ' + nextLine;
      }
      j++;
    }

    // Extract source component/file
    const sourceMatch = line.match(/src\/components\/ui\/(\w+)\//) ||
      line.match(/src\/([\w\/]+)/) || ['', 'unknown'];
    const source = sourceMatch[1];

    if (warningContent.length > 10) {
      // Filter out noise
      const id = generateWarningId(warningContent, source);
      const category = categorizeWarning(warningContent);

      warnings.push({
        id,
        content: warningContent,
        source,
        firstSeen: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
        count: 1,
        category,
        resolved: false,
      });
    }
  }

  return warnings;
}

/**
 * Update ledger with new warnings
 */
function updateLedger(newWarnings: WarningEntry[]): WarningLedger {
  const ledger = loadLedger();
  const now = new Date().toISOString();

  // Create map of existing entries for efficient lookup
  const existingMap = new Map(ledger.entries.map(entry => [entry.id, entry]));

  // Process new warnings
  for (const warning of newWarnings) {
    const existing = existingMap.get(warning.id);

    if (existing && !existing.resolved) {
      // Update existing warning
      existing.lastSeen = now;
      existing.count += 1;
    } else if (!existing) {
      // Add new warning
      ledger.entries.push({
        ...warning,
        firstSeen: now,
        lastSeen: now,
      });
    }
  }

  return ledger;
}

/**
 * Get warnings that have persisted beyond threshold
 */
function getPersistentWarnings(ledger: WarningLedger): WarningEntry[] {
  const now = new Date();
  const thresholdMs = PERSISTENCE_THRESHOLD_DAYS * 24 * 60 * 60 * 1000;

  return ledger.entries.filter(entry => {
    if (entry.resolved) return false;

    const firstSeenDate = new Date(entry.firstSeen);
    const ageMs = now.getTime() - firstSeenDate.getTime();

    return ageMs > thresholdMs;
  });
}

/**
 * Generate backlog items for persistent warnings
 */
function generateBacklogItems(persistentWarnings: WarningEntry[]): string {
  if (persistentWarnings.length === 0) {
    return '✅ No persistent warnings requiring backlog items.';
  }

  let backlog = `# Persistent Warning Backlog (Generated ${new Date().toISOString()})\n\n`;
  backlog += `Found ${persistentWarnings.length} warnings persisting >${PERSISTENCE_THRESHOLD_DAYS} days:\n\n`;

  const byCategory = persistentWarnings.reduce(
    (acc, warning) => {
      if (!acc[warning.category]) acc[warning.category] = [];
      acc[warning.category].push(warning);
      return acc;
    },
    {} as Record<string, WarningEntry[]>
  );

  for (const [category, warnings] of Object.entries(byCategory)) {
    backlog += `## ${category.toUpperCase()} (${warnings.length})\n\n`;

    for (const warning of warnings) {
      const daysPersistent = Math.floor(
        (new Date().getTime() - new Date(warning.firstSeen).getTime()) / (24 * 60 * 60 * 1000)
      );

      backlog += `### Warning ${warning.id}\n`;
      backlog += `- **Source**: ${warning.source}\n`;
      backlog += `- **Age**: ${daysPersistent} days (first seen: ${warning.firstSeen.split('T')[0]})\n`;
      backlog += `- **Occurrences**: ${warning.count}\n`;
      backlog += `- **Content**: ${warning.content.slice(0, 200)}${warning.content.length > 200 ? '...' : ''}\n\n`;
    }
  }

  return backlog;
}

/**
 * Main execution logic
 */
async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'update';

  try {
    switch (mode) {
      case '--report':
        const ledger = loadLedger();
        const activeWarnings = ledger.entries.filter(e => !e.resolved);
        console.log(`📊 Warning Ledger Report`);
        console.log(`Last Updated: ${ledger.lastUpdate}`);
        console.log(`Active Warnings: ${activeWarnings.length}`);
        console.log(`Total Entries: ${ledger.entries.length}`);

        if (activeWarnings.length > 0) {
          const byCategory = activeWarnings.reduce(
            (acc, w) => {
              acc[w.category] = (acc[w.category] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>
          );

          console.log('\nBy Category:');
          Object.entries(byCategory).forEach(([cat, count]) => {
            console.log(`  ${cat}: ${count}`);
          });
        }
        break;

      case '--backlog':
        const currentLedger = loadLedger();
        const persistent = getPersistentWarnings(currentLedger);
        const backlogReport = generateBacklogItems(persistent);

        console.log(backlogReport);

        if (persistent.length > 0) {
          const backlogFile = path.join(REPORTS_DIR, 'warning-backlog.md');
          fs.writeFileSync(backlogFile, backlogReport);
          console.log(`\n📝 Backlog report saved to: ${backlogFile}`);
        }
        break;

      default: // 'update' mode
        // This would typically be called with test output as stdin or from CI
        // For now, create an empty ledger structure for the automation pipeline
        const emptyLedger = loadLedger();
        saveLedger(emptyLedger);
        console.log(`📋 Warning ledger initialized/updated: ${LEDGER_FILE}`);
        break;
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run if this is the main module
main();

export { updateLedger, parseWarningsFromTestOutput, getPersistentWarnings, generateBacklogItems };
