'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  ArrowLeft,
  Eye,
  Globe,
  Heart,
  Instagram,
  Palette,
  Share2,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function TitanMediaPage() {
  const services = [
    {
      name: 'Instagram Marketing',
      description:
        'Strategic social media campaigns that drive engagement and build authentic communities.',
      icon: <Instagram className="h-6 w-6" />,
      features: [
        'Content Strategy',
        'Hashtag Optimization',
        'Community Management',
        'Analytics & Reporting',
      ],
      pricing: 'From £500/month',
    },
    {
      name: 'Web Design',
      description: 'Modern, responsive websites that convert visitors into customers.',
      icon: <Globe className="h-6 w-6" />,
      features: ['Custom Design', 'Mobile Responsive', 'SEO Optimized', 'Fast Loading'],
      pricing: 'From £1,500',
    },
    {
      name: 'Brand Identity',
      description: 'Complete brand packages that make your business unforgettable.',
      icon: <Palette className="h-6 w-6" />,
      features: ['Logo Design', 'Brand Guidelines', 'Color Schemes', 'Typography'],
      pricing: 'From £800',
    },
    {
      name: 'Creative Coding',
      description: 'Interactive digital experiences that engage and inspire your audience.',
      icon: <Zap className="h-6 w-6" />,
      features: [
        'Interactive Websites',
        'Animations',
        'Custom Solutions',
        'Performance Optimization',
      ],
      pricing: 'From £2,000',
    },
  ];

  const portfolio = [
    {
      title: 'STRONG Brand Instagram',
      description: 'Performance supplement brand social media management',
      metrics: { followers: '5K+', engagement: '12%', reach: '50K+' },
      tags: ['Social Media', 'Supplements', 'Performance'],
    },
    {
      title: 'TitanWorks Corporate Site',
      description: 'Multi-division corporate website with modern design',
      metrics: { pageviews: '10K+', loadtime: '0.8s', conversion: '8%' },
      tags: ['Web Design', 'Corporate', 'Multi-page'],
    },
    {
      title: 'E-commerce Platform',
      description: 'Custom online store with advanced features',
      metrics: { sales: '£25K+', products: '200+', uptime: '99.9%' },
      tags: ['E-commerce', 'Custom Build', 'Optimization'],
    },
  ];

  const stats = [
    { label: 'Projects Completed', value: '50+', icon: <TrendingUp className="h-5 w-5" /> },
    { label: 'Happy Clients', value: '25+', icon: <Users className="h-5 w-5" /> },
    { label: 'Social Reach', value: '100K+', icon: <Eye className="h-5 w-5" /> },
    { label: 'Avg Engagement', value: '12%', icon: <Heart className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-slate-900 to-rose-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/titanworks"
            className="flex items-center gap-2 text-white hover:text-pink-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to TitanWorks
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-rose-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 mr-4">
                <Palette className="h-12 w-12 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold text-white">
                  Titan<span className="text-pink-400">Media</span>
                </h1>
                <p className="text-pink-300 text-lg">Creative Digital Solutions</p>
              </div>
            </div>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              We create digital experiences that captivate audiences and drive results. From
              Instagram marketing to custom web development, we bring your brand to life.
            </p>

            <div className="flex items-center justify-center gap-6">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
                Start Your Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-pink-300 text-pink-300 hover:bg-pink-300 hover:text-pink-900"
              >
                View Portfolio
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
                <div className="flex items-center justify-center text-pink-400 mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-xl text-slate-300">
            Comprehensive digital solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-pink-600 text-white">{service.icon}</div>
                  <div>
                    <CardTitle className="text-xl text-white">{service.name}</CardTitle>
                    <p className="text-pink-300 text-sm">{service.pricing}</p>
                  </div>
                </div>
                <p className="text-slate-300">{service.description}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                    What&apos;s Included
                  </h4>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white border-none">
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <div className="bg-black/20 backdrop-blur border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Recent Work</h2>
            <p className="text-xl text-slate-300">
              Projects that showcase our creativity and results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur border-white/10 hover:scale-105 transition-transform duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-white">{project.title}</CardTitle>
                  <p className="text-slate-300 text-sm">{project.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                        Key Metrics
                      </h4>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-sm font-bold text-pink-300">{value}</div>
                            <div className="text-xs text-slate-400 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="secondary"
                            className="text-xs bg-slate-800 text-slate-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Elevate Your Brand?</h3>
          <p className="text-xl text-slate-300 mb-8">
            Let&apos;s create something amazing together
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
              Get Started Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-pink-300 text-pink-300 hover:bg-pink-300 hover:text-pink-900"
            >
              Schedule Consultation
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Share2 className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Social First</div>
              <div className="text-slate-400 text-sm">Built for engagement</div>
            </div>
            <div>
              <Zap className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Fast Delivery</div>
              <div className="text-slate-400 text-sm">Quick turnaround</div>
            </div>
            <div>
              <TrendingUp className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Results Driven</div>
              <div className="text-slate-400 text-sm">Measurable impact</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
