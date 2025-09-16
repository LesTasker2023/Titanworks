import { NextRequest, NextResponse } from 'next/server';
import VercelAPIService from '@/services/vercelAPI';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const projectId = searchParams.get('projectId');

    // Get Vercel token from environment variables
    const vercelToken = process.env.VERCEL_API_TOKEN;
    const vercelTeamId = process.env.VERCEL_TEAM_ID; // Optional

    if (!vercelToken) {
      return NextResponse.json(
        { error: 'VERCEL_API_TOKEN not configured' },
        { status: 500 }
      );
    }

    const vercel = new VercelAPIService(vercelToken, vercelTeamId);

    switch (action) {
      case 'teams':
        const teams = await vercel.getTeams();
        return NextResponse.json(teams);

      case 'projects':
        const projects = await vercel.getProjects();
        return NextResponse.json(projects);

      case 'project':
        if (!projectId) {
          return NextResponse.json(
            { error: 'projectId parameter required' },
            { status: 400 }
          );
        }
        const project = await vercel.getProject(projectId);
        return NextResponse.json(project);

      case 'env':
        if (!projectId) {
          return NextResponse.json(
            { error: 'projectId parameter required for env action' },
            { status: 400 }
          );
        }
        const envVars = await vercel.getEnvironmentVariables(projectId);
        return NextResponse.json(envVars);

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: teams, projects, project, env' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Vercel API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const projectId = searchParams.get('projectId');

    if (action !== 'env' || !projectId) {
      return NextResponse.json(
        { error: 'POST only supports env action with projectId' },
        { status: 400 }
      );
    }

    const vercelToken = process.env.VERCEL_API_TOKEN;
    const vercelTeamId = process.env.VERCEL_TEAM_ID;

    if (!vercelToken) {
      return NextResponse.json(
        { error: 'VERCEL_API_TOKEN not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const vercel = new VercelAPIService(vercelToken, vercelTeamId);

    const newEnvVar = await vercel.createEnvironmentVariable(projectId, body);
    return NextResponse.json(newEnvVar);
  } catch (error) {
    console.error('Vercel API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}