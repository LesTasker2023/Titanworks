import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    const intelligenceFile = path.join(process.cwd(), 'admin scripts', 'script-result.json');

    // Check if file exists
    try {
      await fs.access(intelligenceFile);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Intelligence data not found. Run yarn audit:repo to generate data.',
        },
        { status: 404 }
      );
    }

    // Read and return the file with proper encoding handling
    const rawData = await fs.readFile(intelligenceFile, 'utf8');

    // Remove BOM if present and clean the JSON
    const cleanData = rawData.replace(/^\uFEFF/, '').trim();

    let intelligence;
    try {
      intelligence = JSON.parse(cleanData);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('First 100 chars of data:', cleanData.substring(0, 100));
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON format in intelligence data file',
          error: parseError instanceof Error ? parseError.message : 'Parse error',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(intelligence, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Error serving intelligence data:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load intelligence data',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
