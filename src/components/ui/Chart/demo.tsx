'use client';

import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';

// Business analytics data
const salesData = [
  { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
  { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
  { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
  { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
  { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
  { month: 'Jun', revenue: 67000, expenses: 41000, profit: 26000 },
];

const userGrowthData = [
  { date: '2024-01', users: 1200, newUsers: 150, churned: 45 },
  { date: '2024-02', users: 1305, newUsers: 180, churned: 75 },
  { date: '2024-03', users: 1410, newUsers: 165, churned: 60 },
  { date: '2024-04', users: 1515, newUsers: 195, churned: 90 },
  { date: '2024-05', users: 1620, newUsers: 210, churned: 105 },
  { date: '2024-06', users: 1725, newUsers: 185, churned: 80 },
];

const trafficSourcesData = [
  { name: 'Organic Search', value: 45, color: '#0088FE' },
  { name: 'Direct', value: 25, color: '#00C49F' },
  { name: 'Social Media', value: 15, color: '#FFBB28' },
  { name: 'Paid Ads', value: 10, color: '#FF8042' },
  { name: 'Referrals', value: 5, color: '#8884D8' },
];

const performanceData = [
  { week: 'W1', pageLoad: 2.1, apiResponse: 0.8, uptime: 99.9 },
  { week: 'W2', pageLoad: 1.9, apiResponse: 0.7, uptime: 99.8 },
  { week: 'W3', pageLoad: 2.3, apiResponse: 0.9, uptime: 99.7 },
  { week: 'W4', pageLoad: 1.8, apiResponse: 0.6, uptime: 99.9 },
];

export default function ChartDemo() {
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'users' | 'performance'>(
    'revenue'
  );

  const salesConfig = {
    revenue: { label: 'Revenue', color: '#3b82f6' },
    expenses: { label: 'Expenses', color: '#ef4444' },
    profit: { label: 'Profit', color: '#10b981' },
  };

  const userConfig = {
    users: { label: 'Total Users', color: '#8b5cf6' },
    newUsers: { label: 'New Users', color: '#06d6a0' },
    churned: { label: 'Churned', color: '#f72585' },
  };

  const trafficConfig = {
    traffic: { label: 'Traffic Sources', color: '#0088FE' },
  };

  const performanceConfig = {
    pageLoad: { label: 'Page Load (s)', color: '#ff6b6b' },
    apiResponse: { label: 'API Response (s)', color: '#4ecdc4' },
    uptime: { label: 'Uptime (%)', color: '#45b7d1' },
  };

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Chart Component</h1>
        <p className="text-muted-foreground">
          Enterprise-grade data visualization charts with Recharts integration
        </p>
      </div>

      {/* Basic Usage */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <p className="text-sm text-muted-foreground">
            Simple bar chart showing monthly sales data
          </p>

          <ChartContainer config={salesConfig} className="h-[300px]">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" />
            </BarChart>
          </ChartContainer>
        </div>
      </Card>

      {/* Advanced Dashboard */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Business Intelligence Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Interactive charts for real-time business analytics
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedMetric === 'revenue' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMetric('revenue')}
              >
                Revenue
              </Button>
              <Button
                variant={selectedMetric === 'users' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMetric('users')}
              >
                Users
              </Button>
              <Button
                variant={selectedMetric === 'performance' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMetric('performance')}
              >
                Performance
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Primary Chart */}
            <div className="space-y-2">
              {selectedMetric === 'revenue' && (
                <>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Revenue vs Expenses</h4>
                    <Badge variant="outline">6M Trend</Badge>
                  </div>
                  <ChartContainer config={salesConfig} className="h-[300px]">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="var(--color-expenses)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="var(--color-profit)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ChartContainer>
                </>
              )}

              {selectedMetric === 'users' && (
                <>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">User Growth Analysis</h4>
                    <Badge variant="outline">YTD</Badge>
                  </div>
                  <ChartContainer config={userConfig} className="h-[300px]">
                    <AreaChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stackId="1"
                        stroke="var(--color-users)"
                        fill="var(--color-users)"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="newUsers"
                        stackId="2"
                        stroke="var(--color-newUsers)"
                        fill="var(--color-newUsers)"
                        fillOpacity={0.8}
                      />
                    </AreaChart>
                  </ChartContainer>
                </>
              )}

              {selectedMetric === 'performance' && (
                <>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">System Performance Metrics</h4>
                    <Badge variant="outline">Real-time</Badge>
                  </div>
                  <ChartContainer config={performanceConfig} className="h-[300px]">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line
                        type="monotone"
                        dataKey="pageLoad"
                        stroke="var(--color-pageLoad)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="apiResponse"
                        stroke="var(--color-apiResponse)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ChartContainer>
                </>
              )}
            </div>

            {/* Secondary Chart */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Traffic Sources Distribution</h4>
                <Badge variant="secondary">Live Data</Badge>
              </div>
              <ChartContainer config={trafficConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={trafficSourcesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {trafficSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ChartContainer>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-green-600">+23%</p>
                  <p className="text-xs text-muted-foreground">Organic Growth</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-blue-600">1.2K</p>
                  <p className="text-xs text-muted-foreground">Daily Visitors</p>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Summary */}
          <div className="grid grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center space-y-1">
              <p className="text-2xl font-bold text-green-600">$67K</p>
              <p className="text-xs text-muted-foreground">Monthly Revenue</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-2xl font-bold text-blue-600">1,725</p>
              <p className="text-xs text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-2xl font-bold text-purple-600">99.8%</p>
              <p className="text-xs text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-2xl font-bold text-orange-600">1.9s</p>
              <p className="text-xs text-muted-foreground">Avg Load Time</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Real-World Use Cases */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Enterprise Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Financial Reporting</h4>
              <ChartContainer config={salesConfig} className="h-[200px]">
                <BarChart data={salesData.slice(0, 4)}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="profit" fill="var(--color-profit)" />
                </BarChart>
              </ChartContainer>
              <p className="text-xs text-muted-foreground">
                Quarterly profit analysis for stakeholder reports
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">User Analytics</h4>
              <ChartContainer config={userConfig} className="h-[200px]">
                <AreaChart data={userGrowthData.slice(0, 4)}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="newUsers"
                    stroke="var(--color-newUsers)"
                    fill="var(--color-newUsers)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ChartContainer>
              <p className="text-xs text-muted-foreground">
                Track user acquisition and retention metrics
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Performance Monitoring</h4>
              <ChartContainer config={performanceConfig} className="h-[200px]">
                <LineChart data={performanceData}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="uptime"
                    stroke="var(--color-uptime)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
              <p className="text-xs text-muted-foreground">
                Real-time system health and performance tracking
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
