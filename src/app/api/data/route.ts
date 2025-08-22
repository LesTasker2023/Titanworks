import { IntelligenceReport, isIntelligenceReport } from '@/types/intelligence';
import { readFileSync } from 'fs';
import { NextResponse } from 'next/server';
import { join } from 'path';

export async function GET(): Promise<NextResponse<IntelligenceReport | { error: string }>> {
  try {
    // Read the JSON file from the public directory
    const filePath = join(process.cwd(), 'public', 'intelligence-report.json');
    const fileContents = readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    // Type validation
    if (!isIntelligenceReport(data)) {
      console.error('Invalid intelligence report structure');
      return NextResponse.json({ error: 'Invalid intelligence report structure' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading intelligence-report.json:', error);
    return NextResponse.json(
      { error: 'Failed to load repository intelligence data' },
      { status: 500 }
    );
  }
}
