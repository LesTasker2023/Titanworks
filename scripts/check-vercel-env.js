#!/usr/bin/env node

/**
 * Vercel Environment Variables Checker
 *
 * This script checks your Vercel project's environment variables.
 * You need to set VERCEL_API_TOKEN environment variable first.
 *
 * Usage:
 * 1. Get your Vercel API token from https://vercel.com/account/tokens
 * 2. Set it as environment variable: $env:VERCEL_API_TOKEN="your-token-here"
 * 3. Run: node scripts/check-vercel-env.js [projectName]
 */

const VERCEL_API_BASE = 'https://api.vercel.com';

async function vercelRequest(endpoint, token, options = {}) {
  const response = await fetch(`${VERCEL_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Vercel API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function main() {
  const token = process.env.VERCEL_API_TOKEN;
  const targetProjectName = process.argv[2] || 'titanworks';

  if (!token) {
    console.error('❌ VERCEL_API_TOKEN environment variable not set!');
    console.log('📝 Instructions:');
    console.log('1. Go to https://vercel.com/account/tokens');
    console.log('2. Create a new token');
    console.log('3. Set environment variable: $env:VERCEL_API_TOKEN="your-token-here"');
    console.log('4. Run this script again');
    process.exit(1);
  }

  try {
    console.log('🔍 Fetching Vercel projects...\n');

    // Get all projects
    const { projects } = await vercelRequest('/v9/projects', token);

    if (!projects || projects.length === 0) {
      console.log('❌ No projects found');
      return;
    }

    console.log(`📊 Found ${projects.length} projects:`);
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.name} (${project.framework || 'unknown'})`);
    });

    // Find target project
    const targetProject = projects.find(p =>
      p.name.toLowerCase().includes(targetProjectName.toLowerCase())
    );

    if (!targetProject) {
      console.log(`\n❌ Project matching "${targetProjectName}" not found`);
      console.log('💡 Available projects:', projects.map(p => p.name).join(', '));
      return;
    }

    console.log(`\n🎯 Checking environment variables for: ${targetProject.name}`);
    console.log(`📋 Project ID: ${targetProject.id}`);

    // Get environment variables
    const { envs } = await vercelRequest(`/v9/projects/${targetProject.id}/env`, token);

    if (!envs || envs.length === 0) {
      console.log('📭 No environment variables found');
      return;
    }

    console.log(`\n🌟 Found ${envs.length} environment variables:\n`);

    // Group by target environment
    const envsByTarget = envs.reduce((acc, env) => {
      env.target.forEach(target => {
        if (!acc[target]) acc[target] = [];
        acc[target].push(env);
      });
      return acc;
    }, {});

    Object.entries(envsByTarget).forEach(([target, targetEnvs]) => {
      console.log(`📌 ${target.toUpperCase()} (${targetEnvs.length} variables):`);
      targetEnvs.forEach(env => {
        const isDesignToken = env.key.startsWith('NEXT_PUBLIC_');
        const icon = isDesignToken ? '🎨' : '⚙️';
        const valuePreview =
          env.type === 'secret'
            ? '[HIDDEN]'
            : env.value.length > 50
              ? `${env.value.substring(0, 47)}...`
              : env.value;

        console.log(`  ${icon} ${env.key}: ${valuePreview}`);
      });
      console.log('');
    });

    // Check for design tokens specifically
    const designTokens = envs.filter(env => env.key.startsWith('NEXT_PUBLIC_'));

    if (designTokens.length > 0) {
      console.log(`🎨 Design Tokens Found: ${designTokens.length}`);
      console.log('📋 Design token categories:');

      const tokenCategories = {
        surface: designTokens.filter(env => env.key.includes('SURFACE')),
        content: designTokens.filter(env => env.key.includes('CONTENT')),
        border: designTokens.filter(env => env.key.includes('BORDER')),
        spacing: designTokens.filter(env => env.key.includes('SPACING')),
        font: designTokens.filter(env => env.key.includes('FONT')),
        radius: designTokens.filter(env => env.key.includes('RADIUS')),
        other: designTokens.filter(
          env =>
            !env.key.includes('SURFACE') &&
            !env.key.includes('CONTENT') &&
            !env.key.includes('BORDER') &&
            !env.key.includes('SPACING') &&
            !env.key.includes('FONT') &&
            !env.key.includes('RADIUS')
        ),
      };

      Object.entries(tokenCategories).forEach(([category, tokens]) => {
        if (tokens.length > 0) {
          console.log(`  • ${category}: ${tokens.length} tokens`);
        }
      });
    }

    console.log(`\n✅ Environment check complete for ${targetProject.name}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
