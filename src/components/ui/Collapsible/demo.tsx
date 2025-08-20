'use client';

import { cn } from '@/lib/utils';
import {
  ChevronDown,
  ChevronRight,
  Code,
  Database,
  FileText,
  HelpCircle,
  Settings,
  Shield,
  Star,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';

export default function CollapsibleDemo() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [faqStates, setFaqStates] = useState<Record<string, boolean>>({});
  const [sidebarStates, setSidebarStates] = useState<Record<string, boolean>>({
    projects: true,
    settings: false,
    help: false,
  });

  const toggleFaq = (key: string) => {
    setFaqStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSidebar = (key: string) => {
    setSidebarStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const faqData = [
    {
      id: 'billing',
      question: 'How does billing work?',
      answer:
        'We bill monthly based on your subscription plan. You can upgrade or downgrade at any time, and changes will be prorated on your next billing cycle.',
    },
    {
      id: 'security',
      question: 'Is my data secure?',
      answer:
        'Yes, we use enterprise-grade security with end-to-end encryption, SOC 2 compliance, and regular security audits to protect your data.',
    },
    {
      id: 'integration',
      question: 'What integrations are available?',
      answer:
        'We support 50+ integrations including Slack, GitHub, Jira, Salesforce, and all major productivity tools. Custom integrations available via API.',
    },
    {
      id: 'support',
      question: 'What support do you provide?',
      answer:
        '24/7 chat support for Pro plans, email support for all plans, comprehensive documentation, and dedicated account managers for Enterprise customers.',
    },
  ];

  const projectData = [
    { name: 'E-commerce Platform', status: 'active', members: 8 },
    { name: 'Mobile App Redesign', status: 'review', members: 5 },
    { name: 'API Integration', status: 'completed', members: 3 },
  ];

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Collapsible Component</h1>
        <p className="text-muted-foreground">
          Expandable content areas with smooth animations and flexible layouts
        </p>
      </div>

      {/* Basic Usage */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <p className="text-sm text-muted-foreground">
            Simple collapsible with trigger and content
          </p>

          <Collapsible open={basicOpen} onOpenChange={setBasicOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 w-full justify-between">
                <span>Click to expand</span>
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform', basicOpen && 'rotate-180')}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 p-4 border rounded-lg bg-muted/50">
              <p className="text-sm">
                This is the collapsible content that can be toggled open and closed. It animates
                smoothly and can contain any React components or HTML elements.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Card>

      {/* Advanced FAQ System */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">FAQ System</h3>
            <p className="text-sm text-muted-foreground">
              Interactive frequently asked questions with individual state management
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map(faq => (
              <Collapsible
                key={faq.id}
                open={faqStates[faq.id]}
                onOpenChange={() => toggleFaq(faq.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 border rounded-lg"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 transition-transform',
                        faqStates[faq.id] && 'rotate-90'
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <div className="pt-2 text-sm text-muted-foreground border-l-2 border-muted pl-4 ml-2">
                    {faq.answer}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </Card>

      {/* Sidebar Navigation */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Navigation Sidebar</h3>
            <p className="text-sm text-muted-foreground">
              Collapsible navigation menus with nested items and icons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Primary Navigation</h4>
              <div className="border rounded-lg p-4 bg-background space-y-1">
                {/* Projects Section */}
                <Collapsible
                  open={sidebarStates.projects}
                  onOpenChange={() => toggleSidebar('projects')}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start gap-2 h-9">
                      <FileText className="h-4 w-4" />
                      Projects
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 ml-auto transition-transform',
                          sidebarStates.projects && 'rotate-180'
                        )}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-6 space-y-1 mt-1">
                    {projectData.map((project, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded text-sm hover:bg-muted/50"
                      >
                        <span>{project.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              project.status === 'active'
                                ? 'default'
                                : project.status === 'review'
                                  ? 'secondary'
                                  : 'outline'
                            }
                            className="text-xs"
                          >
                            {project.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{project.members}</span>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                {/* Settings Section */}
                <Collapsible
                  open={sidebarStates.settings}
                  onOpenChange={() => toggleSidebar('settings')}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start gap-2 h-9">
                      <Settings className="h-4 w-4" />
                      Settings
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 ml-auto transition-transform',
                          sidebarStates.settings && 'rotate-180'
                        )}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-6 space-y-1 mt-1">
                    <Button variant="ghost" className="w-full justify-start text-sm h-8">
                      <Users className="h-3 w-3 mr-2" />
                      Team Management
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm h-8">
                      <Shield className="h-3 w-3 mr-2" />
                      Security
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm h-8">
                      <Database className="h-3 w-3 mr-2" />
                      Integrations
                    </Button>
                  </CollapsibleContent>
                </Collapsible>

                {/* Help Section */}
                <Collapsible open={sidebarStates.help} onOpenChange={() => toggleSidebar('help')}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start gap-2 h-9">
                      <HelpCircle className="h-4 w-4" />
                      Help & Support
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 ml-auto transition-transform',
                          sidebarStates.help && 'rotate-180'
                        )}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-6 space-y-1 mt-1">
                    <Button variant="ghost" className="w-full justify-start text-sm h-8">
                      <Code className="h-3 w-3 mr-2" />
                      API Documentation
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm h-8">
                      <Star className="h-3 w-3 mr-2" />
                      Feature Requests
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Usage Statistics</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm">Open Sections</span>
                  <Badge variant="outline">
                    {Object.values(sidebarStates).filter(Boolean).length}/3
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Projects: {sidebarStates.projects ? 'Expanded' : 'Collapsed'}</p>
                  <p>• Settings: {sidebarStates.settings ? 'Expanded' : 'Collapsed'}</p>
                  <p>• Help: {sidebarStates.help ? 'Expanded' : 'Collapsed'}</p>
                </div>
              </div>
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
              <h4 className="font-medium">Documentation</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• API documentation sections</p>
                <p>• Nested content organization</p>
                <p>• Progressive disclosure</p>
                <p>• Search within sections</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Data Tables</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Expandable row details</p>
                <p>• Nested table relationships</p>
                <p>• Performance optimization</p>
                <p>• Large dataset handling</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Forms & Wizards</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Multi-step form sections</p>
                <p>• Conditional field groups</p>
                <p>• Advanced options toggle</p>
                <p>• Progress tracking</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
