import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Minimal implementation - just check for existing file
    const { readFile } = await import('fs/promises');
    const { join } = await import('path');

    const intelligenceFile = join(process.cwd(), 'admin scripts', 'script-result.json');

    try {
      const data = await readFile(intelligenceFile, 'utf8');
      const intelligence = JSON.parse(data);

      return NextResponse.json({
        success: true,
        data: intelligence,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: 'No intelligence data available. Run a scan to generate data.',
        data: null,
      });
    }
  } catch (error) {
    console.error('Error reading intelligence data:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to read intelligence data',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    // Ultra-minimal implementation
    return NextResponse.json({
      success: false,
      message:
        'Repository scan temporarily disabled due to webpack conflicts. Use manual PowerShell execution.',
      workaround:
        'Run: powershell.exe -ExecutionPolicy Bypass -File "admin scripts/repo-intelligence.ps1"',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'API error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
