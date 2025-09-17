/**
 * Vercel API Service
 * Provides functions to interact with Vercel's REST API
 */

const VERCEL_API_BASE = 'https://api.vercel.com';

export interface VercelTeam {
  id: string;
  slug: string;
  name: string;
}

export interface VercelProject {
  id: string;
  name: string;
  accountId: string;
  createdAt: number;
  updatedAt: number;
  framework: string;
}

export interface VercelEnvVar {
  id: string;
  key: string;
  value: string;
  type: 'plain' | 'secret' | 'system';
  target: ('production' | 'preview' | 'development')[];
  configurationId?: string;
  updatedAt: number;
  createdAt: number;
}

class VercelAPIService {
  private token: string;
  private teamId?: string;

  constructor(token: string, teamId?: string) {
    this.token = token;
    this.teamId = teamId;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${VERCEL_API_BASE}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Vercel API Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as T;
  }

  async getTeams(): Promise<{ teams: VercelTeam[] }> {
    return this.request('/v2/teams');
  }

  async getProjects(): Promise<{ projects: VercelProject[] }> {
    const endpoint = this.teamId ? `/v9/projects?teamId=${this.teamId}` : '/v9/projects';
    return this.request(endpoint);
  }

  async getProject(projectId: string): Promise<VercelProject> {
    const endpoint = this.teamId
      ? `/v9/projects/${projectId}?teamId=${this.teamId}`
      : `/v9/projects/${projectId}`;
    return this.request(endpoint);
  }

  async getEnvironmentVariables(projectId: string): Promise<{ envs: VercelEnvVar[] }> {
    const endpoint = this.teamId
      ? `/v9/projects/${projectId}/env?teamId=${this.teamId}`
      : `/v9/projects/${projectId}/env`;
    return this.request(endpoint);
  }

  async createEnvironmentVariable(
    projectId: string,
    envVar: {
      key: string;
      value: string;
      type?: 'plain' | 'secret';
      target?: ('production' | 'preview' | 'development')[];
    }
  ): Promise<VercelEnvVar> {
    const endpoint = this.teamId
      ? `/v9/projects/${projectId}/env?teamId=${this.teamId}`
      : `/v9/projects/${projectId}/env`;

    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        key: envVar.key,
        value: envVar.value,
        type: envVar.type || 'plain',
        target: envVar.target || ['production', 'preview', 'development'],
      }),
    });
  }

  async updateEnvironmentVariable(
    projectId: string,
    envId: string,
    updates: {
      key?: string;
      value?: string;
      target?: ('production' | 'preview' | 'development')[];
    }
  ): Promise<VercelEnvVar> {
    const endpoint = this.teamId
      ? `/v9/projects/${projectId}/env/${envId}?teamId=${this.teamId}`
      : `/v9/projects/${projectId}/env/${envId}`;

    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteEnvironmentVariable(projectId: string, envId: string): Promise<void> {
    const endpoint = this.teamId
      ? `/v9/projects/${projectId}/env/${envId}?teamId=${this.teamId}`
      : `/v9/projects/${projectId}/env/${envId}`;

    await this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export default VercelAPIService;
