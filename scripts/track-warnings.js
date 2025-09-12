// Warning tracker script: hashes console warnings, saves ledger, ensures reports directory exists
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../reports/warning-ledger.json');

function saveLedger(ledger) {
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
  fs.writeFileSync(LOG_FILE, JSON.stringify(ledger, null, 2));
}

// Example usage: saveLedger({ 'warning-hash': { count: 1, lastSeen: Date.now() } });

module.exports = { saveLedger };
