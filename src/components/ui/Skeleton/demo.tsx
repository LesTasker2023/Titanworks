'use client';

import {
  Activity,
  BarChart3,
  DollarSign,
  Heart,
  Loader2,
  MessageSquare,
  Play,
  RefreshCw,
  Share,
  SkipBack,
  SkipForward,
  TrendingUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader } from '../Card';
import { Separator } from '../Separator';

interface LoadingState {
  profile: boolean;
  posts: boolean;
  comments: boolean;
  dashboard: boolean;
  music: boolean;
  products: boolean;
  analytics: boolean;
  messages: boolean;
}

interface PostData {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

interface ProductData {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

interface MessageData {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  timestamp: string;
  unread: boolean;
}

export default function SkeletonDemo() {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({
    profile: true,
    posts: true,
    comments: true,
    dashboard: true,
    music: true,
    products: true,
    analytics: true,
    messages: true,
  });

  const [loadedData, setLoadedData] = useState({
    posts: [] as PostData[],
    products: [] as ProductData[],
    messages: [] as MessageData[],
  });

  // Simulate data loading with different timing
  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, profile: false }));
      }, 1500),
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, dashboard: false }));
      }, 2000),
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, music: false }));
      }, 2500),
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, analytics: false }));
      }, 3000),
      setTimeout(() => {
        setLoadedData(prev => ({
          ...prev,
          posts: [
            {
              id: '1',
              author: 'Sarah Johnson',
              avatar: '👩‍💼',
              content:
                'Excited to share our latest product update! The new features are going to revolutionize how teams collaborate.',
              timestamp: '2 hours ago',
              likes: 42,
              comments: 8,
              shares: 3,
            },
            {
              id: '2',
              author: 'Mike Chen',
              avatar: '👨‍💻',
              content:
                'Just finished an amazing workshop on AI and machine learning. The future of technology is here!',
              timestamp: '4 hours ago',
              likes: 28,
              comments: 12,
              shares: 7,
            },
          ],
        }));
        setLoadingStates(prev => ({ ...prev, posts: false }));
      }, 3500),
      setTimeout(() => {
        setLoadedData(prev => ({
          ...prev,
          products: [
            {
              id: '1',
              name: 'Premium Wireless Headphones',
              price: '$299.99',
              image: '🎧',
              rating: 4.8,
              reviews: 1247,
              badge: 'Best Seller',
            },
            {
              id: '2',
              name: 'Smart Fitness Watch',
              price: '$199.99',
              image: '⌚',
              rating: 4.6,
              reviews: 892,
            },
            {
              id: '3',
              name: 'Portable Bluetooth Speaker',
              price: '$149.99',
              image: '🔊',
              rating: 4.7,
              reviews: 634,
              badge: 'New',
            },
          ],
        }));
        setLoadingStates(prev => ({ ...prev, products: false }));
      }, 4000),
      setTimeout(() => {
        setLoadedData(prev => ({
          ...prev,
          messages: [
            {
              id: '1',
              sender: 'Alice Cooper',
              avatar: '👩‍🎨',
              message: 'Hey! Are you available for a quick call this afternoon?',
              timestamp: '5 min ago',
              unread: true,
            },
            {
              id: '2',
              sender: 'Bob Wilson',
              avatar: '👨‍🔧',
              message: 'The project proposal looks great. I have a few suggestions to discuss.',
              timestamp: '15 min ago',
              unread: true,
            },
            {
              id: '3',
              sender: 'Carol Davis',
              avatar: '👩‍💼',
              message: "Thanks for the meeting yesterday. I'll send over the documents today.",
              timestamp: '1 hour ago',
              unread: false,
            },
          ],
        }));
        setLoadingStates(prev => ({ ...prev, messages: false, comments: false }));
      }, 4500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleRefresh = (section: keyof LoadingState) => {
    setLoadingStates(prev => ({ ...prev, [section]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [section]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Skeleton Component</h1>
        <p className="text-muted-foreground text-lg">
          Loading state placeholders for better user experience
        </p>
      </div>

      {/* Basic Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Basic Examples</h2>
          <p className="text-muted-foreground">Simple skeleton patterns for common UI elements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-3">Text Skeletons</h3>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  Used for loading text content of varying lengths
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-3">Shape Skeletons</h3>
            <div className="space-y-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-20 w-full rounded-md" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  Circular and rectangular shapes for images and buttons
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-3">Complex Layouts</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-16 w-full" />
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  Combined patterns for user profiles and content cards
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Advanced Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Advanced Examples</h2>
          <p className="text-muted-foreground">
            Real-world loading states for enterprise applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Profile Loading */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">User Profile</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRefresh('profile')}
                disabled={loadingStates.profile}
              >
                {loadingStates.profile ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {loadingStates.profile ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                    <Skeleton className="h-3 w-4/6" />
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-16 rounded-full" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">👨‍💼</div>
                    <div className="space-y-1">
                      <h4 className="font-semibold">John Anderson</h4>
                      <p className="text-sm text-muted-foreground">Senior Product Manager</p>
                      <p className="text-xs text-muted-foreground">San Francisco, CA</p>
                    </div>
                  </div>
                  <Separator />
                  <p className="text-sm">
                    Passionate about building products that make a difference. 10+ years of
                    experience in product management and team leadership. Always learning and
                    growing.
                  </p>
                  <div className="flex space-x-2">
                    <Badge>Product</Badge>
                    <Badge>Leadership</Badge>
                    <Badge>Strategy</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dashboard Loading */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">Dashboard Analytics</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRefresh('dashboard')}
                disabled={loadingStates.dashboard}
              >
                {loadingStates.dashboard ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {loadingStates.dashboard ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-8 w-28" />
                    </div>
                  </div>
                  <Skeleton className="h-32 w-full" />
                  <div className="grid grid-cols-3 gap-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">$45,231</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-2xl font-bold">2,341</p>
                    </div>
                  </div>
                  <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Growth
                    </Button>
                    <Button variant="outline" size="sm">
                      <Activity className="h-4 w-4 mr-1" />
                      Activity
                    </Button>
                    <Button variant="outline" size="sm">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Revenue
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Social Posts Loading */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">Social Feed</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRefresh('posts')}
                disabled={loadingStates.posts}
              >
                {loadingStates.posts ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {loadingStates.posts ? (
                <div className="space-y-6">
                  {[1, 2].map(i => (
                    <div key={i} className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-3 w-32" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <div className="flex space-x-4">
                        <Skeleton className="h-6 w-12" />
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-12" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {loadedData.posts.map(post => (
                    <div key={post.id} className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{post.avatar}</div>
                        <div>
                          <p className="font-semibold text-sm">{post.author}</p>
                          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                        </div>
                      </div>
                      <p className="text-sm">{post.content}</p>
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <button className="flex items-center space-x-1 hover:text-interactive transition-colors">
                          <Heart className="h-4 w-4" />
                          <span className="text-xs">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-interactive transition-colors">
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-xs">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-interactive transition-colors">
                          <Share className="h-4 w-4" />
                          <span className="text-xs">{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Music Player Loading */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">Music Player</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRefresh('music')}
                disabled={loadingStates.music}
              >
                {loadingStates.music ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {loadingStates.music ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-2 w-full" />
                  <div className="flex justify-center space-x-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center text-white text-2xl">
                      🎵
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Bohemian Rhapsody</h4>
                      <p className="text-sm text-muted-foreground">Queen</p>
                      <p className="text-xs text-muted-foreground">A Night at the Opera</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-2 bg-primary rounded-full w-1/3"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>2:15</span>
                      <span>5:55</span>
                    </div>
                  </div>
                  <div className="flex justify-center items-center space-x-4">
                    <Button variant="ghost" size="sm">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      <Play className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Messages Loading */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-semibold">Messages</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRefresh('messages')}
              disabled={loadingStates.messages}
            >
              {loadingStates.messages ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            {loadingStates.messages ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center space-x-3 p-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <Skeleton className="h-3 w-full" />
                    </div>
                    <Skeleton className="h-2 w-2 rounded-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {loadedData.messages.map(message => (
                  <div
                    key={message.id}
                    className="flex items-center space-x-3 p-3 hover:bg-muted/50 rounded-lg"
                  >
                    <div className="text-2xl">{message.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-sm">{message.sender}</p>
                        <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{message.message}</p>
                    </div>
                    {message.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Best Practices Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Design Guidelines</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Match skeleton shapes to actual content dimensions</li>
              <li>• Use consistent border radius with your design system</li>
              <li>• Animate skeletons with subtle pulse or shimmer effects</li>
              <li>• Show skeletons for a minimum of 500ms for recognition</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">Implementation</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use skeleton count that matches expected content amount</li>
              <li>• Implement progressive loading for better perceived performance</li>
              <li>• Consider skeleton variations for different viewport sizes</li>
              <li>• Test loading states with slow network conditions</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
