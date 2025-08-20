'use client';

import { Camera, Crown, Edit, Settings, Shield, Star, User, Users } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';

export default function AvatarDemo() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);

  const teamMembers = [
    {
      id: '1',
      name: 'Alex Johnson',
      role: 'Lead Developer',
      status: 'online' as const,
      avatar: '/daedalus.png',
      initials: 'AJ',
    },
    {
      id: '2',
      name: 'Sarah Chen',
      role: 'UX Designer',
      status: 'online' as const,
      avatar: '', // Will show fallback
      initials: 'SC',
    },
    {
      id: '3',
      name: 'Michael Brown',
      role: 'Product Manager',
      status: 'offline' as const,
      avatar: '',
      initials: 'MB',
    },
    {
      id: '4',
      name: 'Lisa Wang',
      role: 'Backend Engineer',
      status: 'online' as const,
      avatar: '',
      initials: 'LW',
    },
  ];

  const getStatusColor = (status: 'online' | 'offline') => {
    return status === 'online' ? 'bg-green-500' : 'bg-gray-400';
  };

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Avatar Component</h1>
        <p className="text-muted-foreground">
          User profile pictures with fallbacks, sizes, and status indicators
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <p className="text-sm text-muted-foreground">
              Standard avatar sizes and fallback behaviors
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Sizes</h4>
                <div className="flex items-center gap-4">
                  <div className="text-center space-y-1">
                    <Avatar size="sm" name="Small User">
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-muted-foreground">Small</p>
                  </div>

                  <div className="text-center space-y-1">
                    <Avatar name="Default User">
                      <AvatarFallback>DF</AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-muted-foreground">Default</p>
                  </div>

                  <div className="text-center space-y-1">
                    <Avatar size="lg" name="Large User">
                      <AvatarFallback>LG</AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-muted-foreground">Large</p>
                  </div>

                  <div className="text-center space-y-1">
                    <Avatar size="xl" name="Extra Large">
                      <AvatarFallback>XL</AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-muted-foreground">Extra Large</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">With Initials</h4>
                <div className="flex items-center gap-3">
                  <Avatar name="John Doe">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar name="Jane Smith">
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <Avatar name="Bob Wilson">
                    <AvatarFallback>BW</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Advanced Usage</h3>
            <p className="text-sm text-muted-foreground">
              Complex avatar scenarios with status indicators, groups, and interactive features
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-6">
            {/* Team Member List */}
            <div>
              <h4 className="font-medium mb-3">Team Members with Status</h4>
              <div className="space-y-3">
                {teamMembers.map(member => (
                  <div
                    key={member.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedUser === member.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedUser(selectedUser === member.id ? null : member.id)}
                  >
                    <div className="relative">
                      <Avatar name={member.name}>
                        {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      {showOnlineStatus && (
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{member.name}</p>
                        {member.role === 'Lead Developer' && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>

                    <Badge
                      variant={member.status === 'online' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {member.status}
                    </Badge>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowOnlineStatus(!showOnlineStatus)}
                  >
                    {showOnlineStatus ? 'Hide' : 'Show'} Status Indicators
                  </Button>

                  {selectedUser && (
                    <div className="text-sm text-muted-foreground">
                      Selected: {teamMembers.find(m => m.id === selectedUser)?.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Avatar Groups */}
            <div>
              <h4 className="font-medium mb-3">Avatar Groups</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Project collaborators</p>
                  <div className="flex -space-x-2">
                    <Avatar className="border-2 border-background" name="Alice Johnson">
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background" name="Bob Smith">
                      <AvatarFallback>BS</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background" name="Charlie Brown">
                      <AvatarFallback>CB</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background" name="Diana Prince">
                      <AvatarFallback>DP</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 border-2 border-background text-xs font-medium text-gray-600">
                      +3
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Review team (with badges)</p>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Avatar name="Emma Wilson">
                        <AvatarFallback>EW</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1">
                        <Shield className="h-4 w-4 text-blue-500 bg-white rounded-full" />
                      </div>
                    </div>

                    <div className="relative">
                      <Avatar name="Frank Chen">
                        <AvatarFallback>FC</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1">
                        <Star className="h-4 w-4 text-yellow-500 bg-white rounded-full" />
                      </div>
                    </div>

                    <div className="relative">
                      <Avatar name="Grace Davis">
                        <AvatarFallback>GD</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1">
                        <Crown className="h-4 w-4 text-purple-500 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Card with Avatar */}
            <div>
              <h4 className="font-medium mb-3">Profile Card</h4>
              <Card className="max-w-sm">
                <CardHeader className="text-center space-y-3">
                  <div className="relative mx-auto">
                    <Avatar size="xl" name="Sarah Johnson">
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full p-0"
                      variant="outline"
                    >
                      <Camera className="h-3 w-3" />
                    </Button>
                  </div>
                  <div>
                    <CardTitle>Sarah Johnson</CardTitle>
                    <p className="text-sm text-muted-foreground">Senior Designer</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-center gap-2">
                    <Badge variant="outline">
                      <Users className="mr-1 h-3 w-3" />
                      Team Lead
                    </Badge>
                    <Badge variant="outline">
                      <Star className="mr-1 h-3 w-3" />
                      Pro
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <User className="mr-1 h-3 w-3" />
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Loading and Error States */}
            <div>
              <h4 className="font-medium mb-3">Special States</h4>
              <div className="flex gap-4">
                <div className="text-center space-y-2">
                  <Avatar loading name="Loading User">
                    <AvatarFallback>LU</AvatarFallback>
                  </Avatar>
                  <p className="text-xs text-muted-foreground">Loading</p>
                </div>

                <div className="text-center space-y-2">
                  <Avatar name="">
                    <AvatarImage src="/nonexistent-image.jpg" alt="Broken image" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-xs text-muted-foreground">Fallback Icon</p>
                </div>

                <div className="text-center space-y-2">
                  <Avatar className="opacity-50" name="Inactive User">
                    <AvatarFallback>IU</AvatarFallback>
                  </Avatar>
                  <p className="text-xs text-muted-foreground">Inactive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
