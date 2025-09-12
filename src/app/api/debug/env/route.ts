import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Debug environment variables (safe for development only)
    const envDebug = {
      EBAY_APP_ID: process.env.EBAY_APP_ID ? '✅ Set' : '❌ Missing',
      EBAY_DEV_ID: process.env.EBAY_DEV_ID ? '✅ Set' : '❌ Missing',
      EBAY_CERT_ID: process.env.EBAY_CERT_ID ? '✅ Set' : '❌ Missing',
      EBAY_ENVIRONMENT: process.env.EBAY_ENVIRONMENT || '❌ Missing',
      NODE_ENV: process.env.NODE_ENV,
      // Show partial values for verification (first 10 chars only)
      EBAY_APP_ID_PARTIAL: process.env.EBAY_APP_ID
        ? process.env.EBAY_APP_ID.substring(0, 10) + '...'
        : 'Missing',
      EBAY_DEV_ID_PARTIAL: process.env.EBAY_DEV_ID
        ? process.env.EBAY_DEV_ID.substring(0, 10) + '...'
        : 'Missing',
    };

    return NextResponse.json({
      success: true,
      environment_debug: envDebug,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Environment debug error:', error);
    return NextResponse.json(
      {
        error: 'Environment debug failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
