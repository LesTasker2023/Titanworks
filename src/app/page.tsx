'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { getMetrics } from '@/lib/siteConfig';
import {
  BarChart3,
  Brain,
  Briefcase,
  CheckCircle,
  Code,
  ExternalLink,
  Heart,
  Layers,
  Monitor,
  Play,
  Rocket,
  Shield,
  ShoppingCart,
  Smartphone,
  Star,
  Tablet,
  Utensils,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Simple hero section - get metadata from environment variables directly
function HeroSection() {
  // Get metadata directly from environment variables to avoid hydration issues
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Daedalus';
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || 'Daedalus - Enterprise Component System';
  const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Enterprise-grade Next.js component library with automated quality assurance, comprehensive testing, and real-time metrics dashboard.';
  const metrics = getMetrics();

  return (
    <section className="hero-section bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {siteTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            {siteDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Explore Components
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-blue-400 hover:border-blue-300 text-blue-400 hover:text-blue-300 font-semibold text-lg transition-all"
            >
              View Documentation
            </Button>
          </div>
        </div>

        {/* Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-blue-400">{metrics.totalComponents}</div>
            <div className="text-sm text-gray-300 mt-2">Components</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-green-400">{metrics.testsCoverage}%</div>
            <div className="text-sm text-gray-300 mt-2">Test Coverage</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-purple-400">{metrics.storiesCoverage}%</div>
            <div className="text-sm text-gray-300 mt-2">Stories Coverage</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-orange-400">{metrics.qualityScore}</div>
            <div className="text-sm text-gray-300 mt-2">Quality Score</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const iconMap = {
  Zap,
  Shield,
  Code,
};

// Platform showcase data
const platformShowcase = [
  {
    id: 'youtube',
    title: 'YouTube Platform',
    description: 'Entertainment ecosystem with comprehensive social features and engagement tools',
    category: 'Entertainment',
    href: '/youtube',
    icon: Play,
    color: 'from-red-500 to-red-600',
    features: ['Video Management', 'Social Engagement', 'Creator Tools', 'Monetization'],
    metrics: { users: '2M+', engagement: '95%', revenue: '$50K/mo' },
    status: 'Enhanced',
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  },
  {
    id: 'product',
    title: 'E-Commerce Platform',
    description:
      'Advanced shopping experience with smart cart management and customer journey optimization',
    category: 'E-Commerce',
    href: '/product',
    icon: ShoppingCart,
    color: 'from-blue-500 to-blue-600',
    features: ['Smart Cart', 'Product Comparison', 'Price Alerts', 'Warranty Management'],
    metrics: { conversion: '12%', revenue: '$120K/mo', satisfaction: '98%' },
    status: 'Enhanced',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  },
  {
    id: 'restaurant',
    title: 'Restaurant Platform',
    description: 'Complete dining experience with reservations, ordering, and loyalty management',
    category: 'Hospitality',
    href: '/restaurant',
    icon: Utensils,
    color: 'from-orange-500 to-orange-600',
    features: ['Smart Reservations', 'Order Management', 'Wine Pairing', 'Loyalty Program'],
    metrics: { bookings: '500+/day', satisfaction: '96%', repeat: '80%' },
    status: 'Enhanced',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  },
  {
    id: 'saas',
    title: 'SaaS Business Platform',
    description: 'Enterprise-grade business platform with trial management and customer success',
    category: 'Business',
    href: '/saas',
    icon: Briefcase,
    color: 'from-purple-500 to-purple-600',
    features: ['Trial Management', 'Demo Booking', 'Enterprise Sales', 'Onboarding'],
    metrics: { conversion: '25%', mrr: '$80K', nps: '72' },
    status: 'Enhanced',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  },
  {
    id: 'wedding',
    title: 'Wedding Planning Platform',
    description: 'Comprehensive wedding coordination with vendor management and timeline planning',
    category: 'Events',
    href: '/wedding',
    icon: Heart,
    color: 'from-pink-500 to-pink-600',
    features: ['Event Planning', 'Vendor Network', 'Timeline Management', 'Emergency Support'],
    metrics: { events: '200+/year', satisfaction: '99%', referrals: '90%' },
    status: 'Enhanced',
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  },
  {
    id: 'analytics',
    title: 'Analytics Dashboard',
    description:
      'Advanced analytics and reporting with real-time insights and performance tracking',
    category: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    color: 'from-green-500 to-green-600',
    features: [
      'Real-time Analytics',
      'Custom Reports',
      'Performance Tracking',
      'Data Visualization',
    ],
    metrics: { accuracy: '99.9%', speed: '<100ms', insights: '1000+' },
    status: 'Available',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  },
  {
    id: 'intelligence',
    title: 'AI Intelligence Hub',
    description:
      'Machine learning and AI-powered insights for business intelligence and automation',
    category: 'AI/ML',
    href: '/intelligence',
    icon: Brain,
    color: 'from-indigo-500 to-indigo-600',
    features: ['ML Models', 'Predictive Analytics', 'Automation', 'NLP Processing'],
    metrics: { accuracy: '94%', automation: '80%', savings: '$200K/year' },
    status: 'Available',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  },
  {
    id: 'components',
    title: 'Component Showcase',
    description: 'Professional UI component library with advanced patterns and design systems',
    category: 'Development',
    href: '/component-showcase',
    icon: Layers,
    color: 'from-cyan-500 to-cyan-600',
    features: ['UI Components', 'Design System', 'Code Examples', 'Best Practices'],
    metrics: { components: '100+', downloads: '50K/mo', satisfaction: '97%' },
    status: 'Available',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Platform Showcase */}
      <section id="platforms" className="py-20 px-4 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Ecosystem</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Explore our comprehensive suite of enhanced platforms, each showcasing strategic modal
              implementations and real business logic
            </p>
          </div>

          {/* Platform Grid */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {platformShowcase.map(platform => {
              const IconComponent = platform.icon;
              return (
                <Card
                  key={platform.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Platform Image/Icon */}
                  <div
                    className={`relative h-48 bg-gradient-to-br ${platform.color} rounded-t-lg flex items-center justify-center overflow-hidden`}
                  >
                    <Image
                      src={platform.image}
                      alt={platform.title}
                      className="w-full h-full object-cover opacity-80"
                      width={400}
                      height={192}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>
                    <Badge
                      className="absolute top-3 right-3"
                      variant={platform.status === 'Enhanced' ? 'default' : 'secondary'}
                    >
                      {platform.status}
                    </Badge>
                  </div>

                  <div className="flex-1 p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {platform.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {platform.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0 space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {platform.description}
                      </p>

                      {/* Features */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {platform.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Metrics */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Performance Metrics</h4>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {Object.entries(platform.metrics).map(([key, value]) => (
                            <div key={key} className="text-center p-2 bg-muted/50 rounded">
                              <div className="font-semibold text-primary">{value}</div>
                              <div className="text-muted-foreground capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button asChild className="flex-1" size="sm">
                          <Link href={platform.href}>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Explore Platform
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Code className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack & Features */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Enterprise</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every platform demonstrates production-ready patterns, strategic modal
              implementations, and real business logic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Enterprise Security',
                description:
                  'Production-ready security patterns with authentication, authorization, and data protection',
                features: [
                  'OAuth Integration',
                  'Role-based Access',
                  'Data Encryption',
                  'Audit Logging',
                ],
              },
              {
                icon: Zap,
                title: 'Performance Optimized',
                description:
                  'Built for scale with optimized loading, caching strategies, and responsive design',
                features: ['Sub-100ms Response', 'CDN Integration', 'Lazy Loading', 'Mobile-First'],
              },
              {
                icon: Code,
                title: 'Developer Experience',
                description:
                  'Clean architecture, comprehensive documentation, and reusable component patterns',
                features: ['TypeScript', 'Component Library', 'Design System', 'Best Practices'],
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.features.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Device Compatibility */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Universal Compatibility</h2>
            <p className="text-xl text-muted-foreground">Optimized for every device and platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <Monitor className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Desktop</h3>
              <p className="text-muted-foreground mb-4">
                Full-featured experience with advanced interactions
              </p>
              <Badge>Optimized</Badge>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <Tablet className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tablet</h3>
              <p className="text-muted-foreground mb-4">
                Touch-optimized interface with gesture support
              </p>
              <Badge>Responsive</Badge>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <Smartphone className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mobile</h3>
              <p className="text-muted-foreground mb-4">
                Mobile-first design with progressive enhancement
              </p>
              <Badge>Native Feel</Badge>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-8 border border-white/20">
            <Rocket className="w-4 h-4 mr-2" />
            Ready to Build the Future
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Journey</h2>
          <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto">
            Explore our platforms, study the patterns, and build something extraordinary. The future
            of digital experiences starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4 h-auto">
              <Link href="/component-showcase">
                <Layers className="mr-2 h-5 w-5" />
                Component Library
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 h-auto bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Link href="/youtube">
                <Play className="mr-2 h-5 w-5" />
                Start Exploring
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">5</div>
              <div className="text-sm opacity-80">Enhanced Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">100+</div>
              <div className="text-sm opacity-80">Modal Features</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">8</div>
              <div className="text-sm opacity-80">Industries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">∞</div>
              <div className="text-sm opacity-80">Possibilities</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
