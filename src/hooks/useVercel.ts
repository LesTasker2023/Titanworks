/**
 * Vercel Integration React Hooks
 * Custom hooks for managing Vercel deployment data in React components
 */

import { VercelDeployment, VercelIntegrationData } from '@/types/vercel';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseVercelIntegrationOptions {
  projectId?: string;
  apiToken?: string;
  teamId?: string;
  refreshInterval?: number; // in milliseconds
  enabled?: boolean;
}

interface UseVercelIntegrationResult {
  data: VercelIntegrationData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

/**
 * Hook for fetching Vercel integration data
 */
export function useVercelIntegration({
  projectId,
  apiToken,
  teamId,
  refreshInterval = 60000, // 1 minute default
  enabled = true,
}: UseVercelIntegrationOptions): UseVercelIntegrationResult {
  const [data, setData] = useState<VercelIntegrationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build query parameters only if credentials are provided
      // Otherwise, let the API use environment variables
      const params = new URLSearchParams();
      if (projectId) params.append('projectId', projectId);
      if (apiToken) params.append('apiToken', apiToken);
      if (teamId) params.append('teamId', teamId);

      const queryString = params.toString();
      const url = queryString ? `/api/vercel?${queryString}` : '/api/vercel';

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: `HTTP ${response.status}`,
          details: response.statusText,
        }));

        throw new Error(errorData.details || errorData.error || 'Failed to fetch Vercel data');
      }

      const integrationData = await response.json();
      setData(integrationData);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [projectId, apiToken, teamId, enabled]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set up polling
  useEffect(() => {
    if (!enabled || !refreshInterval) {
      return;
    }

    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval, enabled]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    lastUpdated,
  };
}

interface UseVercelDeploymentStatusOptions {
  deployments: VercelDeployment[];
}

interface UseVercelDeploymentStatusResult {
  activeDeployments: number;
  successRate: number;
  averageBuildTime: number;
  lastDeploymentStatus: VercelDeployment['state'] | null;
  deploymentsToday: number;
  deploymentTrend: 'up' | 'down' | 'stable';
}

/**
 * Hook for computing deployment statistics
 */
export function useVercelDeploymentStatus({
  deployments,
}: UseVercelDeploymentStatusOptions): UseVercelDeploymentStatusResult {
  const stats = useMemo(() => {
    if (!deployments.length) {
      return {
        activeDeployments: 0,
        successRate: 0,
        averageBuildTime: 0,
        lastDeploymentStatus: null,
        deploymentsToday: 0,
        deploymentTrend: 'stable' as const,
      };
    }

    // Active deployments - check multiple states including current builds
    const activeStates = ['BUILDING', 'QUEUED', 'INITIALIZING', 'DEPLOYING'];
    const activeDeployments = deployments.filter(
      d => activeStates.includes(d.state) || (d.buildingAt && !d.ready)
    ).length;

    // Success rate (last 50 deployments for better accuracy)
    const recentDeployments = deployments.slice(0, 50);
    const completedDeployments = recentDeployments.filter(d =>
      ['READY', 'ERROR', 'CANCELED'].includes(d.state)
    );
    const successfulDeployments = completedDeployments.filter(d => d.state === 'READY').length;
    const successRate =
      completedDeployments.length > 0
        ? (successfulDeployments / completedDeployments.length) * 100
        : 0;

    // Average build time
    const buildTimes = deployments
      .filter(d => d.buildingAt && d.ready)
      .map(d => d.ready! - d.buildingAt!)
      .filter(time => time > 0);

    const averageBuildTime =
      buildTimes.length > 0 ? buildTimes.reduce((a, b) => a + b, 0) / buildTimes.length : 0;

    // Last deployment status
    const lastDeploymentStatus = deployments[0]?.state || null;

    // Deployments today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    const deploymentsToday = deployments.filter(d => d.created >= todayTimestamp).length;

    // Deployment trend (compare today vs yesterday)
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayTimestamp = yesterday.getTime();

    const deploymentsYesterday = deployments.filter(
      d => d.created >= yesterdayTimestamp && d.created < todayTimestamp
    ).length;

    let deploymentTrend: 'up' | 'down' | 'stable' = 'stable';
    if (deploymentsToday > deploymentsYesterday) {
      deploymentTrend = 'up';
    } else if (deploymentsToday < deploymentsYesterday) {
      deploymentTrend = 'down';
    }

    return {
      activeDeployments,
      successRate: Math.round(successRate),
      averageBuildTime: Math.round(averageBuildTime / 1000), // Convert to seconds
      lastDeploymentStatus,
      deploymentsToday,
      deploymentTrend,
    };
  }, [deployments]);

  return stats;
}

interface UseVercelConfigurationOptions {
  onSave?: (config: VercelConfiguration) => void;
}

interface VercelConfiguration {
  projectId: string;
  apiToken: string;
  teamId?: string;
}

interface UseVercelConfigurationResult {
  configuration: VercelConfiguration | null;
  saving: boolean;
  saveError: string | null;
  testConnection: (config: VercelConfiguration) => Promise<boolean>;
  saveConfiguration: (config: VercelConfiguration) => Promise<void>;
  clearConfiguration: () => void;
}

/**
 * Hook for managing Vercel configuration
 */
export function useVercelConfiguration({
  onSave,
}: UseVercelConfigurationOptions = {}): UseVercelConfigurationResult {
  const [configuration, setConfiguration] = useState<VercelConfiguration | null>(() => {
    // Try to load from localStorage
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('vercel-configuration');
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const testConnection = useCallback(async (config: VercelConfiguration): Promise<boolean> => {
    try {
      const response = await fetch('/api/vercel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      return response.ok;
    } catch {
      return false;
    }
  }, []);

  const saveConfiguration = useCallback(
    async (config: VercelConfiguration) => {
      setSaving(true);
      setSaveError(null);

      try {
        // Test the configuration first
        const isValid = await testConnection(config);

        if (!isValid) {
          throw new Error('Invalid configuration - connection test failed');
        }

        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('vercel-configuration', JSON.stringify(config));
        }

        setConfiguration(config);
        onSave?.(config);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to save configuration';
        setSaveError(errorMessage);
        throw error;
      } finally {
        setSaving(false);
      }
    },
    [testConnection, onSave]
  );

  const clearConfiguration = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vercel-configuration');
    }
    setConfiguration(null);
    setSaveError(null);
  }, []);

  return {
    configuration,
    saving,
    saveError,
    testConnection,
    saveConfiguration,
    clearConfiguration,
  };
}

// Helper function to format deployment duration
export function formatDeploymentDuration(startTime: number, endTime?: number): string {
  const duration = (endTime || Date.now()) - startTime;
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);

  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

// Helper function to get deployment status color
export function getDeploymentStatusColor(state: VercelDeployment['state']): string {
  switch (state) {
    case 'READY':
      return 'green';
    case 'BUILDING':
    case 'INITIALIZING':
    case 'QUEUED':
      return 'yellow';
    case 'ERROR':
      return 'red';
    case 'CANCELED':
      return 'gray';
    default:
      return 'gray';
  }
}
