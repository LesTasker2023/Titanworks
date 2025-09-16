import { useState, useEffect } from 'react';
import { VercelProject, VercelEnvVar, VercelTeam } from '@/services/vercelAPI';

interface UseVercelResult {
  teams: VercelTeam[] | null;
  projects: VercelProject[] | null;
  envVars: VercelEnvVar[] | null;
  loading: boolean;
  error: string | null;
  getTeams: () => Promise<void>;
  getProjects: () => Promise<void>;
  getProject: (projectId: string) => Promise<VercelProject | null>;
  getEnvironmentVariables: (projectId: string) => Promise<void>;
  createEnvironmentVariable: (
    projectId: string,
    envVar: {
      key: string;
      value: string;
      type?: 'plain' | 'secret';
      target?: ('production' | 'preview' | 'development')[];
    }
  ) => Promise<VercelEnvVar | null>;
}

export const useVercel = (): UseVercelResult => {
  const [teams, setTeams] = useState<VercelTeam[] | null>(null);
  const [projects, setProjects] = useState<VercelProject[] | null>(null);
  const [envVars, setEnvVars] = useState<VercelEnvVar[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiCall = async (url: string, options: RequestInit = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getTeams = async () => {
    try {
      const data = await apiCall('/api/vercel?action=teams');
      setTeams(data.teams);
    } catch (err) {
      console.error('Failed to fetch teams:', err);
    }
  };

  const getProjects = async () => {
    try {
      const data = await apiCall('/api/vercel?action=projects');
      setProjects(data.projects);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  const getProject = async (projectId: string): Promise<VercelProject | null> => {
    try {
      const data = await apiCall(`/api/vercel?action=project&projectId=${projectId}`);
      return data;
    } catch (err) {
      console.error('Failed to fetch project:', err);
      return null;
    }
  };

  const getEnvironmentVariables = async (projectId: string) => {
    try {
      const data = await apiCall(`/api/vercel?action=env&projectId=${projectId}`);
      setEnvVars(data.envs);
    } catch (err) {
      console.error('Failed to fetch environment variables:', err);
    }
  };

  const createEnvironmentVariable = async (
    projectId: string,
    envVar: {
      key: string;
      value: string;
      type?: 'plain' | 'secret';
      target?: ('production' | 'preview' | 'development')[];
    }
  ): Promise<VercelEnvVar | null> => {
    try {
      const data = await apiCall(`/api/vercel?action=env&projectId=${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(envVar),
      });
      
      // Refresh environment variables after creating one
      await getEnvironmentVariables(projectId);
      return data;
    } catch (err) {
      console.error('Failed to create environment variable:', err);
      return null;
    }
  };

  return {
    teams,
    projects,
    envVars,
    loading,
    error,
    getTeams,
    getProjects,
    getProject,
    getEnvironmentVariables,
    createEnvironmentVariable,
  };
};