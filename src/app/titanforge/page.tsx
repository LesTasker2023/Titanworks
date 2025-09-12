'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowLeft, Award, Box, Clock, Cog, Layers, Ruler, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function TitanForgePage() {
  const services = [
    {
      name: 'Rapid Prototyping',
      description: 'Fast, accurate prototypes for testing and validation.',
      icon: <Zap className="h-6 w-6" />,
      turnaround: '24-48 hours',
      price: 'From £25',
      features: ['FDM & SLA Printing', 'Multiple Materials', 'High Precision', 'Design Support'],
      applications: [
        'Product Testing',
        'Concept Validation',
        'Design Iteration',
        'Functional Parts',
      ],
    },
    {
      name: 'Custom Manufacturing',
      description: 'Bespoke parts and components manufactured to your exact specifications.',
      icon: <Cog className="h-6 w-6" />,
      turnaround: '3-7 days',
      price: 'From £50',
      features: ['CNC Integration', 'Multi-Material', 'Assembly Services', 'Quality Control'],
      applications: ['Replacement Parts', 'Custom Tools', 'Jigs & Fixtures', 'End-Use Parts'],
    },
    {
      name: 'Design Services',
      description: 'Professional CAD design and engineering support.',
      icon: <Layers className="h-6 w-6" />,
      turnaround: '1-3 days',
      price: 'From £75/hour',
      features: ['3D Modeling', 'CAD Optimization', 'DFM Analysis', 'Technical Drawings'],
      applications: ['Product Design', 'Reverse Engineering', 'Optimization', 'Documentation'],
    },
    {
      name: 'Production Runs',
      description: 'Small to medium batch production with consistent quality.',
      icon: <Box className="h-6 w-6" />,
      turnaround: '1-2 weeks',
      price: 'Quote on request',
      features: ['Batch Production', 'Quality Assurance', 'Material Certification', 'Packaging'],
      applications: ['Product Launch', 'Market Testing', 'Limited Editions', 'Spare Parts'],
    },
  ];

  const materials = [
    {
      name: 'PLA+',
      properties: 'Strong, easy to print, biodegradable',
      applications: 'Prototypes, decorative items, low-stress parts',
      colors: '15+ colors available',
    },
    {
      name: 'PETG',
      properties: 'Chemical resistant, clear, strong',
      applications: 'Food containers, mechanical parts, protective covers',
      colors: '8+ colors available',
    },
    {
      name: 'ABS',
      properties: 'High temperature, impact resistant',
      applications: 'Automotive parts, housings, durable components',
      colors: '10+ colors available',
    },
    {
      name: 'TPU',
      properties: 'Flexible, rubber-like, shock absorbing',
      applications: 'Gaskets, phone cases, flexible joints',
      colors: '6+ colors available',
    },
    {
      name: 'Carbon Fiber',
      properties: 'Ultra-strong, lightweight, premium finish',
      applications: 'Aerospace, automotive, high-performance parts',
      colors: 'Black with CF weave',
    },
  ];

  const capabilities = [
    { name: 'Layer Height', value: '0.05mm - 0.4mm', icon: <Ruler className="h-4 w-4" /> },
    { name: 'Build Volume', value: '300 x 300 x 400mm', icon: <Box className="h-4 w-4" /> },
    { name: 'Print Speed', value: 'Up to 200mm/s', icon: <Zap className="h-4 w-4" /> },
    { name: 'Precision', value: '±0.1mm tolerance', icon: <Award className="h-4 w-4" /> },
  ];

  const stats = [
    { label: 'Projects Completed', value: '200+', icon: <Box className="h-5 w-5" /> },
    { label: 'Materials Available', value: '15+', icon: <Layers className="h-5 w-5" /> },
    { label: 'Precision', value: '±0.1mm', icon: <Ruler className="h-5 w-5" /> },
    { label: 'Turnaround', value: '24hrs', icon: <Clock className="h-5 w-5" /> },
  ];

  const portfolio = [
    {
      title: 'Automotive Prototype',
      description: 'Custom dashboard component for electric vehicle',
      material: 'ABS Carbon Fiber',
      complexity: 'High',
      turnaround: '48 hours',
    },
    {
      title: 'Medical Device Housing',
      description: 'Biocompatible housing for medical equipment',
      material: 'PETG Medical Grade',
      complexity: 'Medium',
      turnaround: '24 hours',
    },
    {
      title: 'Aerospace Bracket',
      description: 'Lightweight mounting bracket for drone application',
      material: 'Carbon Fiber PLA',
      complexity: 'High',
      turnaround: '36 hours',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-slate-900 to-red-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/titanworks"
            className="flex items-center gap-2 text-white hover:text-orange-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to TitanWorks
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mr-4">
                <Box className="h-12 w-12 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold text-white">
                  Titan<span className="text-orange-400">Forge</span>
                </h1>
                <p className="text-orange-300 text-lg">Advanced Manufacturing</p>
              </div>
            </div>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Precision 3D printing, rapid prototyping, and custom manufacturing solutions. From
              concept to creation, we bring your ideas to life with cutting-edge technology.
            </p>

            <div className="flex items-center justify-center gap-6">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                Get Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-orange-300 text-orange-300 hover:bg-orange-300 hover:text-orange-900"
              >
                Upload Design
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
                <div className="flex items-center justify-center text-orange-400 mb-2">
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
          <h2 className="text-4xl font-bold text-white mb-4">Manufacturing Services</h2>
          <p className="text-xl text-slate-300">
            Professional 3D printing and manufacturing solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-600 text-white">{service.icon}</div>
                    <div>
                      <CardTitle className="text-xl text-white">{service.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="border-orange-500 text-orange-400">
                          {service.turnaround}
                        </Badge>
                        <span className="text-orange-300 font-semibold">{service.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-300">{service.description}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applications */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      Applications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.applications.map((app, appIndex) => (
                        <Badge
                          key={appIndex}
                          variant="outline"
                          className="text-xs border-slate-600 text-slate-300"
                        >
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white border-none">
                  Request Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Materials & Capabilities */}
      <div className="bg-black/20 backdrop-blur border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Materials */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Available Materials</h2>
              <div className="space-y-4">
                {materials.map((material, index) => (
                  <Card key={index} className="bg-white/5 backdrop-blur border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{material.name}</h3>
                        <Badge
                          variant="outline"
                          className="text-xs border-orange-500 text-orange-400"
                        >
                          {material.colors}
                        </Badge>
                      </div>
                      <p className="text-slate-300 text-sm mb-2">{material.properties}</p>
                      <p className="text-slate-400 text-xs">{material.applications}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Technical Capabilities</h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {capabilities.map((capability, index) => (
                  <Card key={index} className="bg-white/5 backdrop-blur border-white/10">
                    <CardContent className="p-4 text-center">
                      <div className="flex items-center justify-center text-orange-400 mb-2">
                        {capability.icon}
                      </div>
                      <div className="text-lg font-bold text-white">{capability.value}</div>
                      <div className="text-sm text-slate-300">{capability.name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Quality Assurance</h3>
                <div className="space-y-2">
                  {[
                    'Dimensional accuracy verification',
                    'Surface finish quality control',
                    'Material property testing',
                    'First article inspection',
                    'Batch consistency monitoring',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-orange-400" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Recent Projects</h2>
          <p className="text-xl text-slate-300">
            Examples of precision manufacturing and complex geometries
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
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Material:</span>
                    <Badge variant="outline" className="text-xs border-orange-500 text-orange-400">
                      {project.material}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Complexity:</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        project.complexity === 'High'
                          ? 'border-red-500 text-red-400'
                          : project.complexity === 'Medium'
                            ? 'border-yellow-500 text-yellow-400'
                            : 'border-green-500 text-green-400'
                      }`}
                    >
                      {project.complexity}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Turnaround:</span>
                    <span className="text-white text-sm font-semibold">{project.turnaround}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Bring Your Ideas to Life?</h3>
          <p className="text-xl text-slate-300 mb-8">Upload your design and get an instant quote</p>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
              Upload & Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-300 text-orange-300 hover:bg-orange-300 hover:text-orange-900"
            >
              Design Consultation
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Clock className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Fast Turnaround</div>
              <div className="text-slate-400 text-sm">24-48 hour delivery</div>
            </div>
            <div>
              <Ruler className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Precision Quality</div>
              <div className="text-slate-400 text-sm">±0.1mm tolerance</div>
            </div>
            <div>
              <Award className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Professional Service</div>
              <div className="text-slate-400 text-sm">Expert consultation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
