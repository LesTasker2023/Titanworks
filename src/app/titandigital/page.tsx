'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowLeft, Bot, Brain, Code2, Cpu, Database, Shield, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

export default function TitanDigitalPage() {
  const projects = [
    {
      name: 'Daedalus Trading Platform',
      description:
        'Advanced cryptocurrency trading platform with real-time signals and automated execution.',
      icon: <TrendingUp className="h-6 w-6" />,
      tech: ['Next.js', 'TypeScript', 'WebSockets', 'MEXC API'],
      status: 'Live',
      link: '/real-trading-bot',
      metrics: { trades: '1000+', accuracy: '85%', profit: '+250%' },
    },
    {
      name: 'Live Signal System',
      description: 'Real-time market analysis with AI-powered entry and exit recommendations.',
      icon: <Bot className="h-6 w-6" />,
      tech: ['WebSocket', 'AI Analysis', 'Real-time Data', 'Signal Processing'],
      status: 'Beta',
      link: '/live-signals',
      metrics: { signals: '500+', confidence: '78%', speed: '< 1ms' },
    },
    {
      name: 'Zero-Fee Scanner',
      description: 'Automated system to identify and exploit zero-fee trading opportunities.',
      icon: <Zap className="h-6 w-6" />,
      tech: ['Market Analysis', 'Fee Detection', 'Automation', 'Profit Optimization'],
      status: 'Live',
      link: '/trading',
      metrics: { scans: '24/7', pairs: '50+', saves: '100%' },
    },
    {
      name: 'Ultimate Trading Bot',
      description: 'Fully automated trading system with risk management and profit compounding.',
      icon: <Brain className="h-6 w-6" />,
      tech: ['Risk Management', 'Position Sizing', 'Auto-execution', 'P&L Tracking'],
      status: 'Live',
      link: '/trading-bot',
      metrics: { uptime: '99.9%', positions: '20+', roi: '+180%' },
    },
  ];

  const capabilities = [
    {
      title: 'Trading Systems',
      description: 'Advanced algorithmic trading platforms with real-time market analysis.',
      icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
      features: ['Real-time Signals', 'Auto-execution', 'Risk Management', 'P&L Tracking'],
    },
    {
      title: 'AI & Machine Learning',
      description: 'Intelligent systems that learn and adapt to market conditions.',
      icon: <Brain className="h-8 w-8 text-purple-400" />,
      features: ['Pattern Recognition', 'Predictive Models', 'Natural Language', 'Data Analysis'],
    },
    {
      title: 'System Architecture',
      description: 'Scalable, high-performance systems built for enterprise needs.',
      icon: <Database className="h-8 w-8 text-green-400" />,
      features: ['Microservices', 'Cloud Native', 'High Availability', 'Performance Optimization'],
    },
    {
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with comprehensive compliance frameworks.',
      icon: <Shield className="h-8 w-8 text-red-400" />,
      features: ['Encryption', 'API Security', 'Compliance', 'Risk Assessment'],
    },
  ];

  const stats = [
    { label: 'Active Projects', value: '12+', icon: <Code2 className="h-5 w-5" /> },
    { label: 'Trading Bots', value: '5+', icon: <Bot className="h-5 w-5" /> },
    { label: 'API Calls/Day', value: '10K+', icon: <Database className="h-5 w-5" /> },
    { label: 'System Uptime', value: '99.9%', icon: <Cpu className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-cyan-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/titanworks"
            className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to TitanWorks
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mr-4">
                <Code2 className="h-12 w-12 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold text-white">
                  Titan<span className="text-blue-400">Digital</span>
                </h1>
                <p className="text-blue-300 text-lg">Advanced R&D & Technology</p>
              </div>
            </div>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Cutting-edge research and development in trading systems, AI, and advanced
              technologies. Home to Daedalus and our proprietary trading algorithms that generate
              consistent profits.
            </p>

            <div className="flex items-center justify-center gap-6">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Explore Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-blue-900"
              >
                Try Live Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur border-white/20 text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center text-blue-400 mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Projects */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Active Projects</h2>
          <p className="text-xl text-slate-300">Live systems generating real results and profits</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-600 text-white">{project.icon}</div>
                    <div>
                      <CardTitle className="text-xl text-white">{project.name}</CardTitle>
                      <Badge
                        variant={project.status === 'Live' ? 'default' : 'secondary'}
                        className={project.status === 'Live' ? 'bg-green-600' : 'bg-yellow-600'}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-slate-300">{project.description}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Metrics */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      Performance Metrics
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-blue-300">{value}</div>
                          <div className="text-xs text-slate-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="text-xs border-slate-600 text-slate-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href={project.link}>
                  <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none group-hover:scale-105 transition-transform">
                    Access System
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="bg-black/20 backdrop-blur border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Core Capabilities</h2>
            <p className="text-xl text-slate-300">Advanced technologies that power our solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    {capability.icon}
                    <CardTitle className="text-xl text-white">{capability.title}</CardTitle>
                  </div>
                  <p className="text-slate-300">{capability.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    {capability.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Scale Your Technology?</h3>
          <p className="text-xl text-slate-300 mb-8">
            Let&apos;s build the next generation of intelligent systems
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Start a Project
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-blue-900"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Bot className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-white font-semibold">AI-Powered</div>
              <div className="text-slate-400 text-sm">Intelligent automation</div>
            </div>
            <div>
              <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-white font-semibold">High Performance</div>
              <div className="text-slate-400 text-sm">Optimized for speed</div>
            </div>
            <div>
              <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Enterprise Security</div>
              <div className="text-slate-400 text-sm">Bank-grade protection</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
