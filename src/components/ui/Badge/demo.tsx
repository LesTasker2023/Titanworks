'use client';

import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Crown,
  Star,
  User,
  XCircle,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '.';

export default function BadgeDemo() {
  const [userStatus, setUserStatus] = useState<'online' | 'away' | 'busy' | 'offline'>('online');
  const [notifications, setNotifications] = useState(12);
  const [selectedTags, setSelectedTags] = useState<string[]>(['React', 'TypeScript']);

  const availableTags = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Node.js', 'GraphQL'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Badge Component</h1>
        <p className="text-muted-foreground">
          Status indicators and labels for content categorization
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <p className="text-sm text-muted-foreground">
              Standard badge variants for common UI patterns
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <div>
              <h4 className="font-medium mb-2">Variants</h4>
              <div className="flex gap-2 flex-wrap">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Status Indicators</h4>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Success
                </Badge>
                <Badge variant="default" className="bg-yellow-500">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  Warning
                </Badge>
                <Badge variant="destructive">
                  <XCircle className="mr-1 h-3 w-3" />
                  Error
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Advanced Usage</h3>
            <p className="text-sm text-muted-foreground">
              Interactive badges with complex behaviors and real-world applications
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-6">
            <div>
              <h4 className="font-medium mb-2">User Status Indicator</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <User className="h-8 w-8 rounded-full bg-gray-100 p-1" />
                    <span className="font-medium">John Doe</span>
                  </div>
                  <Badge
                    variant={
                      userStatus === 'online'
                        ? 'default'
                        : userStatus === 'away'
                          ? 'secondary'
                          : userStatus === 'busy'
                            ? 'destructive'
                            : 'outline'
                    }
                    className={
                      userStatus === 'online'
                        ? 'bg-green-500'
                        : userStatus === 'away'
                          ? 'bg-yellow-500'
                          : ''
                    }
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-1 ${
                        userStatus === 'online'
                          ? 'bg-white'
                          : userStatus === 'away'
                            ? 'bg-white'
                            : userStatus === 'busy'
                              ? 'bg-white'
                              : 'bg-gray-400'
                      }`}
                    />
                    {userStatus.charAt(0).toUpperCase() + userStatus.slice(1)}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  {(['online', 'away', 'busy', 'offline'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => setUserStatus(status)}
                      className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Notification Counter</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Bell className="h-6 w-6" />
                    {notifications > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                      >
                        {notifications > 99 ? '99+' : notifications}
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm">Notifications</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setNotifications(prev => prev + 1)}
                    className="px-2 py-1 text-xs rounded bg-blue-100 hover:bg-blue-200"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => setNotifications(0)}
                    className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Tag Selection</h4>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className="cursor-pointer hover:bg-opacity-80"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                      {selectedTags.includes(tag) && <CheckCircle className="ml-1 h-3 w-3" />}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Selected: {selectedTags.length > 0 ? selectedTags.join(', ') : 'None'}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Feature Highlights</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-purple-500">
                    <Crown className="mr-1 h-3 w-3" />
                    Pro
                  </Badge>
                  <span className="text-sm">Premium features available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-orange-500">
                    <Zap className="mr-1 h-3 w-3" />
                    Fast
                  </Badge>
                  <span className="text-sm">Optimized performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                    Featured
                  </Badge>
                  <span className="text-sm">Editor&apos;s choice</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    <Clock className="mr-1 h-3 w-3" />
                    Recent
                  </Badge>
                  <span className="text-sm">Added this week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
