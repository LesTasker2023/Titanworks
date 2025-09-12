'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  ArrowRight,
  Award,
  Box,
  Building2,
  Code2,
  FlaskConical,
  Globe,
  Palette,
  Users,
} from 'lucide-react';
import Link from 'next/link';

export default function TitanWorksPortal() {
  const divisions = [
    {
      name: 'TitanMedia',
      tagline: 'Creative Digital Solutions',
      description:
        'Instagram marketing, web design, and creative coding solutions that drive engagement and build brands.',
      icon: <Palette className="h-8 w-8 text-pink-500" />,
      color: 'from-pink-500 to-rose-500',
      services: ['Instagram Marketing', 'Web Design', 'Brand Identity', 'Social Media Management'],
      href: '/titanmedia',
      stats: { projects: '50+', clients: '25+', growth: '300%' },
    },
    {
      name: 'TitanDigital',
      tagline: 'Advanced R&D & Technology',
      description:
        'Cutting-edge research, development, and trading systems. Home to Daedalus and our proprietary trading bots.',
      icon: <Code2 className="h-8 w-8 text-blue-500" />,
      color: 'from-blue-500 to-cyan-500',
      services: ['Trading Bots', 'AI Development', 'System Architecture', 'R&D Projects'],
      href: '/titandigital',
      stats: { bots: '10+', trades: '1000+', accuracy: '85%' },
    },
    {
      name: 'TitanLabs',
      tagline: 'Performance & Wellness',
      description:
        'Scientific approach to supplements and performance enhancement. Home of the STRONG brand and premium formulations.',
      icon: <FlaskConical className="h-8 w-8 text-green-500" />,
      color: 'from-green-500 to-emerald-500',
      services: ['Smelling Salts', 'Pre-Workout', 'STRONG Brand', 'Performance Research'],
      href: '/titanlabs',
      stats: { products: '15+', customers: '500+', strength: 'MAX' },
    },
    {
      name: 'TitanForge',
      tagline: 'Advanced Manufacturing',
      description:
        '3D printing, prototyping, and custom manufacturing solutions. From concept to creation.',
      icon: <Box className="h-8 w-8 text-orange-500" />,
      color: 'from-orange-500 to-red-500',
      services: ['3D Printing', 'Prototyping', 'Custom Parts', 'Design Services'],
      href: '/titanforge',
      stats: { prints: '200+', materials: '5+', precision: '0.1mm' },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Building2 className="h-16 w-16 text-blue-400 mr-4" />
              <h1 className="text-6xl font-bold text-white">
                Titan<span className="text-blue-400">Works</span>
              </h1>
            </div>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              A diversified technology and innovation company delivering cutting-edge solutions
              across digital media, advanced R&D, performance wellness, and manufacturing.
            </p>

            <div className="flex items-center justify-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span>Global Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Expert Teams</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>Industry Leading</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Stats */}
      <div className="max-w-7xl mx-auto px-6 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">4</div>
              <div className="text-slate-300">Active Divisions</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-slate-300">Projects Delivered</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">2023</div>
              <div className="text-slate-300">Founded</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">∞</div>
              <div className="text-slate-300">Innovation</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Divisions Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Divisions</h2>
          <p className="text-xl text-slate-300">
            Four specialized divisions, one unified vision of excellence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {divisions.map((division, index) => (
            <Card
              key={division.name}
              className="group bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${division.color}`}>
                      {division.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white">{division.name}</CardTitle>
                      <p className="text-slate-400">{division.tagline}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-slate-300 border-slate-600">
                    Division {index + 1}
                  </Badge>
                </div>

                <p className="text-slate-300 text-lg leading-relaxed">{division.description}</p>
              </CardHeader>

              <CardContent>
                {/* Services */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
                    Key Services
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {division.services.map(service => (
                      <Badge
                        key={service}
                        variant="secondary"
                        className="bg-slate-800 text-slate-300 hover:bg-slate-700"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
                    Performance Metrics
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(division.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-white">{value}</div>
                        <div className="text-xs text-slate-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Link href={division.href}>
                  <Button
                    className={`w-full bg-gradient-to-r ${division.color} hover:scale-105 transition-all duration-300 text-white border-none`}
                  >
                    Explore {division.name}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Build Something Extraordinary?
          </h3>
          <p className="text-xl text-slate-300 mb-8">
            Let&apos;s discuss how TitanWorks can accelerate your next project
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Start a Project
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-400" />
              <div>
                <div className="text-white font-bold text-lg">TitanWorks Ltd</div>
                <div className="text-slate-400 text-sm">Innovation • Excellence • Results</div>
              </div>
            </div>

            <div className="text-slate-400 text-sm">
              © 2023-2025 TitanWorks Ltd. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
