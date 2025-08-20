'use client';

import {
  Bookmark,
  Calendar,
  ExternalLink,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';

export default function CardDemo() {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loadingCard, setLoadingCard] = useState('');

  const handleAsyncAction = async (cardId: string) => {
    setLoadingCard(cardId);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoadingCard('');
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Card Component</h1>
        <p className="text-muted-foreground">
          Flexible content containers with header, content, and footer areas
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <p className="text-sm text-muted-foreground">
              Simple card layouts for displaying content
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Card</CardTitle>
                  <CardDescription>A basic card with title and description.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the main content area of the card.</p>
                </CardContent>
              </Card>

              <Card variant="success">
                <CardHeader>
                  <CardTitle>Success Card</CardTitle>
                  <CardDescription>Card with success variant styling.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Great! Your operation completed successfully.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Continue</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Advanced Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Advanced Usage</h3>
            <p className="text-sm text-muted-foreground">
              Complex card layouts with interactive elements and real-world content
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-6">
            {/* Blog Post Card */}
            <div>
              <h4 className="font-medium mb-3">Blog Post Card</h4>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">Building Modern React Applications</CardTitle>
                      <CardDescription>
                        Learn the latest patterns and best practices for React development in 2024
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Next.js</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Dec 15, 2024</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>1.2k reads</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsLiked(!isLiked)}>
                    <Heart
                      className={`mr-1 h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
                    />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="mr-1 h-4 w-4" />
                    Comment
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="mr-1 h-4 w-4" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Dashboard Stats Cards */}
            <div>
              <h4 className="font-medium mb-3">Dashboard Stats</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Revenue</CardDescription>
                    <CardTitle className="text-2xl">$45,231.89</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-500 font-medium">+20.1%</span>
                      <span className="text-muted-foreground">from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="warning">
                  <CardHeader className="pb-2">
                    <CardDescription>Active Users</CardDescription>
                    <CardTitle className="text-2xl">2,350</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-4 w-4 text-yellow-600" />
                      <span className="text-yellow-600 font-medium">+5.2%</span>
                      <span className="text-muted-foreground">from last week</span>
                    </div>
                  </CardContent>
                </Card>

                <Card loading={loadingCard === 'stats'}>
                  <CardHeader className="pb-2">
                    <CardDescription>Conversion Rate</CardDescription>
                    <CardTitle className="text-2xl">3.2%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAsyncAction('stats')}
                      disabled={loadingCard === 'stats'}
                    >
                      Refresh Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Event Card */}
            <div>
              <h4 className="font-medium mb-3">Event Card</h4>
              <Card className="max-w-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>React Conference 2024</CardTitle>
                      <CardDescription>
                        Join us for the biggest React event of the year
                      </CardDescription>
                    </div>
                    <Badge variant="default" className="bg-blue-500">
                      Live
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>December 20-22, 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>500+ attendees</span>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button className="flex-1">Register Now</Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Disabled Card Example */}
            <div>
              <h4 className="font-medium mb-3">State Variants</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card variant="danger">
                  <CardHeader>
                    <CardTitle>Error State</CardTitle>
                    <CardDescription>Something went wrong with this operation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Please try again or contact support if the issue persists.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="destructive" size="sm">
                      Retry
                    </Button>
                  </CardFooter>
                </Card>

                <Card disabled>
                  <CardHeader>
                    <CardTitle>Disabled Card</CardTitle>
                    <CardDescription>This card is currently disabled</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Card content is not interactive when disabled.</p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" disabled>
                      Unavailable
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
