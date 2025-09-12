'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowLeft, Award, FlaskConical, Shield, Star, Target, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export default function TitanLabsPage() {
  const products = [
    {
      name: 'STRONG Smelling Salts',
      description: 'Maximum strength ammonia capsules for instant focus and energy boost.',
      icon: <Zap className="h-6 w-6" />,
      strength: 'MAXIMUM',
      price: '£12.99',
      features: [
        'Instant Activation',
        'Competition Grade',
        'Single Use Capsules',
        'Lab Tested Purity',
      ],
      benefits: ['Immediate Focus', 'Energy Surge', 'Mental Clarity', 'Performance Boost'],
    },
    {
      name: 'STRONG Pre-Workout',
      description: 'High-stimulant pre-workout formula designed for serious athletes.',
      icon: <Target className="h-6 w-6" />,
      strength: 'HIGH STIM',
      price: '£39.99',
      features: ['400mg Caffeine', 'Beta-Alanine', 'Citrulline Malate', '30 Servings'],
      benefits: ['Explosive Energy', 'Enhanced Pumps', 'Improved Endurance', 'Laser Focus'],
    },
    {
      name: 'STRONG Recovery',
      description: 'Advanced post-workout recovery formula with premium ingredients.',
      icon: <Shield className="h-6 w-6" />,
      strength: 'ADVANCED',
      price: '£34.99',
      features: ['25g Protein Blend', 'BCAAs & EAAs', 'Creatine Monohydrate', 'Electrolytes'],
      benefits: ['Faster Recovery', 'Muscle Growth', 'Reduced Soreness', 'Hydration Support'],
    },
    {
      name: 'STRONG Focus',
      description: 'Nootropic supplement for enhanced cognitive performance and mental clarity.',
      icon: <FlaskConical className="h-6 w-6" />,
      strength: 'COGNITIVE',
      price: '£29.99',
      features: ["Lion's Mane", 'Alpha-GPC', 'Rhodiola Rosea', '60 Capsules'],
      benefits: ['Mental Clarity', 'Enhanced Memory', 'Reduced Stress', 'Cognitive Support'],
    },
  ];

  const research = [
    {
      title: 'Caffeine Optimization',
      description: 'Research into optimal caffeine dosing for sustained energy without crash.',
      status: 'Ongoing',
      findings: '400mg provides 4-6 hour sustained energy with minimal crash',
    },
    {
      title: 'Ammonia Purity Testing',
      description: 'Quality assurance testing for maximum potency and safety standards.',
      status: 'Complete',
      findings: '99.9% purity achieved with controlled release mechanism',
    },
    {
      title: 'Recovery Formula Enhancement',
      description: 'Development of advanced amino acid profiles for optimal recovery.',
      status: 'Phase 2',
      findings: 'New formula shows 40% faster recovery in preliminary trials',
    },
  ];

  const stats = [
    { label: 'Products', value: '15+', icon: <FlaskConical className="h-5 w-5" /> },
    { label: 'Happy Customers', value: '500+', icon: <Users className="h-5 w-5" /> },
    { label: 'Research Hours', value: '1000+', icon: <Target className="h-5 w-5" /> },
    { label: 'Quality Rating', value: '5.0★', icon: <Star className="h-5 w-5" /> },
  ];

  const certifications = [
    'GMP Certified',
    'Lab Tested',
    'Third Party Verified',
    'UK Manufactured',
    'Vegan Options',
    'No Banned Substances',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-slate-900 to-emerald-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/titanworks"
            className="flex items-center gap-2 text-white hover:text-green-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to TitanWorks
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mr-4">
                <FlaskConical className="h-12 w-12 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold text-white">
                  Titan<span className="text-green-400">Labs</span>
                </h1>
                <p className="text-green-300 text-lg">Performance & Wellness</p>
              </div>
            </div>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Scientific approach to supplements and performance enhancement. Home of the STRONG
              brand - premium formulations backed by research and trusted by athletes.
            </p>

            <div className="flex items-center justify-center gap-6">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Shop STRONG
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-300 text-green-300 hover:bg-green-300 hover:text-green-900"
              >
                Research & Testing
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
                <div className="flex items-center justify-center text-green-400 mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* STRONG Brand Products */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-4xl font-bold text-white">STRONG</h2>
            <Badge className="bg-green-600 text-white text-lg px-4 py-1">PREMIUM</Badge>
          </div>
          <p className="text-xl text-slate-300">
            Maximum strength supplements for serious athletes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-600 text-white">{product.icon}</div>
                    <div>
                      <CardTitle className="text-xl text-white">{product.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-green-500 text-green-400">
                          {product.strength}
                        </Badge>
                        <span className="text-green-300 font-bold">{product.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-300">{product.description}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Key Features */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      Benefits
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          <span className="text-slate-300 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none group-hover:scale-105 transition-transform">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Research & Development */}
      <div className="bg-black/20 backdrop-blur border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Research & Development</h2>
            <p className="text-xl text-slate-300">
              Science-backed formulations through rigorous testing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {research.map((study, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg text-white">{study.title}</CardTitle>
                    <Badge
                      variant={study.status === 'Complete' ? 'default' : 'secondary'}
                      className={study.status === 'Complete' ? 'bg-green-600' : 'bg-yellow-600'}
                    >
                      {study.status}
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-sm">{study.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <div className="text-slate-400 mb-1">Key Finding:</div>
                    <div className="text-green-300">{study.findings}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certifications */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Quality Certifications</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-green-500 text-green-400 px-4 py-2"
                >
                  <Award className="h-3 w-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Get STRONG?</h3>
          <p className="text-xl text-slate-300 mb-8">
            Experience the difference that science-backed supplements make
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-300 text-green-300 hover:bg-green-300 hover:text-green-900"
            >
              Wholesale Inquiry
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <FlaskConical className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Lab Tested</div>
              <div className="text-slate-400 text-sm">Verified purity & potency</div>
            </div>
            <div>
              <Zap className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Maximum Strength</div>
              <div className="text-slate-400 text-sm">Premium formulations</div>
            </div>
            <div>
              <Award className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Trusted Quality</div>
              <div className="text-slate-400 text-sm">500+ satisfied customers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
