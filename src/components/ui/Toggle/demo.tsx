'use client';

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bell,
  BellOff,
  Bluetooth,
  BluetoothOff,
  Bold,
  Bookmark,
  Code,
  Eye,
  EyeOff,
  Filter,
  Grid,
  Heart,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Lock,
  Pause,
  Play,
  Quote,
  RotateCcw,
  Settings,
  Share2,
  Star,
  Underline,
  Unlock,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { useState } from 'react';
import { Toggle } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader } from '../Card';
import { Label } from '../Label';

interface ToolbarState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  alignLeft: boolean;
  alignCenter: boolean;
  alignRight: boolean;
  list: boolean;
  orderedList: boolean;
  quote: boolean;
  code: boolean;
  link: boolean;
  image: boolean;
}

interface MediaControls {
  playing: boolean;
  muted: boolean;
  repeat: boolean;
  shuffle: boolean;
}

interface SystemSettings {
  wifi: boolean;
  bluetooth: boolean;
  notifications: boolean;
  location: boolean;
  darkMode: boolean;
  autoUpdate: boolean;
  backup: boolean;
  sync: boolean;
}

export default function ToggleDemo() {
  const [basicToggle, setBasicToggle] = useState(false);
  const [disabledToggle] = useState(true);

  const [toolbar, setToolbar] = useState<ToolbarState>({
    bold: false,
    italic: false,
    underline: false,
    alignLeft: true,
    alignCenter: false,
    alignRight: false,
    list: false,
    orderedList: false,
    quote: false,
    code: false,
    link: false,
    image: false,
  });

  const [media, setMedia] = useState<MediaControls>({
    playing: false,
    muted: false,
    repeat: false,
    shuffle: false,
  });

  const [system, setSystem] = useState<SystemSettings>({
    wifi: true,
    bluetooth: false,
    notifications: true,
    location: false,
    darkMode: false,
    autoUpdate: true,
    backup: true,
    sync: false,
  });

  const [favorites, setFavorites] = useState({
    starred: false,
    liked: false,
    bookmarked: false,
    shared: false,
  });

  const [viewSettings, setViewSettings] = useState({
    showGrid: true,
    showFilters: false,
    compactView: false,
    autoRefresh: true,
  });

  const updateToolbar = (key: keyof ToolbarState) => {
    setToolbar(prev => {
      const newState = { ...prev };

      // Handle alignment exclusivity
      if (key === 'alignLeft' || key === 'alignCenter' || key === 'alignRight') {
        newState.alignLeft = false;
        newState.alignCenter = false;
        newState.alignRight = false;
        newState[key] = true;
      } else {
        newState[key] = !prev[key];
      }

      return newState;
    });
  };

  const updateMedia = (key: keyof MediaControls) => {
    setMedia(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const updateSystem = (key: keyof SystemSettings) => {
    setSystem(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const updateFavorite = (key: keyof typeof favorites) => {
    setFavorites(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const updateViewSetting = (key: keyof typeof viewSettings) => {
    setViewSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetAllSettings = () => {
    setToolbar({
      bold: false,
      italic: false,
      underline: false,
      alignLeft: true,
      alignCenter: false,
      alignRight: false,
      list: false,
      orderedList: false,
      quote: false,
      code: false,
      link: false,
      image: false,
    });
    setMedia({
      playing: false,
      muted: false,
      repeat: false,
      shuffle: false,
    });
    setSystem({
      wifi: true,
      bluetooth: false,
      notifications: true,
      location: false,
      darkMode: false,
      autoUpdate: true,
      backup: true,
      sync: false,
    });
    setFavorites({
      starred: false,
      liked: false,
      bookmarked: false,
      shared: false,
    });
    setViewSettings({
      showGrid: true,
      showFilters: false,
      compactView: false,
      autoRefresh: true,
    });
  };

  const getActiveCount = (
    obj: Record<string, boolean> | ToolbarState | MediaControls | SystemSettings
  ) => {
    return Object.values(obj).filter(Boolean).length;
  };

  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Toggle Component</h1>
        <p className="text-muted-foreground text-lg">
          Interactive toggle switches for boolean state management
        </p>
      </div>

      {/* Basic Toggle */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Basic Toggle</h2>
          <p className="text-muted-foreground">Simple toggle switches with different states</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="basic-toggle">Interactive Toggle</Label>
              <div className="flex items-center space-x-3">
                <Toggle
                  id="basic-toggle"
                  pressed={basicToggle}
                  onPressedChange={setBasicToggle}
                  aria-label="Toggle basic state"
                >
                  <Settings className="h-4 w-4" />
                </Toggle>
                <span className="text-sm text-muted-foreground">
                  {basicToggle ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="disabled-toggle">Disabled Toggle</Label>
              <div className="flex items-center space-x-3">
                <Toggle
                  id="disabled-toggle"
                  pressed={disabledToggle}
                  disabled
                  aria-label="Disabled toggle"
                >
                  <Lock className="h-4 w-4" />
                </Toggle>
                <span className="text-sm text-muted-foreground">Disabled State</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Toggle Variants</Label>
              <div className="flex space-x-2">
                <Toggle variant="default" size="sm">
                  <Bold className="h-3 w-3" />
                </Toggle>
                <Toggle variant="outline" size="default">
                  <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle variant="default" size="lg">
                  <Underline className="h-5 w-5" />
                </Toggle>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rich Text Editor Toolbar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Rich Text Editor Toolbar</h2>
              <p className="text-muted-foreground">
                Text formatting toggles with grouped functionality
              </p>
            </div>
            <Badge variant="outline">{getActiveCount(toolbar)}/12 Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Text Formatting */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Text Formatting</Label>
            <div className="flex items-center space-x-1 p-2 border rounded-lg bg-muted/50">
              <Toggle
                pressed={toolbar.bold}
                onPressedChange={() => updateToolbar('bold')}
                aria-label="Bold"
                size="sm"
              >
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={toolbar.italic}
                onPressedChange={() => updateToolbar('italic')}
                aria-label="Italic"
                size="sm"
              >
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={toolbar.underline}
                onPressedChange={() => updateToolbar('underline')}
                aria-label="Underline"
                size="sm"
              >
                <Underline className="h-4 w-4" />
              </Toggle>
            </div>
          </div>

          {/* Text Alignment */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Text Alignment</Label>
            <div className="flex items-center space-x-1 p-2 border rounded-lg bg-muted/50">
              <Toggle
                pressed={toolbar.alignLeft}
                onPressedChange={() => updateToolbar('alignLeft')}
                aria-label="Align left"
                size="sm"
              >
                <AlignLeft className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={toolbar.alignCenter}
                onPressedChange={() => updateToolbar('alignCenter')}
                aria-label="Align center"
                size="sm"
              >
                <AlignCenter className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={toolbar.alignRight}
                onPressedChange={() => updateToolbar('alignRight')}
                aria-label="Align right"
                size="sm"
              >
                <AlignRight className="h-4 w-4" />
              </Toggle>
            </div>
          </div>

          {/* Lists and Elements */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Lists & Elements</Label>
            <div className="flex items-center space-x-1 p-2 border rounded-lg bg-muted/50">
              <Toggle
                pressed={toolbar.list}
                onPressedChange={() => updateToolbar('list')}
                aria-label="Bullet list"
                size="sm"
              >
                <List className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={toolbar.orderedList}
                onPressedChange={() => updateToolbar('orderedList')}
                aria-label="Numbered list"
                size="sm"
              >
                <ListOrdered className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={toolbar.quote}
                onPressedChange={() => updateToolbar('quote')}
                aria-label="Quote"
                size="sm"
              >
                <Quote className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={toolbar.code}
                onPressedChange={() => updateToolbar('code')}
                aria-label="Code"
                size="sm"
              >
                <Code className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={toolbar.link}
                onPressedChange={() => updateToolbar('link')}
                aria-label="Link"
                size="sm"
              >
                <Link className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={toolbar.image}
                onPressedChange={() => updateToolbar('image')}
                aria-label="Image"
                size="sm"
              >
                <Image className="h-4 w-4" />
              </Toggle>
            </div>
          </div>

          {/* Active Formatting Preview */}
          <div className="p-4 border rounded-lg bg-background">
            <div className="text-sm text-muted-foreground mb-2">Active Formatting:</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(toolbar)
                .filter(([, active]) => active)
                .map(([key]) => (
                  <Badge key={key} variant="secondary" className="text-xs">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Badge>
                ))}
              {getActiveCount(toolbar) === 0 && (
                <span className="text-sm text-muted-foreground">No formatting applied</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Player Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Media Player Controls</h2>
              <p className="text-muted-foreground">Audio/video player toggle controls</p>
            </div>
            <Badge variant="outline">{getActiveCount(media)}/4 Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-4 p-6 border rounded-lg bg-muted/30">
            <Toggle
              pressed={media.playing}
              onPressedChange={() => updateMedia('playing')}
              aria-label="Play/Pause"
              size="lg"
            >
              {media.playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Toggle>

            <Toggle
              pressed={media.muted}
              onPressedChange={() => updateMedia('muted')}
              aria-label="Mute/Unmute"
            >
              {media.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Toggle>

            <Toggle
              pressed={media.repeat}
              onPressedChange={() => updateMedia('repeat')}
              aria-label="Repeat"
              variant="outline"
            >
              <RotateCcw className="h-4 w-4" />
            </Toggle>

            <Toggle
              pressed={media.shuffle}
              onPressedChange={() => updateMedia('shuffle')}
              aria-label="Shuffle"
              variant="outline"
            >
              <Settings className="h-4 w-4" />
            </Toggle>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Player Status: {media.playing ? 'Playing' : 'Paused'} | Volume:{' '}
            {media.muted ? 'Muted' : 'On'} | Repeat: {media.repeat ? 'On' : 'Off'} | Shuffle:{' '}
            {media.shuffle ? 'On' : 'Off'}
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">System Settings</h2>
              <p className="text-muted-foreground">Device and system preference toggles</p>
            </div>
            <Badge variant="outline">{getActiveCount(system)}/8 Enabled</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'wifi', label: 'Wi-Fi Connection', icon: system.wifi ? Wifi : WifiOff },
              {
                key: 'bluetooth',
                label: 'Bluetooth',
                icon: system.bluetooth ? Bluetooth : BluetoothOff,
              },
              {
                key: 'notifications',
                label: 'Notifications',
                icon: system.notifications ? Bell : BellOff,
              },
              { key: 'location', label: 'Location Services', icon: system.location ? Eye : EyeOff },
              { key: 'darkMode', label: 'Dark Mode', icon: system.darkMode ? Eye : EyeOff },
              { key: 'autoUpdate', label: 'Auto Updates', icon: Settings },
              { key: 'backup', label: 'Auto Backup', icon: system.backup ? Lock : Unlock },
              { key: 'sync', label: 'Cloud Sync', icon: Share2 },
            ].map(({ key, label, icon: Icon }) => (
              <Card key={key} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <Label className="font-medium">{label}</Label>
                  </div>
                  <Toggle
                    pressed={system[key as keyof SystemSettings]}
                    onPressedChange={() => updateSystem(key as keyof SystemSettings)}
                    aria-label={`Toggle ${label}`}
                  >
                    {system[key as keyof SystemSettings] ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Toggle>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Actions & View Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Social Actions */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Social Actions</h2>
            <p className="text-sm text-muted-foreground">User engagement toggles</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'starred', label: 'Star this item', icon: Star },
              { key: 'liked', label: 'Like this post', icon: Heart },
              { key: 'bookmarked', label: 'Bookmark for later', icon: Bookmark },
              { key: 'shared', label: 'Share with others', icon: Share2 },
            ].map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{label}</span>
                </div>
                <Toggle
                  pressed={favorites[key as keyof typeof favorites]}
                  onPressedChange={() => updateFavorite(key as keyof typeof favorites)}
                  aria-label={label}
                  size="sm"
                >
                  <Icon className="h-3 w-3" />
                </Toggle>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* View Settings */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">View Settings</h2>
            <p className="text-sm text-muted-foreground">Interface display options</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'showGrid', label: 'Show grid view', icon: Grid },
              { key: 'showFilters', label: 'Show filter panel', icon: Filter },
              { key: 'compactView', label: 'Compact display', icon: List },
              { key: 'autoRefresh', label: 'Auto refresh data', icon: RotateCcw },
            ].map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{label}</span>
                </div>
                <Toggle
                  pressed={viewSettings[key as keyof typeof viewSettings]}
                  onPressedChange={() => updateViewSetting(key as keyof typeof viewSettings)}
                  aria-label={label}
                  size="sm"
                >
                  <Icon className="h-3 w-3" />
                </Toggle>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Reset Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Toggle Management</h2>
              <p className="text-muted-foreground">Bulk toggle operations and statistics</p>
            </div>
            <Button onClick={resetAllSettings} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{getActiveCount(toolbar)}</div>
              <div className="text-sm text-muted-foreground">Toolbar Active</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{getActiveCount(media)}</div>
              <div className="text-sm text-muted-foreground">Media Controls</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{getActiveCount(system)}</div>
              <div className="text-sm text-muted-foreground">System Settings</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">
                {getActiveCount(favorites) + getActiveCount(viewSettings)}
              </div>
              <div className="text-sm text-muted-foreground">Social & View</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Usage Guidelines</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use toggles for binary state changes</li>
              <li>• Group related toggles together logically</li>
              <li>• Provide clear labels and icons</li>
              <li>• Consider exclusive groups for radio-like behavior</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">Accessibility</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Include proper ARIA labels for screen readers</li>
              <li>• Ensure sufficient color contrast for states</li>
              <li>• Support keyboard navigation</li>
              <li>• Provide visual feedback for state changes</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
