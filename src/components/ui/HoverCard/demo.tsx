'use client';

import {
  AlertTriangle,
  BarChart,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Github,
  Globe,
  Info,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Share,
  Star,
  Target,
  TrendingUp,
  Twitter,
  User,
  Users,
  Video,
} from 'lucide-react';
import { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '.';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Separator } from '../Separator';

export default function HoverCardDemo() {
  const [interactions, setInteractions] = useState({
    profileViews: 12,
    messagesSent: 3,
    documentsShared: 8,
    projectsCompleted: 15,
  });

  const incrementInteraction = (type: keyof typeof interactions) => {
    setInteractions(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const userData = {
    name: 'Sarah Johnson',
    role: 'Senior Product Manager',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 234-5678',
    bio: 'Passionate product manager with 8+ years of experience in SaaS and fintech. Leading cross-functional teams to deliver innovative solutions.',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research'],
    stats: {
      projects: 24,
      teamSize: 12,
      satisfaction: 4.8,
      experience: '8 years',
    },
    social: {
      linkedin: 'sarah-johnson-pm',
      twitter: '@sarahpm',
      github: 'sarah-johnson',
    },
  };

  const projectData = {
    name: 'E-commerce Platform',
    status: 'In Progress',
    completion: 75,
    team: 8,
    budget: '$250K',
    deadline: '2024-03-15',
    description:
      'Next-generation e-commerce platform with AI-powered recommendations and real-time analytics.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    risks: ['API Integration', 'Performance'],
    milestones: ['MVP Complete', 'Beta Testing', 'Launch'],
  };

  const companyData = {
    name: 'TechCorp Inc.',
    industry: 'Technology',
    size: '500-1000 employees',
    founded: '2015',
    location: 'San Francisco, CA',
    description: 'Leading provider of enterprise software solutions for digital transformation.',
    metrics: {
      revenue: '$50M',
      growth: '+25%',
      customers: '1000+',
      rating: 4.7,
    },
    benefits: ['Remote Work', 'Health Insurance', '401k Match', 'Learning Budget'],
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">HoverCard Component</h1>
        <p className="text-muted-foreground">
          Rich hover-triggered content for enhanced user experience and contextual information
        </p>
      </div>

      {/* Basic Usage */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Basic Usage</h3>
          <p className="text-sm text-muted-foreground">
            Simple hover cards for quick information display
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Simple Information</h4>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Info className="h-4 w-4 mr-2" />
                    Hover for Info
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Quick Information</h4>
                    <p className="text-sm text-muted-foreground">
                      This is a simple hover card that provides additional context or information
                      about an element.
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      Last updated 2 hours ago
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Status Information</h4>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    System Status
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-3">
                    <h4 className="font-semibold">System Health</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">API Status</span>
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Operational
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Database</span>
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Healthy
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Uptime</span>
                        <span className="text-sm font-medium">99.9%</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Help & Documentation</h4>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Quick Help
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Getting Started</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Click the button to get started</p>
                      <p>• Use keyboard shortcuts for faster navigation</p>
                      <p>• Check the documentation for advanced features</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Docs
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-3 w-3 mr-1" />
                        Tutorial
                      </Button>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </Card>

      {/* User Profile Cards */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="text-xl font-semibold">User Profile Cards</h3>
              <p className="text-sm text-muted-foreground">
                Rich user information on hover with social links and stats
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Team Member Profile</h4>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Avatar className="h-10 w-10">
                  <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    SJ
                  </div>
                </Avatar>
                <div className="flex-1">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button
                        className="text-left hover:underline focus:underline outline-none"
                        onClick={() => incrementInteraction('profileViews')}
                      >
                        <p className="font-medium">{userData.name}</p>
                        <p className="text-sm text-muted-foreground">{userData.role}</p>
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                              SJ
                            </div>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold">{userData.name}</h4>
                            <p className="text-sm text-muted-foreground">{userData.role}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <Building className="h-3 w-3" />
                              {userData.company}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{userData.stats.satisfaction}</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">{userData.bio}</p>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span>{userData.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs">{userData.email}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-3 w-3 text-muted-foreground" />
                              <span>{userData.stats.experience}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span>{userData.stats.teamSize} team members</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">SKILLS</p>
                          <div className="flex flex-wrap gap-1">
                            {userData.skills.map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" variant="outline">
                              <Calendar className="h-3 w-3 mr-1" />
                              Schedule
                            </Button>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Linkedin className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Twitter className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Github className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <Badge variant="outline">Online</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Interaction Stats</h4>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Views</span>
                    <Badge>{interactions.profileViews}</Badge>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Messages</span>
                    <Badge>{interactions.messagesSent}</Badge>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Documents</span>
                    <Badge>{interactions.documentsShared}</Badge>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Projects</span>
                    <Badge>{interactions.projectsCompleted}</Badge>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Business Information Cards */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-green-500" />
            <div>
              <h3 className="text-xl font-semibold">Business Information Cards</h3>
              <p className="text-sm text-muted-foreground">
                Company profiles, project details, and business metrics
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Project Overview</h4>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">{projectData.name}</h5>
                        <p className="text-sm text-muted-foreground">Click for details</p>
                      </div>
                      <Badge
                        variant={projectData.status === 'In Progress' ? 'default' : 'secondary'}
                      >
                        {projectData.status}
                      </Badge>
                    </div>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-96">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{projectData.name}</h4>
                        <p className="text-sm text-muted-foreground">{projectData.description}</p>
                      </div>
                      <Badge variant="outline">{projectData.completion}% Complete</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>{projectData.team} team members</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span>{projectData.budget} budget</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{projectData.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 text-muted-foreground" />
                          <span>On track</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">TECHNOLOGIES</p>
                      <div className="flex flex-wrap gap-1">
                        {projectData.technologies.map(tech => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">RISKS</p>
                      <div className="flex flex-wrap gap-1">
                        {projectData.risks.map(risk => (
                          <Badge key={risk} variant="destructive" className="text-xs">
                            <AlertTriangle className="h-2 w-2 mr-1" />
                            {risk}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Company Profile</h4>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Building className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h5 className="font-medium">{companyData.name}</h5>
                        <p className="text-sm text-muted-foreground">{companyData.industry}</p>
                      </div>
                    </div>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-96">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{companyData.name}</h4>
                        <p className="text-sm text-muted-foreground">{companyData.description}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{companyData.metrics.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>Founded {companyData.founded}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>{companyData.size}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>{companyData.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 text-muted-foreground" />
                          <span>{companyData.metrics.growth} growth</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-2 bg-muted/30 rounded">
                        <p className="text-lg font-semibold">{companyData.metrics.revenue}</p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded">
                        <p className="text-lg font-semibold">{companyData.metrics.customers}</p>
                        <p className="text-xs text-muted-foreground">Customers</p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded">
                        <p className="text-lg font-semibold">{companyData.metrics.rating}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">BENEFITS</p>
                      <div className="flex flex-wrap gap-1">
                        {companyData.benefits.map(benefit => (
                          <Badge key={benefit} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Globe className="h-3 w-3 mr-1" />
                        Website
                      </Button>
                      <Button size="sm" variant="outline">
                        <Briefcase className="h-3 w-3 mr-1" />
                        Careers
                      </Button>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </Card>

      {/* Analytics & Metrics */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <BarChart className="h-5 w-5 text-purple-500" />
            <div>
              <h3 className="text-xl font-semibold">Analytics & Metrics Cards</h3>
              <p className="text-sm text-muted-foreground">
                Performance data and business intelligence on hover
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">98.5%</p>
                      <p className="text-sm text-muted-foreground">Uptime</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-3">
                  <h4 className="font-semibold">System Uptime</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Last 24 hours</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last 7 days</span>
                      <span className="font-medium">99.8%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last 30 days</span>
                      <span className="font-medium">98.5%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last incident: 2 days ago (3 min downtime)
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">1.2K</p>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-3">
                  <h4 className="font-semibold">User Activity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Currently online</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Daily active</span>
                      <span className="font-medium">2,341</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Monthly active</span>
                      <span className="font-medium">8,932</span>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last week
                  </Badge>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">$47K</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-3">
                  <h4 className="font-semibold">Revenue Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subscriptions</span>
                      <span className="font-medium">$35,200</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>One-time purchases</span>
                      <span className="font-medium">$8,900</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Add-ons</span>
                      <span className="font-medium">$2,900</span>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% from last month
                  </Badge>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">4.8</p>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500 fill-current" />
                  </div>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-3">
                  <h4 className="font-semibold">Customer Satisfaction</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>5 stars</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>4 stars</span>
                      <span className="font-medium">22%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>3 stars</span>
                      <span className="font-medium">7%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>1-2 stars</span>
                      <span className="font-medium">3%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Based on 1,247 reviews this month</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </Card>

      {/* Real-World Use Cases */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Enterprise Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Business Intelligence</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• KPI dashboards with detailed metrics</p>
                <p>• Employee profiles and org charts</p>
                <p>• Project status and team information</p>
                <p>• Performance analytics on hover</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">User Experience</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Contextual help and tooltips</p>
                <p>• Rich preview cards for links</p>
                <p>• Quick actions without navigation</p>
                <p>• Progressive information disclosure</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">Productivity</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Quick contact information</p>
                <p>• Document previews and metadata</p>
                <p>• Status indicators and notifications</p>
                <p>• Keyboard navigation support</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Advanced Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div>• Delayed hover triggers</div>
              <div>• Rich content layouts</div>
              <div>• Interactive elements</div>
              <div>• Social media integration</div>
              <div>• Real-time data updates</div>
              <div>• Mobile-friendly design</div>
              <div>• Accessibility support</div>
              <div>• Analytics tracking</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
