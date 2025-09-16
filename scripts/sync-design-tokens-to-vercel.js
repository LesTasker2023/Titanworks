#!/usr/bin/env node

/**
 * Sync Design Tokens to Vercel
 * 
 * This script reads local .env.local design tokens and syncs them to Vercel
 * for all environments (development, preview, production).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
const PROJECT_NAME = 'titanworks';

if (!VERCEL_API_TOKEN) {
  console.error('❌ VERCEL_API_TOKEN environment variable is required');
  process.exit(1);
}

// Design token prefixes to sync
const DESIGN_TOKEN_PREFIXES = [
  'NEXT_PUBLIC_SURFACE_',
  'NEXT_PUBLIC_CONTENT_',
  'NEXT_PUBLIC_BORDER_',
  'NEXT_PUBLIC_STATUS_',
  'NEXT_PUBLIC_FONT_',
  'NEXT_PUBLIC_SPACING_',
  'NEXT_PUBLIC_RADIUS_'
];

class VercelTokenSync {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.baseUrl = 'https://api.vercel.com';
    this.projectId = null;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${error}`);
    }

    return await response.json();
  }

  async findProject(projectName) {
    console.log(`🔍 Finding project: ${projectName}`);
    const projects = await this.makeRequest('/v9/projects');
    
    const project = projects.projects.find(p => p.name === projectName);
    if (!project) {
      throw new Error(`Project "${projectName}" not found`);
    }

    this.projectId = project.id;
    console.log(`✅ Found project: ${project.name} (${project.id})`);
    return project;
  }

  async getEnvironmentVariables() {
    if (!this.projectId) {
      throw new Error('Project ID not set. Call findProject first.');
    }

    console.log(`📋 Getting environment variables...`);
    return await this.makeRequest(`/v9/projects/${this.projectId}/env`);
  }

  async createEnvironmentVariable(key, value, target = ['development', 'preview', 'production']) {
    if (!this.projectId) {
      throw new Error('Project ID not set. Call findProject first.');
    }

    const payload = {
      key,
      value,
      type: 'encrypted',
      target
    };

    console.log(`➕ Creating env var: ${key} for [${target.join(', ')}]`);
    
    try {
      return await this.makeRequest(`/v9/projects/${this.projectId}/env`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`   ⚠️  Variable ${key} already exists, skipping`);
        return null;
      }
      throw error;
    }
  }

  async updateEnvironmentVariable(envId, value, target = ['development', 'preview', 'production']) {
    if (!this.projectId) {
      throw new Error('Project ID not set. Call findProject first.');
    }

    const payload = {
      value,
      target
    };

    console.log(`🔄 Updating env var: ${envId}`);
    
    return await this.makeRequest(`/v9/projects/${this.projectId}/env/${envId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
  }
}

function extractDesignTokensFromEnv() {
  console.log('🎨 Extracting design tokens from .env.local...');
  
  const envPath = path.join(__dirname, '../.env.local');
  if (!fs.existsSync(envPath)) {
    throw new Error('.env.local file not found');
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const tokens = {};
  
  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line.startsWith('#') || !line.includes('=')) return;
    
    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=');
    
    // Check if this is a design token
    const isDesignToken = DESIGN_TOKEN_PREFIXES.some(prefix => key.startsWith(prefix));
    
    if (isDesignToken) {
      tokens[key] = value;
    }
  });

  console.log(`📊 Found ${Object.keys(tokens).length} design tokens to sync:`);
  
  // Group by category for display
  const categories = {};
  Object.keys(tokens).forEach(key => {
    const prefix = DESIGN_TOKEN_PREFIXES.find(p => key.startsWith(p));
    if (prefix) {
      const category = prefix.replace('NEXT_PUBLIC_', '').replace('_', '').toLowerCase();
      if (!categories[category]) categories[category] = [];
      categories[category].push(key);
    }
  });

  Object.entries(categories).forEach(([category, keys]) => {
    console.log(`  • ${category}: ${keys.length} tokens`);
  });

  return tokens;
}

async function syncTokens() {
  try {
    const tokens = extractDesignTokensFromEnv();
    
    if (Object.keys(tokens).length === 0) {
      console.log('⚠️  No design tokens found to sync');
      return;
    }

    const sync = new VercelTokenSync(VERCEL_API_TOKEN);
    
    // Find the project
    await sync.findProject(PROJECT_NAME);
    
    // Get existing environment variables
    const existing = await sync.getEnvironmentVariables();
    const existingKeys = new Set(existing.envs.map(env => env.key));
    
    console.log(`\n🚀 Starting sync of ${Object.keys(tokens).length} design tokens...\n`);
    
    let created = 0;
    let skipped = 0;
    let errors = 0;
    
    for (const [key, value] of Object.entries(tokens)) {
      try {
        if (existingKeys.has(key)) {
          console.log(`   ⏭️  Skipping ${key} (already exists)`);
          skipped++;
        } else {
          await sync.createEnvironmentVariable(key, value);
          created++;
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`   ❌ Error syncing ${key}: ${error.message}`);
        errors++;
      }
    }
    
    console.log(`\n📊 Sync Summary:`);
    console.log(`   ✅ Created: ${created}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);
    
    if (created > 0) {
      console.log(`\n🎉 Successfully synced ${created} design tokens to Vercel!`);
      console.log(`💡 Deploy your project to see the changes take effect.`);
    }
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

// Run the sync
syncTokens();