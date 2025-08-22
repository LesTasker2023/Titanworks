/**
 * Vercel API Integration Types
 * Comprehensive TypeScript interfaces for Vercel deployment data
 */

export interface VercelDeployment {
  uid: string;
  name: string;
  url: string;
  created: number;
  source: 'git' | 'cli' | 'import' | 'clone';
  state: 'BUILDING' | 'ERROR' | 'INITIALIZING' | 'QUEUED' | 'READY' | 'CANCELED';
  type: 'LAMBDAS';
  target: 'production' | 'staging' | null;
  projectId: string;
  inspectorUrl: string | null;
  meta: {
    githubCommitSha?: string;
    githubCommitMessage?: string;
    githubCommitAuthorName?: string;
    githubCommitRef?: string;
    githubOrg?: string;
    githubRepo?: string;
  };
  creator: {
    uid: string;
    username: string;
    email?: string;
  };
  regions: string[];
  buildingAt?: number;
  ready?: number;
  checksState?: 'registered' | 'running' | 'completed';
  checksConclusion?: 'succeeded' | 'failed' | 'skipped' | 'canceled';
  readyState: 'BUILDING' | 'ERROR' | 'INITIALIZING' | 'QUEUED' | 'READY' | 'CANCELED';
  readySubstate?: 'STAGED' | 'PROMOTED';
}

export interface VercelProject {
  id: string;
  name: string;
  accountId: string;
  createdAt: number;
  updatedAt: number;
  framework: string | null;
  devCommand: string | null;
  buildCommand: string | null;
  outputDirectory: string | null;
  rootDirectory: string | null;
  directoryListing: boolean;
  nodeVersion: string;
  regions: string[];
  publicSource: boolean | null;
  gitRepository?: {
    type: 'github' | 'gitlab' | 'bitbucket';
    repo: string;
  };
  env: Array<{
    key: string;
    value: string;
    type: 'secret' | 'system' | 'encrypted' | 'plain';
    target: Array<'production' | 'preview' | 'development'>;
  }>;
  link?: {
    type: 'github';
    repo: string;
    repoId: number;
    org?: string;
    gitCredentialId?: string;
    sourceless?: boolean;
    createdAt?: number;
    updatedAt?: number;
  };
}

export interface VercelAnalytics {
  series: {
    timestamp: number;
    value: number;
  }[];
  total: number;
}

export interface VercelProjectStats {
  deployments: {
    total: number;
    ready: number;
    error: number;
    building: number;
  };
  analytics: {
    pageViews: VercelAnalytics;
    visitors: VercelAnalytics;
    topPages: Array<{
      page: string;
      visits: number;
    }>;
  };
  performance: {
    p95: number; // 95th percentile response time
    p99: number; // 99th percentile response time
    avgResponseTime: number;
  };
}

export interface VercelIntegrationData {
  project: VercelProject;
  deployments: VercelDeployment[];
  latestDeployment: VercelDeployment | null;
  productionDeployment: VercelDeployment | null;
  stats: VercelProjectStats;
  buildTimes: {
    latest: number | null;
    average: number;
    fastest: number;
    slowest: number;
  };
  healthScore: number; // 0-100 based on deployment success rate and performance
}

export interface VercelAPIError {
  error: {
    code: string;
    message: string;
  };
}

// Type guards
export function isVercelDeployment(obj: any): obj is VercelDeployment {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.uid === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.state === 'string' &&
    typeof obj.created === 'number'
  );
}

export function isVercelProject(obj: any): obj is VercelProject {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.accountId === 'string'
  );
}

export function isVercelAPIError(obj: any): obj is VercelAPIError {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.error === 'object' &&
    typeof obj.error.code === 'string' &&
    typeof obj.error.message === 'string'
  );
}

// Deployment state helpers
export const DEPLOYMENT_STATE_COLORS = {
  READY: 'green',
  BUILDING: 'yellow',
  ERROR: 'red',
  QUEUED: 'blue',
  INITIALIZING: 'blue',
  CANCELED: 'gray',
} as const;

export const DEPLOYMENT_STATE_LABELS = {
  READY: 'Ready',
  BUILDING: 'Building',
  ERROR: 'Failed',
  QUEUED: 'Queued',
  INITIALIZING: 'Initializing',
  CANCELED: 'Canceled',
} as const;

export type DeploymentStateColor =
  (typeof DEPLOYMENT_STATE_COLORS)[keyof typeof DEPLOYMENT_STATE_COLORS];
export type DeploymentStateLabel =
  (typeof DEPLOYMENT_STATE_LABELS)[keyof typeof DEPLOYMENT_STATE_LABELS];
