/**
 * Vercel Integration API Route
 * Fetches real-time deployment data from Vercel API
 */

import { createVercelAPIService } from '@/services/vercelAPI';
import { VercelIntegrationData } from '@/types/vercel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Use environment variables by default, fallback to query parameters
    const projectId = searchParams.get('projectId') || process.env.VERCEL_PROJECT_ID;
    const apiToken = searchParams.get('apiToken') || process.env.VERCEL_API_TOKEN;
    const teamId = searchParams.get('teamId') || undefined;

    // Validate required parameters
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    if (!apiToken) {
      return NextResponse.json({ error: 'API token is required' }, { status: 400 });
    }

    // Create Vercel API service
    const vercelAPI = createVercelAPIService(apiToken, teamId);

    // Test connection first
    const connectionTest = await vercelAPI.testConnection();
    if (!connectionTest.success) {
      return NextResponse.json(
        {
          error: 'Failed to connect to Vercel API',
          details: connectionTest.message,
        },
        { status: 401 }
      );
    }

    // Fetch comprehensive integration data
    const integrationData = await vercelAPI.getProjectIntegrationData(projectId);

    // Add metadata
    const response: VercelIntegrationData & { metadata: any } = {
      ...integrationData,
      metadata: {
        fetchedAt: new Date().toISOString(),
        projectId,
        teamId: teamId || null,
        apiVersion: 'v1',
      },
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, max-age=60', // Cache for 1 minute
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Vercel API integration error:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('unauthorized') || error.message.includes('forbidden')) {
        return NextResponse.json(
          {
            error: 'Authentication failed',
            details: 'Invalid API token or insufficient permissions',
          },
          { status: 401 }
        );
      }

      if (error.message.includes('not found')) {
        return NextResponse.json(
          {
            error: 'Project not found',
            details: 'The specified project ID does not exist or is not accessible',
          },
          { status: 404 }
        );
      }

      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          {
            error: 'Rate limit exceeded',
            details: 'Too many requests to Vercel API. Please try again later.',
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: 'Integration failed',
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        details: 'An unexpected error occurred while fetching Vercel data',
      },
      { status: 500 }
    );
  }
}

// POST endpoint for saving Vercel configuration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, apiToken, teamId } = body;

    if (!projectId || !apiToken) {
      return NextResponse.json({ error: 'Project ID and API token are required' }, { status: 400 });
    }

    // Test the configuration
    const vercelAPI = createVercelAPIService(apiToken, teamId);
    const connectionTest = await vercelAPI.testConnection();

    if (!connectionTest.success) {
      return NextResponse.json(
        {
          error: 'Invalid configuration',
          details: connectionTest.message,
        },
        { status: 400 }
      );
    }

    // Try to fetch project to validate access
    try {
      await vercelAPI.getProject(projectId);
    } catch (error) {
      return NextResponse.json(
        {
          error: 'Project access failed',
          details: 'Cannot access the specified project with provided credentials',
        },
        { status: 403 }
      );
    }

    // In a real app, you'd save this configuration to your database
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Vercel configuration validated successfully',
      projectId,
      teamId: teamId || null,
    });
  } catch (error) {
    console.error('Vercel configuration error:', error);

    return NextResponse.json(
      {
        error: 'Configuration failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// OPTIONS endpoint for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
