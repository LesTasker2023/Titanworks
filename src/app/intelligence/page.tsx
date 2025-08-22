import { Metadata } from 'next';
import IntelligenceDashboard from './IntelligenceDashboard';

export const metadata: Metadata = {
  title: 'Intelligence Dashboard | Repository Analytics',
  description:
    'Comprehensive repository intelligence dashboard with real-time analytics, component quality metrics, and actionable insights for development teams.',
  keywords: ['intelligence', 'analytics', 'repository', 'dashboard', 'metrics', 'quality'],
  openGraph: {
    title: 'Intelligence Dashboard - Repository Analytics',
    description:
      'Real-time repository intelligence with component analysis, build pipeline status, and quality metrics.',
    type: 'website',
  },
};

export default function IntelligencePage() {
  return <IntelligenceDashboard />;
}
