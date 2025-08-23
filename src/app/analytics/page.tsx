'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import {
  Award,
  BarChart3,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  Facebook,
  Globe,
  Heart,
  Instagram,
  Monitor,
  MoreHorizontal,
  Play,
  RefreshCw,
  Settings,
  Share2,
  Shield,
  Smartphone,
  Tablet,
  Target,
  TrendingDown,
  TrendingUp,
  Twitter,
  Upload,
  Users,
  Youtube,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface AnalyticsData {
  views: number;
  subscribers: number;
  videos: number;
  revenue: number;
  engagement: number;
  retention: number;
}

interface VideoPerformance {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  likes: string;
  comments: string;
  revenue: string;
  duration: string;
  uploadDate: string;
  trend: 'up' | 'down' | 'stable';
  category: string;
  engagement: number;
}

interface ChannelMetrics {
  subscriberGrowth: number;
  viewsGrowth: number;
  engagementRate: number;
  averageViewDuration: string;
  topCountries: Array<{ country: string; percentage: number; flag: string }>;
  deviceBreakdown: Array<{ device: string; percentage: number; icon: any }>;
  trafficSources: Array<{ source: string; percentage: number; color: string }>;
}

const MOCK_ANALYTICS: AnalyticsData = {
  views: 12847392,
  subscribers: 1250847,
  videos: 247,
  revenue: 45847.32,
  engagement: 8.4,
  retention: 67.2,
};

const TOP_VIDEOS: VideoPerformance[] = [
  {
    id: '1',
    title: 'Big Buck Bunny - Open Source Animation Masterpiece',
    thumbnail:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    views: '12.3M',
    likes: '89.2K',
    comments: '4.1K',
    revenue: '$8,247',
    duration: '9:56',
    uploadDate: '2024-01-15',
    trend: 'up',
    category: 'Animation',
    engagement: 92.4,
  },
  {
    id: '2',
    title: 'Sintel - The Ultimate Blender Short Film',
    thumbnail:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    views: '8.9M',
    likes: '67.8K',
    comments: '2.8K',
    revenue: '$6,124',
    duration: '14:48',
    uploadDate: '2024-02-20',
    trend: 'up',
    category: 'Animation',
    engagement: 88.7,
  },
  {
    id: '3',
    title: 'Elephant Dream - First Open Movie',
    thumbnail:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    views: '5.4M',
    likes: '42.1K',
    comments: '1.9K',
    revenue: '$3,892',
    duration: '10:53',
    uploadDate: '2024-03-10',
    trend: 'stable',
    category: 'Animation',
    engagement: 76.3,
  },
  {
    id: '4',
    title: 'Tears of Steel - Live Action VFX Breakdown',
    thumbnail:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
    views: '4.2M',
    likes: '38.9K',
    comments: '1.5K',
    revenue: '$2,947',
    duration: '12:14',
    uploadDate: '2024-04-05',
    trend: 'down',
    category: 'VFX',
    engagement: 82.1,
  },
];

const CHANNEL_METRICS: ChannelMetrics = {
  subscriberGrowth: 12.4,
  viewsGrowth: 8.7,
  engagementRate: 6.8,
  averageViewDuration: '6:24',
  topCountries: [
    { country: 'United States', percentage: 32.1, flag: '🇺🇸' },
    { country: 'United Kingdom', percentage: 18.7, flag: '🇬🇧' },
    { country: 'Germany', percentage: 14.3, flag: '🇩🇪' },
    { country: 'Canada', percentage: 11.2, flag: '🇨🇦' },
    { country: 'Australia', percentage: 8.9, flag: '🇦🇺' },
    { country: 'France', percentage: 6.8, flag: '🇫🇷' },
  ],
  deviceBreakdown: [
    { device: 'Mobile', percentage: 58.3, icon: Smartphone },
    { device: 'Desktop', percentage: 28.9, icon: Monitor },
    { device: 'Tablet', percentage: 12.8, icon: Tablet },
  ],
  trafficSources: [
    { source: 'YouTube Search', percentage: 34.2, color: '#FF0000' },
    { source: 'Suggested Videos', percentage: 28.7, color: '#FF4500' },
    { source: 'External', percentage: 18.9, color: '#1DA1F2' },
    { source: 'Direct', percentage: 12.4, color: '#25D366' },
    { source: 'Playlists', percentage: 5.8, color: '#8B5CF6' },
  ],
};

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  trend = 'up',
  prefix = '',
  suffix = '',
  onClick,
}: {
  title: string;
  value: string | number;
  change?: number;
  icon: any;
  trend?: 'up' | 'down' | 'stable';
  prefix?: string;
  suffix?: string;
  onClick?: () => void;
}) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <Card
      className={`hover:shadow-lg transition-all duration-300 ${onClick ? 'cursor-pointer hover:scale-105' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-content-secondary">{title}</CardTitle>
        <Icon className="h-4 w-4 text-content-secondary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-content-primary">
          {prefix}
          {formatValue(value)}
          {suffix}
        </div>
        {change !== undefined && (
          <div
            className={`text-xs flex items-center gap-1 mt-1 ${
              trend === 'up'
                ? 'text-green-600'
                : trend === 'down'
                  ? 'text-red-600'
                  : 'text-content-secondary'
            }`}
          >
            {trend === 'up' && <TrendingUp className="h-3 w-3" />}
            {trend === 'down' && <TrendingDown className="h-3 w-3" />}
            {trend === 'stable' && <div className="h-3 w-3 rounded-full bg-content-secondary" />}
            {change > 0 ? '+' : ''}
            {change}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function VideoPerformanceTable({
  videos,
  openModal,
}: {
  videos: VideoPerformance[];
  openModal: (modalType: string, data?: any) => void;
}) {
  const [sortBy, setSortBy] = useState<'views' | 'engagement' | 'revenue'>('views');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedVideos = [...videos].sort((a, b) => {
    let aVal, bVal;

    switch (sortBy) {
      case 'views':
        aVal = parseFloat(a.views.replace('M', '')) * (a.views.includes('M') ? 1000000 : 1000);
        bVal = parseFloat(b.views.replace('M', '')) * (b.views.includes('M') ? 1000000 : 1000);
        break;
      case 'engagement':
        aVal = a.engagement;
        bVal = b.engagement;
        break;
      case 'revenue':
        aVal = parseFloat(a.revenue.replace('$', '').replace(',', ''));
        bVal = parseFloat(b.revenue.replace('$', '').replace(',', ''));
        break;
      default:
        return 0;
    }

    return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
  });

  const handleSort = (column: 'views' | 'engagement' | 'revenue') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Top Performing Videos
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openModal('video-performance-export')}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openModal('video-detailed-analytics')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Detailed View
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Sort Controls */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={sortBy === 'views' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSort('views')}
              className="flex items-center gap-1"
            >
              Views{' '}
              {sortBy === 'views' &&
                (sortOrder === 'desc' ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronUp className="h-3 w-3" />
                ))}
            </Button>
            <Button
              variant={sortBy === 'engagement' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSort('engagement')}
              className="flex items-center gap-1"
            >
              Engagement{' '}
              {sortBy === 'engagement' &&
                (sortOrder === 'desc' ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronUp className="h-3 w-3" />
                ))}
            </Button>
            <Button
              variant={sortBy === 'revenue' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSort('revenue')}
              className="flex items-center gap-1"
            >
              Revenue{' '}
              {sortBy === 'revenue' &&
                (sortOrder === 'desc' ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronUp className="h-3 w-3" />
                ))}
            </Button>
          </div>

          {/* Video List */}
          <div className="space-y-3">
            {sortedVideos.map((video, index) => (
              <div
                key={video.id}
                className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-surface-secondary/30 transition-colors cursor-pointer group"
                onClick={() => openModal('video-detail', video)}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-bold">
                  {index + 1}
                </div>

                {/* Thumbnail */}
                <div className="relative">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={96}
                    height={56}
                    className="w-24 h-14 object-cover rounded-lg"
                    unoptimized
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-content-primary line-clamp-1 group-hover:text-primary transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-content-secondary mt-1">
                    <span>{video.uploadDate}</span>
                    <Badge variant="outline" className="text-xs">
                      {video.category}
                    </Badge>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-sm font-semibold text-content-primary">{video.views}</div>
                    <div className="text-xs text-content-secondary">Views</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-content-primary">
                      {video.engagement}%
                    </div>
                    <div className="text-xs text-content-secondary">Engagement</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-content-primary">
                      {video.revenue}
                    </div>
                    <div className="text-xs text-content-secondary">Revenue</div>
                  </div>
                  <div className="flex items-center justify-center">
                    {video.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                    {video.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                    {video.trend === 'stable' && (
                      <div className="h-4 w-4 rounded-full bg-content-secondary" />
                    )}
                  </div>
                </div>

                {/* Actions */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={e => {
                    e.stopPropagation();
                    openModal('video-actions', video);
                  }}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AudienceInsights({ metrics }: { metrics: ChannelMetrics }) {
  const [activeTab, setActiveTab] = useState<'demographics' | 'devices' | 'traffic'>(
    'demographics'
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Audience Insights
        </CardTitle>
        <div className="flex gap-1">
          <Button
            variant={activeTab === 'demographics' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('demographics')}
          >
            Demographics
          </Button>
          <Button
            variant={activeTab === 'devices' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('devices')}
          >
            Devices
          </Button>
          <Button
            variant={activeTab === 'traffic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('traffic')}
          >
            Traffic Sources
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === 'demographics' && (
          <div className="space-y-4">
            <h4 className="font-semibold">Top Countries</h4>
            {metrics.topCountries.map(country => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm font-medium">{country.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-surface-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${country.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-content-secondary w-12 text-right">
                    {country.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'devices' && (
          <div className="space-y-4">
            <h4 className="font-semibold">Device Breakdown</h4>
            {metrics.deviceBreakdown.map(device => {
              const IconComponent = device.icon;
              return (
                <div key={device.device} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4 text-content-secondary" />
                    <span className="text-sm font-medium">{device.device}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-surface-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-content-secondary w-12 text-right">
                      {device.percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'traffic' && (
          <div className="space-y-4">
            <h4 className="font-semibold">Traffic Sources</h4>
            {metrics.trafficSources.map(source => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-sm font-medium">{source.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-surface-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${source.percentage}%`,
                        backgroundColor: source.color,
                      }}
                    />
                  </div>
                  <span className="text-sm text-content-secondary w-12 text-right">
                    {source.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedMetrics, setSelectedMetrics] = useState(
    new Set(['views', 'subscribers', 'revenue'])
  );

  // Modal state
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  const openModal = (modalType: string, data?: any) => {
    setActiveModal(modalType);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
      openModal('refresh-success');
    }, 2000);
  };

  const handleExportAll = () => {
    openModal('export-all');
  };

  const handleOptimizationSuggestions = () => {
    openModal('ai-insights');
  };

  // Modal Content Components
  const renderModalContent = () => {
    switch (activeModal) {
      case 'views-analytics':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold text-content-primary">Peak Performance</h4>
                <p className="text-sm text-content-secondary mt-1">Daily peak: 2-4 PM</p>
                <p className="text-sm text-content-secondary">Best day: Tuesday</p>
                <p className="text-sm text-content-secondary">Top source: YouTube Search</p>
              </div>
              <div className="bg-surface-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold text-content-primary">Engagement Metrics</h4>
                <p className="text-sm text-content-secondary mt-1">Avg view duration: 6:24</p>
                <p className="text-sm text-content-secondary">Retention rate: 67.2%</p>
                <p className="text-sm text-content-secondary">Click-through: 12.1%</p>
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <h4 className="font-semibold text-content-primary mb-2">Recent Trends</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">This week</span>
                  <span className="text-sm text-green-600">+8.7% ↗</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Last 30 days</span>
                  <span className="text-sm text-green-600">+12.4% ↗</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Quarter growth</span>
                  <span className="text-sm text-green-600">+34.8% ↗</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'subscriber-analytics':
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
              <h4 className="font-semibold text-content-primary">Growth Analysis</h4>
              <p className="text-sm text-content-secondary mt-1">Daily average: +342 subscribers</p>
              <p className="text-sm text-content-secondary">Growth rate: +12.4% this month</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-content-primary">Demographics</h5>
                <p className="text-sm text-content-secondary">18-34 age group: 68%</p>
                <p className="text-sm text-content-secondary">Male: 64%, Female: 36%</p>
              </div>
              <div>
                <h5 className="font-medium text-content-primary">Retention</h5>
                <p className="text-sm text-content-secondary">Stay subscribed: 89.3%</p>
                <p className="text-sm text-content-secondary">Top source: Suggested videos</p>
              </div>
            </div>
          </div>
        );

      case 'revenue-analytics':
        return (
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Revenue Breakdown
              </h4>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Ad revenue</span>
                  <span className="font-medium">$32,847</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sponsorships</span>
                  <span className="font-medium">$8,500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Merchandise</span>
                  <span className="font-medium">$3,200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Memberships</span>
                  <span className="font-medium">$1,300</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-content-primary">Performance Metrics</h5>
              <p className="text-sm text-content-secondary">RPM: $3.57 per 1K views</p>
              <p className="text-sm text-content-secondary">CPM: $2.34 average</p>
              <p className="text-sm text-content-secondary">Revenue growth: +15.8%</p>
            </div>
          </div>
        );

      case 'ai-insights':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                <Target className="h-4 w-4" />
                AI Optimization Recommendations
              </h4>
            </div>
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-4">
                <h5 className="font-medium text-content-primary">Upload Timing</h5>
                <p className="text-sm text-content-secondary">
                  Upload on Tuesdays at 2 PM for 23% more views
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h5 className="font-medium text-content-primary">Title Optimization</h5>
                <p className="text-sm text-content-secondary">
                  Add &quot;Tutorial&quot; to titles for 15% higher CTR
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h5 className="font-medium text-content-primary">Video Length</h5>
                <p className="text-sm text-content-secondary">
                  Create 12-15 minute videos for optimal retention
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h5 className="font-medium text-content-primary">Trending Tags</h5>
                <p className="text-sm text-content-secondary">
                  Use hashtags: #blender #animation #tutorial
                </p>
              </div>
            </div>
          </div>
        );

      case 'export-all':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-content-primary">Export Complete Analytics</h4>
              <p className="text-sm text-content-secondary mt-1">Generate comprehensive reports</p>
            </div>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Channel Overview Report (PDF)
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Audience Demographics (Excel)
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <DollarSign className="h-4 w-4 mr-2" />
                Revenue Analysis (CSV)
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Growth Trends (JSON)
              </Button>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                📧 Reports will be emailed to your registered address within 5 minutes
              </p>
            </div>
          </div>
        );

      case 'content-analytics':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold text-content-primary">Content Overview</h4>
                <p className="text-sm text-content-secondary mt-1">247 published videos</p>
                <p className="text-sm text-content-secondary">Average length: 11:32</p>
                <p className="text-sm text-content-secondary">Upload frequency: 3x/week</p>
              </div>
              <div className="bg-surface-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold text-content-primary">Performance</h4>
                <p className="text-sm text-content-secondary mt-1">Top category: Animation (78%)</p>
                <p className="text-sm text-content-secondary">Best type: Tutorials</p>
                <p className="text-sm text-content-secondary">Avg views per video: 52K</p>
              </div>
            </div>
          </div>
        );

      case 'engagement-analytics':
        return (
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-semibold text-red-800 dark:text-red-200">Engagement Breakdown</h4>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Like rate</span>
                  <span className="font-medium">8.4%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Comment rate</span>
                  <span className="font-medium">1.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Share rate</span>
                  <span className="font-medium">0.8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Click-through rate</span>
                  <span className="font-medium">12.1%</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-content-primary">Insights</h5>
              <p className="text-sm text-content-secondary">Most engaging: Tutorial videos</p>
              <p className="text-sm text-content-secondary">Peak engagement: First 2 minutes</p>
            </div>
          </div>
        );

      case 'watch-time-analytics':
        return (
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                Watch Time Metrics
              </h4>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Average watch time</span>
                  <span className="font-medium">6:24 minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total watch hours</span>
                  <span className="font-medium">2.1M hours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Session duration</span>
                  <span className="font-medium">24:17 average</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="font-medium text-content-primary">Retention Analysis</h5>
              <p className="text-sm text-content-secondary">Best retention: First 30 seconds</p>
              <p className="text-sm text-content-secondary">Major drop-off: 8:30 mark</p>
              <p className="text-sm text-content-secondary">Completion rate: 67.2%</p>
            </div>
          </div>
        );

      case 'video-performance-export':
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
              <Download className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-content-primary">
                Exporting Video Performance Data
              </h4>
              <p className="text-sm text-content-secondary mt-1">
                Generating comprehensive video analytics report
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                📊 Export includes: Views, engagement rates, revenue data, audience retention, and
                performance trends
              </p>
            </div>
          </div>
        );

      case 'video-detailed-analytics':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-content-primary">Opening Detailed Analytics</h4>
              <p className="text-sm text-content-secondary mt-1">
                Advanced video performance dashboard
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col">
                <Eye className="h-4 w-4 mb-1" />
                <span className="text-xs">View Analytics</span>
              </Button>
              <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col">
                <Users className="h-4 w-4 mb-1" />
                <span className="text-xs">Audience</span>
              </Button>
              <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col">
                <TrendingUp className="h-4 w-4 mb-1" />
                <span className="text-xs">Growth</span>
              </Button>
              <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col">
                <DollarSign className="h-4 w-4 mb-1" />
                <span className="text-xs">Revenue</span>
              </Button>
            </div>
          </div>
        );

      case 'social-twitter':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter Analytics
              </h4>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Followers</span>
                  <span className="font-medium">847K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Monthly impressions</span>
                  <span className="font-medium">2.3M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Engagement rate</span>
                  <span className="font-medium">4.8%</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-content-primary">Optimization Tips</h5>
              <p className="text-sm text-content-secondary">Best posting time: 3 PM</p>
              <p className="text-sm text-content-secondary">Top hashtags: #animation #blender</p>
            </div>
          </div>
        );

      case 'social-facebook':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                Facebook Analytics
              </h4>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Page likes</span>
                  <span className="font-medium">1.1M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Monthly reach</span>
                  <span className="font-medium">892K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Video views</span>
                  <span className="font-medium">2.8M</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-content-primary">Content Performance</h5>
              <p className="text-sm text-content-secondary">Engagement rate: 6.2%</p>
              <p className="text-sm text-content-secondary">Top content: Behind-the-scenes</p>
            </div>
          </div>
        );

      case 'video-detail':
        return (
          <div className="space-y-4">
            {modalData && (
              <>
                <div className="flex items-center gap-4">
                  <Image
                    src={modalData.thumbnail}
                    alt={modalData.title}
                    width={120}
                    height={68}
                    className="w-30 h-17 object-cover rounded-lg"
                    unoptimized
                  />
                  <div>
                    <h4 className="font-semibold text-content-primary">{modalData.title}</h4>
                    <p className="text-sm text-content-secondary">
                      Uploaded: {modalData.uploadDate}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {modalData.category}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-surface-secondary/30 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-content-primary">{modalData.views}</div>
                    <div className="text-xs text-content-secondary">Views</div>
                  </div>
                  <div className="bg-surface-secondary/30 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-content-primary">{modalData.likes}</div>
                    <div className="text-xs text-content-secondary">Likes</div>
                  </div>
                  <div className="bg-surface-secondary/30 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-content-primary">
                      {modalData.engagement}%
                    </div>
                    <div className="text-xs text-content-secondary">Engagement</div>
                  </div>
                  <div className="bg-surface-secondary/30 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-content-primary">
                      {modalData.revenue}
                    </div>
                    <div className="text-xs text-content-secondary">Revenue</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-content-primary">Quick Actions</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      Edit Video
                    </Button>
                    <Button variant="outline" size="sm">
                      View Analytics
                    </Button>
                    <Button variant="outline" size="sm">
                      Promote Video
                    </Button>
                    <Button variant="outline" size="sm">
                      Share Insights
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 'video-actions':
        return (
          <div className="space-y-4">
            {modalData && (
              <>
                <div className="text-center">
                  <h4 className="font-semibold text-content-primary">
                    Actions for &quot;{modalData.title}&quot;
                  </h4>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Video Details
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Promote Video
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Insights
                  </Button>
                </div>
              </>
            )}
          </div>
        );

      case 'social-instagram':
        return (
          <div className="space-y-4">
            <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
              <h4 className="font-semibold text-pink-800 dark:text-pink-200 flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                Instagram Analytics
              </h4>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Followers</span>
                  <span className="font-medium">623K</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Monthly reach</span>
                  <span className="font-medium">1.8M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Story views</span>
                  <span className="font-medium">450K avg</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-content-primary">Performance Highlights</h5>
              <p className="text-sm text-content-secondary">Engagement rate: 11.4%</p>
              <p className="text-sm text-content-secondary">Reels performance: +387%</p>
            </div>
          </div>
        );

      case 'upload-video':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-content-primary">Upload New Video</h4>
              <p className="text-sm text-content-secondary mt-1">Create and publish content</p>
            </div>
            <div className="space-y-3">
              <div className="border-2 border-dashed border-border p-6 rounded-lg text-center">
                <p className="text-sm text-content-secondary">Drag & drop video files here</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Browse Files
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  Batch Upload
                </Button>
                <Button variant="outline" size="sm">
                  Auto Thumbnails
                </Button>
                <Button variant="outline" size="sm">
                  SEO Tools
                </Button>
                <Button variant="outline" size="sm">
                  Schedule
                </Button>
              </div>
            </div>
          </div>
        );

      case 'generate-report':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-content-primary">Generate Custom Report</h4>
              <p className="text-sm text-content-secondary mt-1">Advanced analytics reports</p>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Custom Date Ranges
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Advanced Metrics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Competitor Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                PDF/Excel Export
              </Button>
            </div>
          </div>
        );

      case 'ab-test':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-content-primary">A/B Test Content</h4>
              <p className="text-sm text-content-secondary mt-1">Optimize performance</p>
            </div>
            <div className="space-y-3">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <h5 className="font-medium text-orange-800 dark:text-orange-200">Test Options</h5>
                <div className="mt-2 space-y-1 text-sm">
                  <p>• Test thumbnails for higher CTR</p>
                  <p>• Compare titles effectiveness</p>
                  <p>• Optimize descriptions</p>
                  <p>• Experiment with tags</p>
                </div>
              </div>
              <Button className="w-full">Start New A/B Test</Button>
            </div>
          </div>
        );

      case 'collaboration':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-content-primary">Collaboration Tools</h4>
              <p className="text-sm text-content-secondary mt-1">Partner with creators</p>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Find Creators in Your Niche
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Brand Partnerships
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="h-4 w-4 mr-2" />
                Cross-Promotion
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="h-4 w-4 mr-2" />
                Community Challenges
              </Button>
            </div>
          </div>
        );

      case 'monetization':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-content-primary">Monetization Center</h4>
              <p className="text-sm text-content-secondary mt-1">Maximize revenue</p>
            </div>
            <div className="space-y-3">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h5 className="font-medium text-green-800 dark:text-green-200">Revenue Streams</h5>
                <div className="mt-2 space-y-1 text-sm">
                  <p>• Ad revenue optimization</p>
                  <p>• Sponsorship opportunities</p>
                  <p>• Merchandise integration</p>
                  <p>• Channel memberships</p>
                </div>
              </div>
              <Button className="w-full">Optimize Revenue</Button>
            </div>
          </div>
        );

      case 'channel-settings':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-gray-600" />
              </div>
              <h4 className="font-semibold text-content-primary">Channel Settings</h4>
              <p className="text-sm text-content-secondary mt-1">Customize your channel</p>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Branding & Customization
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Upload Defaults
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Zap className="h-4 w-4 mr-2" />
                API Integrations
              </Button>
            </div>
          </div>
        );

      case 'time-range-changed':
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-content-primary">Time Range Updated</h4>
              {modalData && (
                <p className="text-sm text-content-secondary mt-1">
                  Switched to {modalData.range} time range
                </p>
              )}
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                📊 All analytics data has been updated to reflect the new time period
              </p>
            </div>
          </div>
        );

      case 'refresh-success':
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-content-primary">Data Refreshed Successfully!</h4>
              <p className="text-sm text-content-secondary mt-1">
                Latest data pulled from YouTube API v3
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                🔄 Next auto-refresh: {new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString()}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (activeModal) {
      case 'views-analytics':
        return '👁️ Views Analytics Deep Dive';
      case 'subscriber-analytics':
        return '👥 Subscriber Growth Analysis';
      case 'content-analytics':
        return '🎬 Content Performance';
      case 'revenue-analytics':
        return '💰 Revenue Breakdown';
      case 'engagement-analytics':
        return '❤️ Engagement Analysis';
      case 'watch-time-analytics':
        return '⏱️ Watch Time Insights';
      case 'ai-insights':
        return '🎯 AI-Powered Insights';
      case 'export-all':
        return '📊 Export Analytics';
      case 'refresh-success':
        return '✅ Data Refresh Complete';
      case 'video-performance-export':
        return '📊 Export Video Data';
      case 'video-detailed-analytics':
        return '📈 Detailed Video Analytics';
      case 'video-detail':
        return '🎬 Video Details';
      case 'video-actions':
        return '⚙️ Video Actions';
      case 'social-twitter':
        return '🐦 Twitter Analytics';
      case 'social-facebook':
        return '📘 Facebook Analytics';
      case 'social-instagram':
        return '📸 Instagram Analytics';
      case 'upload-video':
        return '🎬 Upload New Video';
      case 'generate-report':
        return '📊 Generate Report';
      case 'ab-test':
        return '🎯 A/B Test Content';
      case 'collaboration':
        return '🤝 Collaboration Tools';
      case 'monetization':
        return '💰 Monetization Center';
      case 'channel-settings':
        return '⚙️ Channel Settings';
      case 'time-range-changed':
        return '📅 Time Range Updated';
      default:
        return 'Analytics Details';
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-content-primary flex items-center gap-3">
              <BarChart3 className="h-8 w-8" />
              Creator Analytics Dashboard
            </h1>
            <p className="text-content-secondary mt-2">
              Comprehensive insights into your content performance and audience engagement
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm text-content-secondary">
              <span>📈 Last updated: {lastUpdated.toLocaleTimeString()}</span>
              <span>🎯 Next report: Tomorrow 9:00 AM</span>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                <CheckCircle className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={timeRange}
              onChange={e => {
                setTimeRange(e.target.value);
                openModal('time-range-changed', { range: e.target.value });
              }}
              className="bg-surface-primary border border-border rounded-lg px-3 py-2 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>

            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </Button>

            <Button variant="outline" size="sm" onClick={handleExportAll}>
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>

            <Button size="sm" onClick={handleOptimizationSuggestions}>
              <Target className="h-4 w-4 mr-2" />
              AI Insights
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Views"
          value={MOCK_ANALYTICS.views}
          change={8.7}
          icon={Eye}
          trend="up"
          onClick={() => openModal('views-analytics')}
        />
        <StatCard
          title="Subscribers"
          value={MOCK_ANALYTICS.subscribers}
          change={12.4}
          icon={Users}
          trend="up"
          onClick={() => openModal('subscriber-analytics')}
        />
        <StatCard
          title="Total Videos"
          value={MOCK_ANALYTICS.videos}
          change={5.2}
          icon={Play}
          trend="up"
          onClick={() => openModal('content-analytics')}
        />
        <StatCard
          title="Revenue"
          value={MOCK_ANALYTICS.revenue}
          change={15.8}
          icon={DollarSign}
          prefix="$"
          trend="up"
          onClick={() => openModal('revenue-analytics')}
        />
        <StatCard
          title="Engagement Rate"
          value={MOCK_ANALYTICS.engagement}
          change={-2.1}
          icon={Heart}
          suffix="%"
          trend="down"
          onClick={() => openModal('engagement-analytics')}
        />
        <StatCard
          title="Avg Watch Time"
          value="6:24"
          change={3.2}
          icon={Clock}
          trend="up"
          onClick={() => openModal('watch-time-analytics')}
        />
      </div>

      {/* Charts and Performance */}
      <div className="grid lg:grid-cols-2 gap-6">
        <VideoPerformanceTable videos={TOP_VIDEOS} openModal={openModal} />
        <AudienceInsights metrics={CHANNEL_METRICS} />
      </div>

      {/* Action Center */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2"
              onClick={() => openModal('upload-video')}
            >
              <Upload className="h-5 w-5" />
              <div>
                <div className="font-semibold">Upload New Video</div>
                <div className="text-xs text-content-secondary">Create and publish content</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2"
              onClick={() => openModal('generate-report')}
            >
              <BarChart3 className="h-5 w-5" />
              <div>
                <div className="font-semibold">Generate Report</div>
                <div className="text-xs text-content-secondary">Custom analytics reports</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2"
              onClick={() => openModal('ab-test')}
            >
              <Target className="h-5 w-5" />
              <div>
                <div className="font-semibold">A/B Test Content</div>
                <div className="text-xs text-content-secondary">Optimize performance</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2"
              onClick={() => openModal('collaboration')}
            >
              <Users className="h-5 w-5" />
              <div>
                <div className="font-semibold">Collaborate</div>
                <div className="text-xs text-content-secondary">Partner with creators</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2"
              onClick={() => openModal('monetization')}
            >
              <DollarSign className="h-5 w-5" />
              <div>
                <div className="font-semibold">Monetization</div>
                <div className="text-xs text-content-secondary">Maximize revenue</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2"
              onClick={() => openModal('channel-settings')}
            >
              <Settings className="h-5 w-5" />
              <div>
                <div className="font-semibold">Channel Settings</div>
                <div className="text-xs text-content-secondary">Customize your channel</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Cross-Platform Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
              <Youtube className="h-8 w-8 text-red-600" />
              <div>
                <div className="font-semibold">YouTube</div>
                <div className="text-sm text-content-secondary">1.25M subscribers</div>
                <div className="text-xs text-green-600">+12.4% this month</div>
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-surface-secondary/30 transition-colors cursor-pointer"
              onClick={() => openModal('social-twitter')}
            >
              <Twitter className="h-8 w-8 text-blue-500" />
              <div>
                <div className="font-semibold">Twitter</div>
                <div className="text-sm text-content-secondary">847K followers</div>
                <div className="text-xs text-green-600">+8.7% this month</div>
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-surface-secondary/30 transition-colors cursor-pointer"
              onClick={() => openModal('social-facebook')}
            >
              <Facebook className="h-8 w-8 text-blue-700" />
              <div>
                <div className="font-semibold">Facebook</div>
                <div className="text-sm text-content-secondary">1.1M page likes</div>
                <div className="text-xs text-green-600">+5.3% this month</div>
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-surface-secondary/30 transition-colors cursor-pointer"
              onClick={() => openModal('social-instagram')}
            >
              <Instagram className="h-8 w-8 text-pink-600" />
              <div>
                <div className="font-semibold">Instagram</div>
                <div className="text-sm text-content-secondary">623K followers</div>
                <div className="text-xs text-green-600">+18.9% this month</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal isOpen={activeModal !== null} onClose={closeModal} size="lg">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-content-primary">{getModalTitle()}</h3>
          {renderModalContent()}
        </div>
      </Modal>
    </div>
  );
}
