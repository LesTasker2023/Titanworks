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
  return <CommandCenterClient />;
}
