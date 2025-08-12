#!/usr/bin/env node

import { spawn } from 'child_process';
import chalk from 'chalk';

console.log(chalk.blue.bold('🚀 TriggerKings Development Environment'));
console.log(chalk.gray('Starting all development services...\n'));

// Function to run command with colored output
function runCommand(command, args, color = 'white', prefix = '') {
  const process = spawn(command, args, { shell: true });

  process.stdout.on('data', data => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(chalk[color](`${prefix} ${line}`));
      }
    });
  });

  process.stderr.on('data', data => {
    console.log(chalk.red(`${prefix} ${data}`));
  });

  return process;
}

// Start all services
console.log(chalk.green('✓ Starting Next.js development server...'));
const nextProcess = runCommand('yarn', ['dev'], 'cyan', '[NEXT]');

console.log(chalk.green('✓ Starting Storybook...'));
const storybookProcess = runCommand('yarn', ['storybook'], 'magenta', '[STORYBOOK]');

// Handle process cleanup
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n⚡ Shutting down development environment...'));
  nextProcess.kill();
  storybookProcess.kill();
  process.exit();
});

console.log(chalk.green.bold('\n🎉 Development environment ready!'));
console.log(chalk.gray('• Next.js: http://localhost:3000'));
console.log(chalk.gray('• Storybook: http://localhost:6006'));
console.log(chalk.gray('\nPress Ctrl+C to stop all services'));
