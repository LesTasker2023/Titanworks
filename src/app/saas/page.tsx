'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Briefcase,
  Building,
  Calendar,
  Check,
  CheckCircle,
  Crown,
  FileText,
  Gift,
  Globe,
  HelpCircle,
  Mail,
  MessageCircle,
  Monitor,
  Phone,
  Play,
  Rocket,
  Settings,
  Shield,
  Smartphone,
  Tablet,
  Target,
  TrendingUp,
  Users,
  Video,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const METRICS_DATA = [
  { label: 'Revenue', value: '$2.4M', change: '+12%', trend: 'up' },
  { label: 'Users', value: '1.2M', change: '+8%', trend: 'up' },
  { label: 'Conversion', value: '3.4%', change: '+2.1%', trend: 'up' },
  { label: 'Retention', value: '94%', change: '+5%', trend: 'up' },
];

const FEATURE_DEMOS = [
  {
    title: 'Real-time Analytics',
    description: 'See your data update instantly',
    icon: Activity,
    demo: 'analytics',
  },
  {
    title: 'Smart Automation',
    description: 'AI-powered workflow optimization',
    icon: Zap,
    demo: 'automation',
  },
  {
    title: 'Team Collaboration',
    description: 'Work together seamlessly',
    icon: Users,
    demo: 'collaboration',
  },
  {
    title: 'Global Scale',
    description: '99.9% uptime worldwide',
    icon: Globe,
    demo: 'infrastructure',
  },
];

function AnimatedMetrics() {
  const [currentValues, setCurrentValues] = useState(METRICS_DATA.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      METRICS_DATA.forEach((metric, index) => {
        const targetValue = parseInt(metric.value.replace(/[^0-9.]/g, ''));
        let current = 0;
        const increment = targetValue / 50;

        const counter = setInterval(() => {
          current += increment;
          if (current >= targetValue) {
            current = targetValue;
            clearInterval(counter);
          }
          setCurrentValues(prev => {
            const newValues = [...prev];
            newValues[index] = current;
            return newValues;
          });
        }, 30);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {METRICS_DATA.map((metric, index) => (
        <Card
          key={metric.label}
          className="p-4 bg-surface-secondary/50 hover:bg-surface-secondary transition-colors"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {metric.label === 'Revenue' && '$'}
              {currentValues[index].toFixed(metric.label === 'Conversion' ? 1 : 0)}
              {metric.label === 'Revenue' && 'M'}
              {metric.label === 'Users' && 'M'}
              {metric.label === 'Conversion' && '%'}
              {metric.label === 'Retention' && '%'}
            </div>
            <div className="text-xs text-content-secondary mb-1">{metric.label}</div>
            <div className="text-xs text-status-success flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {metric.change}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function InteractiveDashboard() {
  const [activeDemo, setActiveDemo] = useState('analytics');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const renderDemo = () => {
    switch (activeDemo) {
      case 'analytics':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-primary/10 rounded-lg flex items-end p-3">
                  <div
                    className="w-full bg-primary rounded-sm transition-all duration-1000"
                    style={{ height: `${Math.random() * 60 + 20}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-content-secondary">
              <span>Pageviews</span>
              <span className="text-status-success">+15% this week</span>
            </div>
          </div>
        );
      case 'automation':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 h-2 bg-surface-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full animate-pulse"
                  style={{ width: '70%' }}
                />
              </div>
              <div className="text-sm text-content-secondary">70% automated</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-status-success/10 rounded-lg">
                <div className="text-sm font-medium text-status-success">Tasks Completed</div>
                <div className="text-2xl font-bold text-status-success">247</div>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <div className="text-sm font-medium text-primary">Time Saved</div>
                <div className="text-2xl font-bold text-primary">15hr</div>
              </div>
            </div>
          </div>
        );
      case 'collaboration':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-primary rounded-full border-2 border-surface-primary flex items-center justify-center text-xs text-primary-foreground font-medium"
                  >
                    {String.fromCharCode(65 + i - 1)}
                  </div>
                ))}
              </div>
              <div className="w-2 h-2 bg-status-success rounded-full animate-pulse" />
              <span className="text-sm text-content-secondary">4 active users</span>
            </div>
            <div className="space-y-2">
              {['Updated dashboard design', 'Added new analytics module', 'Fixed login bug'].map(
                (activity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 bg-surface-secondary/30 rounded"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">{activity}</span>
                    <span className="text-xs text-content-secondary ml-auto">{i + 1}m ago</span>
                  </div>
                )
              )}
            </div>
          </div>
        );
      case 'infrastructure':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {['US', 'EU', 'ASIA'].map(region => (
                <div key={region} className="text-center p-3 bg-surface-secondary/30 rounded-lg">
                  <div className="text-sm font-medium">{region}</div>
                  <div className="text-lg font-bold text-status-success">99.9%</div>
                  <div className="w-2 h-2 bg-status-success rounded-full mx-auto animate-pulse" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-content-secondary">Global uptime</span>
              <span className="text-status-success font-medium">All systems operational</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    >
      <Card className="overflow-hidden border-2 border-border shadow-lg">
        {/* Dashboard Header */}
        <div className="bg-surface-secondary/50 px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-status-error rounded-full" />
              <div className="w-3 h-3 bg-status-warning rounded-full" />
              <div className="w-3 h-3 bg-status-success rounded-full" />
            </div>
            <div className="text-sm font-medium text-content-secondary">app.yourapp.com</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-status-success rounded-full animate-pulse" />
              <span className="text-xs text-status-success">Live</span>
            </div>
          </div>
        </div>

        {/* Demo Navigation */}
        <div className="p-4 border-b border-border">
          <div className="flex gap-2 overflow-x-auto">
            {FEATURE_DEMOS.map(demo => {
              const IconComponent = demo.icon;
              return (
                <button
                  key={demo.demo}
                  onClick={() => setActiveDemo(demo.demo)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeDemo === demo.demo
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface-secondary text-content-secondary hover:bg-surface-secondary/80'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {demo.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Demo Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-content-primary mb-2">
              {FEATURE_DEMOS.find(d => d.demo === activeDemo)?.title}
            </h3>
            <p className="text-content-secondary">
              {FEATURE_DEMOS.find(d => d.demo === activeDemo)?.description}
            </p>
          </div>

          {renderDemo()}
        </div>
      </Card>
    </div>
  );
}

function DeviceShowcase() {
  const devices = [
    { icon: Monitor, label: 'Desktop', active: true },
    { icon: Tablet, label: 'Tablet', active: false },
    { icon: Smartphone, label: 'Mobile', active: false },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        {devices.map(device => {
          const IconComponent = device.icon;
          return (
            <div
              key={device.label}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors ${
                device.active
                  ? 'bg-primary/10 text-primary'
                  : 'bg-surface-secondary text-content-secondary'
              }`}
            >
              <IconComponent className="w-6 h-6" />
              <span className="text-xs">{device.label}</span>
            </div>
          );
        })}
      </div>

      <div className="aspect-[16/10] bg-surface-secondary rounded-xl p-4 relative overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary/5 to-surface-accent/5 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4" />
            <div className="text-lg font-semibold text-content-primary">Your App Interface</div>
            <div className="text-content-secondary">Responsive on all devices</div>
          </div>
        </div>

        {/* Floating UI Elements */}
        <div className="absolute top-6 right-6 bg-surface-primary border border-border rounded-lg p-3 shadow-md">
          <div className="text-sm font-medium text-content-primary">Active Users</div>
          <div className="text-xl font-bold text-primary">2,847</div>
        </div>

        <div className="absolute bottom-6 left-6 bg-surface-primary border border-border rounded-lg p-3 shadow-md">
          <div className="text-sm font-medium text-content-primary">Revenue</div>
          <div className="text-xl font-bold text-status-success">$12,430</div>
        </div>
      </div>
    </div>
  );
}

export default function SaaSPage() {
  const [isVisible, setIsVisible] = useState(false);

  // Enhanced modal state for SaaS features
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [trialData, setTrialData] = useState({
    email: '',
    company: '',
    role: '',
    teamSize: '',
    useCase: '',
  });
  const [demoData, setDemoData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    preferredTime: '',
    specificNeeds: '',
  });

  const openModal = (modalType: string, data?: any) => {
    setActiveModal(modalType);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-surface-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-surface-primary to-surface-accent/5" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center min-h-screen px-4 max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <Badge variant="secondary" className="mb-6">
              🚀 Next-Generation Analytics Platform
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-content-primary">
              <span className="block">Data-Driven</span>
              <span className="block text-primary">Success</span>
            </h1>

            <p className="text-xl md:text-2xl text-content-secondary mb-8 leading-relaxed">
              Transform your business with real-time analytics, automated insights, and AI-powered
              decision making. See results in minutes, not months.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-status-success" />
                <span>Real-time data sync</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-status-success" />
                <span>AI-powered insights</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-status-success" />
                <span>Enterprise security</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="text-lg px-8 py-4 h-auto group"
                onClick={() => openModal('start-trial')}
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 h-auto"
                onClick={() => openModal('book-demo')}
              >
                Watch Live Demo
              </Button>
            </div>

            <div className="pt-6 border-t border-border">
              <AnimatedMetrics />
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <InteractiveDashboard />
          </div>
        </div>
      </section>

      {/* Features Demo Section */}
      <section className="py-24 px-4 bg-surface-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Interactive Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-content-primary">
              See it in action
            </h2>
            <p className="text-xl text-content-secondary">
              Experience the power of our platform with live, interactive demos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <DeviceShowcase />
            </div>

            <div className="space-y-6">
              {FEATURE_DEMOS.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-content-primary">
                          {feature.title}
                        </h3>
                        <p className="text-content-secondary">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Live Platform Stats
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-content-primary">
            Trusted by industry leaders
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: 'Active Users', value: '2.5M+' },
              { icon: BarChart3, label: 'Data Points', value: '100B+' },
              { icon: Globe, label: 'Countries', value: '180+' },
              { icon: Shield, label: 'Uptime', value: '99.99%' },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-content-primary mb-2">{stat.value}</div>
                  <div className="text-content-secondary">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary to-surface-accent text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to transform your data?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of companies already using our platform to make better decisions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-4 h-auto group"
              onClick={() => openModal('start-trial')}
            >
              <Target className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 h-auto bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => openModal('enterprise-contact')}
            >
              <Building className="mr-2 h-5 w-5" />
              Enterprise Sales
            </Button>
          </div>

          <p className="text-sm opacity-75">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Enhanced SaaS Modal System */}
      {activeModal && (
        <Modal isOpen={true} onClose={closeModal}>
          {/* Start Trial Modal */}
          {activeModal === 'start-trial' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">Start Your Free Trial</h2>
                  <p className="text-content-secondary">
                    Get full access for 14 days, no credit card required
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={trialData.email}
                    onChange={e => setTrialData({ ...trialData, email: e.target.value })}
                    placeholder="your.email@company.com"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={trialData.company}
                    onChange={e => setTrialData({ ...trialData, company: e.target.value })}
                    placeholder="Your Company"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Your Role
                  </label>
                  <select
                    value={trialData.role}
                    onChange={e => setTrialData({ ...trialData, role: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  >
                    <option value="">Select your role</option>
                    <option value="ceo">CEO/Founder</option>
                    <option value="cto">CTO/VP Engineering</option>
                    <option value="product">Product Manager</option>
                    <option value="marketing">Marketing Manager</option>
                    <option value="data">Data Analyst</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Team Size
                  </label>
                  <select
                    value={trialData.teamSize}
                    onChange={e => setTrialData({ ...trialData, teamSize: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  >
                    <option value="">Select team size</option>
                    <option value="1-5">1-5 people</option>
                    <option value="6-25">6-25 people</option>
                    <option value="26-100">26-100 people</option>
                    <option value="101-500">101-500 people</option>
                    <option value="500+">500+ people</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-content-primary mb-2">
                  Primary Use Case
                </label>
                <textarea
                  rows={3}
                  value={trialData.useCase}
                  onChange={e => setTrialData({ ...trialData, useCase: e.target.value })}
                  placeholder="What do you hope to achieve with our platform?"
                  className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary resize-none"
                />
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-3">
                  What&apos;s included in your trial:
                </h3>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-status-success" />
                    <span>Full platform access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-status-success" />
                    <span>Unlimited data sources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-status-success" />
                    <span>AI-powered insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-status-success" />
                    <span>24/7 customer support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-status-success" />
                    <span>Onboarding consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-status-success" />
                    <span>Custom integrations</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Maybe Later
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    closeModal();
                    openModal('trial-setup');
                  }}
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          )}

          {/* Book Demo Modal */}
          {activeModal === 'book-demo' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">Book a Live Demo</h2>
                  <p className="text-content-secondary">
                    See our platform in action with a personalized demo
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={demoData.name}
                    onChange={e => setDemoData({ ...demoData, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={demoData.email}
                    onChange={e => setDemoData({ ...demoData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={demoData.company}
                    onChange={e => setDemoData({ ...demoData, company: e.target.value })}
                    placeholder="Company Name"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={demoData.phone}
                    onChange={e => setDemoData({ ...demoData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-content-primary mb-2">
                  Preferred Time
                </label>
                <select
                  value={demoData.preferredTime}
                  onChange={e => setDemoData({ ...demoData, preferredTime: e.target.value })}
                  className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                >
                  <option value="">Select preferred time</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                  <option value="flexible">I&apos;m flexible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-content-primary mb-2">
                  Specific Needs or Questions
                </label>
                <textarea
                  rows={3}
                  value={demoData.specificNeeds}
                  onChange={e => setDemoData({ ...demoData, specificNeeds: e.target.value })}
                  placeholder="What specific features or use cases would you like to see?"
                  className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary resize-none"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-600">Demo Agenda (30 minutes)</span>
                </div>
                <ul className="text-sm text-content-secondary space-y-1">
                  <li>• Platform overview and key features</li>
                  <li>• Live demo with your use case</li>
                  <li>• Q&A and technical deep-dive</li>
                  <li>• Pricing and implementation discussion</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Not Right Now
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    closeModal();
                    openModal('demo-scheduled');
                  }}
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          )}

          {/* Enterprise Contact Modal */}
          {activeModal === 'enterprise-contact' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-status-warning/10 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-status-warning" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">Enterprise Solutions</h2>
                  <p className="text-content-secondary">
                    Custom pricing and features for large organizations
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-surface-secondary/30 rounded-lg">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-sm">500+ Users</div>
                  <div className="text-xs text-content-secondary">Unlimited seats</div>
                </div>
                <div className="text-center p-4 bg-surface-secondary/30 rounded-lg">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-sm">Enterprise Security</div>
                  <div className="text-xs text-content-secondary">SOC 2, GDPR compliance</div>
                </div>
                <div className="text-center p-4 bg-surface-secondary/30 rounded-lg">
                  <Settings className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-sm">Custom Integrations</div>
                  <div className="text-xs text-content-secondary">API & white-label</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-content-primary mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-content-primary mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      placeholder="VP of Operations"
                      className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-content-primary mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Fortune 500 Company"
                      className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-content-primary mb-2">
                      Company Size
                    </label>
                    <select className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary">
                      <option value="">Select size</option>
                      <option value="500-1000">500-1,000 employees</option>
                      <option value="1000-5000">1,000-5,000 employees</option>
                      <option value="5000+">5,000+ employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-content-primary mb-2">
                    Current Analytics Challenge
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What specific challenges is your organization facing with data analytics?"
                    className="w-full p-3 border border-border rounded-lg bg-surface-primary text-content-primary resize-none"
                  />
                </div>
              </div>

              <div className="bg-status-warning/5 border border-status-warning/20 rounded-lg p-4">
                <h3 className="font-semibold text-status-warning mb-3">Enterprise Benefits:</h3>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-status-success" />
                    <span>Dedicated success manager</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-status-success" />
                    <span>Custom SLA agreements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-status-success" />
                    <span>Priority support (2hr response)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-status-success" />
                    <span>On-premise deployment option</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-status-success" />
                    <span>Advanced security controls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-status-success" />
                    <span>Volume pricing discounts</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  Send Information
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    closeModal();
                    openModal('enterprise-scheduled');
                  }}
                >
                  Schedule Enterprise Call
                </Button>
              </div>
            </div>
          )}

          {/* Trial Setup Modal */}
          {activeModal === 'trial-setup' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-status-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-status-success" />
                </div>
                <h2 className="text-2xl font-bold text-content-primary mb-2">
                  Welcome to Your Trial!
                </h2>
                <p className="text-content-secondary">
                  Your account is being set up. Here&apos;s what happens next:
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-surface-secondary/30 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-content-primary">Check Your Email</div>
                    <div className="text-sm text-content-secondary">
                      Login credentials sent to {trialData.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-surface-secondary/30 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-content-primary">
                      Onboarding Call Scheduled
                    </div>
                    <div className="text-sm text-content-secondary">
                      Tomorrow at 2 PM - calendar invite sent
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-surface-secondary/30 rounded-lg">
                  <div className="w-8 h-8 bg-surface-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-content-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold text-content-primary">Setup Guide Available</div>
                    <div className="text-sm text-content-secondary">
                      Step-by-step guide in your dashboard
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">Trial Bonus Unlocked!</span>
                </div>
                <p className="text-sm text-content-secondary">
                  You&apos;ve unlocked our advanced AI features (usually $200/month) free during
                  your trial.
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={closeModal}>
                  I&apos;ll Check Email Later
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    closeModal();
                    openModal('quick-start-guide');
                  }}
                >
                  Show Me Quick Start
                </Button>
              </div>
            </div>
          )}

          {/* Demo Scheduled Confirmation */}
          {activeModal === 'demo-scheduled' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-10 h-10 text-blue-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-content-primary mb-2">Demo Scheduled!</h2>
                <p className="text-content-secondary">
                  Our team will contact you within 4 hours to confirm your demo time
                </p>
              </div>

              <div className="bg-surface-secondary/30 rounded-lg p-4 text-left space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Contact:</span>
                  <span>{demoData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{demoData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Company:</span>
                  <span>{demoData.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Preferred Time:</span>
                  <span>{demoData.preferredTime || 'Flexible'}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" onClick={closeModal}>
                  Perfect, Thanks!
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    closeModal();
                    openModal('start-trial');
                  }}
                >
                  Start Free Trial While I Wait
                </Button>
              </div>
            </div>
          )}

          {/* Enterprise Scheduled Confirmation */}
          {activeModal === 'enterprise-scheduled' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-status-warning/10 rounded-full flex items-center justify-center mx-auto">
                <Crown className="w-10 h-10 text-status-warning" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-content-primary mb-2">
                  Enterprise Call Scheduled!
                </h2>
                <p className="text-content-secondary">
                  Our enterprise team will reach out within 2 business hours
                </p>
              </div>

              <div className="bg-status-warning/5 border border-status-warning/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-status-warning" />
                  <span className="font-semibold text-status-warning">What to Expect</span>
                </div>
                <ul className="text-sm text-content-secondary space-y-1 text-left">
                  <li>• Custom pricing based on your needs</li>
                  <li>• Technical architecture discussion</li>
                  <li>• Security and compliance review</li>
                  <li>• Implementation timeline planning</li>
                </ul>
              </div>

              <Button className="w-full" onClick={closeModal}>
                Excellent, Looking Forward To It
              </Button>
            </div>
          )}

          {/* Quick Start Guide Modal */}
          {activeModal === 'quick-start-guide' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content-primary">Quick Start Guide</h2>
                  <p className="text-content-secondary">Get up and running in under 10 minutes</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-content-primary mb-1">Connect Your Data</div>
                    <div className="text-sm text-content-secondary">
                      Link your existing tools (Google Analytics, Salesforce, etc.)
                    </div>
                    <Button size="sm" className="mt-2">
                      Connect Now
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
                  <div className="w-8 h-8 bg-surface-secondary rounded-full flex items-center justify-center flex-shrink-0 text-content-secondary font-bold text-sm">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-content-primary mb-1">
                      Create Your First Dashboard
                    </div>
                    <div className="text-sm text-content-secondary">
                      Use our templates or build from scratch
                    </div>
                    <Button size="sm" variant="outline" className="mt-2" disabled>
                      Start After Step 1
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
                  <div className="w-8 h-8 bg-surface-secondary rounded-full flex items-center justify-center flex-shrink-0 text-content-secondary font-bold text-sm">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-content-primary mb-1">Set Up Alerts</div>
                    <div className="text-sm text-content-secondary">
                      Get notified when metrics hit your targets
                    </div>
                    <Button size="sm" variant="outline" className="mt-2" disabled>
                      Coming Next
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">Need Help?</span>
                </div>
                <p className="text-sm text-content-secondary mb-3">
                  Our customer success team is standing by to help you get started.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Live Chat
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Support
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={closeModal}>
                Let&apos;s Get Started!
              </Button>
            </div>
          )}
        </Modal>
      )}
    </main>
  );
}
