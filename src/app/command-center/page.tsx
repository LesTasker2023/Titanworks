import { Metadata } from 'next';
import CommandCenterClient from './CommandCenterClient';

export const metadata: Metadata = {
  title: 'Command Center | Intelligence Dashboard',
  description:
    'Comprehensive intelligence dashboard for codebase monitoring, quality assessment, and strategic insights. Real-time analytics for enterprise-grade development.',
  keywords: ['dashboard', 'analytics', 'code quality', 'intelligence', 'monitoring', 'metrics'],
  openGraph: {
    title: 'Command Center - Intelligence Dashboard',
    description:
      'Transform your repository data into actionable insights with advanced visualizations and strategic recommendations.',
    type: 'website',
  },
};

export default function CommandCenter() {
  // Emergency: Mock data to fix compilation
  const mockData = {
    metadata: {
      version: '1.0.0',
      scanTime: new Date().toISOString(),
      duration: 1000,
    },
    overview: {
      totalComponents: 0,
      completionRate: 0,
      qualityScore: 0,
      fileCount: 0,
    },
    dashboard: {
      overallScore: 0,
      recommendations: [],
    },
    systemHealth: {
      tests: {
        rawOutput: '',
        total: 0,
        passed: 0,
        failed: 0,
      },
    },
    bestPractices: {
      score: 0,
      issues: [],
    },
    components: {
      quality: {
        strengths: [],
      },
    },
    recommendations: [],
  };

  return <CommandCenterClient data={mockData} />;
}
