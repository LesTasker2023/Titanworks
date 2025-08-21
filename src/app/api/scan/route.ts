import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'GET not implemented - use POST to trigger scan',
  });
}

export async function POST() {
  return NextResponse.json({
    success: false,
    message:
      'Repository scan disabled due to Next.js 15.4.6 webpack instability. Use manual PowerShell execution.',
    workaround:
      'Run manually: powershell.exe -ExecutionPolicy Bypass -File "admin scripts/repo-intelligence.ps1"',
    technical_note:
      'Any Node.js module imports (child_process, fs, path) cause webpack corruption in Next.js 15.4.6',
  });
}
