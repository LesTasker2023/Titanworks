'use client';

import Button from '@/components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { getContent } from '@/lib/siteConfig';
import { ArrowRight, Code, ExternalLink, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

const iconMap = {
  Zap,
  Shield,
  Code,
};

export default function Home() {
  const content = getContent();

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            {content.hero.tagline}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {content.hero.headline}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {content.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href={content.hero.primaryCta.href}>
                {content.hero.primaryCta.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href={content.hero.secondaryCta.href}>
                {content.hero.secondaryCta.text}
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Metrics */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">{content.socialProof.headline}</h2>
          <p className="text-muted-foreground text-center mb-12">
            Trusted metrics from real production usage
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {content.socialProof.metrics.map((metric, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl font-bold text-primary">{metric.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-1">{metric.label}</p>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.valueProps.map((prop, index) => {
              const IconComponent = iconMap[prop.icon as keyof typeof iconMap];

              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
                    </div>
                    <CardTitle className="text-xl">{prop.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{prop.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join developers who ship faster with our component system.
          </p>

          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link href="/component-showcase">
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
