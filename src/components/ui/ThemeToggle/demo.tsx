'use client';

import {
  Activity,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Globe,
  Laptop,
  Monitor,
  Moon,
  RefreshCw,
  RotateCcw,
  Smartphone,
  Sun,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader } from '../Card';
import { Label } from '../Label';

interface ThemePreference {
  mode: 'light' | 'dark' | 'system';
  colorScheme: 'default' | 'blue' | 'green' | 'purple' | 'orange';
  accessibility: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  autoSwitch: boolean;
  scheduleEnabled: boolean;
  syncAcrossDevices: boolean;
}

interface ScheduleSettings {
  lightTime: string;
  darkTime: string;
  location: 'manual' | 'auto';
}

export default function ThemeToggleDemo() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [preferences, setPreferences] = useState<ThemePreference>({
    mode: 'system',
    colorScheme: 'default',
    accessibility: false,
    highContrast: false,
    reducedMotion: false,
    autoSwitch: true,
    scheduleEnabled: false,
    syncAcrossDevices: true,
  });

  const [schedule, setSchedule] = useState<ScheduleSettings>({
    lightTime: '06:00',
    darkTime: '20:00',
    location: 'auto',
  });

  const [systemTime, setSystemTime] = useState(new Date());
  const [appliedCount, setAppliedCount] = useState(0);

  // Update system time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme switching logic
  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setCurrentTheme(theme);
    setPreferences(prev => ({ ...prev, mode: theme }));

    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System theme - check user's preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    setAppliedCount(prev => prev + 1);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePreferenceChange = (key: keyof ThemePreference, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleScheduleChange = (key: keyof ScheduleSettings, value: string) => {
    setSchedule(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getColorSchemeColor = (scheme: string) => {
    switch (scheme) {
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-green-500';
      case 'purple':
        return 'bg-purple-500';
      case 'orange':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const exportSettings = () => {
    const settings = { preferences, schedule };
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetSettings = () => {
    const defaultPrefs: ThemePreference = {
      mode: 'system',
      colorScheme: 'default',
      accessibility: false,
      highContrast: false,
      reducedMotion: false,
      autoSwitch: true,
      scheduleEnabled: false,
      syncAcrossDevices: true,
    };
    setPreferences(defaultPrefs);
    setCurrentTheme('system');
    handleThemeChange('system');
  };

  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Theme Toggle Component</h1>
        <p className="text-muted-foreground text-lg">
          Switch between light, dark, and system themes with advanced customization
        </p>
      </div>

      {/* Basic Theme Toggle */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Basic Theme Toggle</h2>
          <p className="text-muted-foreground">Simple theme switching functionality</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-4 p-6 border rounded-lg">
            <ThemeToggle />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Current theme:</p>
              <div className="flex items-center gap-2 mt-1">
                {getThemeIcon(currentTheme)}
                <span className="capitalize font-medium">{currentTheme}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={currentTheme === 'light' ? 'default' : 'outline'}
              onClick={() => handleThemeChange('light')}
              className="flex items-center gap-2"
            >
              <Sun className="h-4 w-4" />
              Light
            </Button>
            <Button
              variant={currentTheme === 'dark' ? 'default' : 'outline'}
              onClick={() => handleThemeChange('dark')}
              className="flex items-center gap-2"
            >
              <Moon className="h-4 w-4" />
              Dark
            </Button>
            <Button
              variant={currentTheme === 'system' ? 'default' : 'outline'}
              onClick={() => handleThemeChange('system')}
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" />
              System
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Theme Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Advanced Theme Settings</h2>
              <p className="text-muted-foreground">Comprehensive theme customization options</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                {appliedCount} Changes Applied
              </Badge>
              <Button variant="outline" size="sm" onClick={exportSettings}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={resetSettings}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Mode Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Theme Mode</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { mode: 'light', icon: Sun, label: 'Light Theme', desc: 'Always use light theme' },
                { mode: 'dark', icon: Moon, label: 'Dark Theme', desc: 'Always use dark theme' },
                {
                  mode: 'system',
                  icon: Monitor,
                  label: 'System Default',
                  desc: 'Follow system preference',
                },
              ].map(({ mode, icon: Icon, label, desc }) => (
                <Card
                  key={mode}
                  className={`p-4 cursor-pointer border-2 transition-all ${
                    preferences.mode === mode
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : 'border-border hover:border-blue-300'
                  }`}
                  onClick={() => {
                    handlePreferenceChange('mode', mode);
                    handleThemeChange(mode as 'light' | 'dark' | 'system');
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{label}</div>
                      <div className="text-sm text-muted-foreground">{desc}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Color Scheme */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Color Scheme</Label>
            <div className="flex gap-3 flex-wrap">
              {[
                { scheme: 'default', label: 'Default', color: 'bg-gray-500' },
                { scheme: 'blue', label: 'Blue', color: 'bg-blue-500' },
                { scheme: 'green', label: 'Green', color: 'bg-green-500' },
                { scheme: 'purple', label: 'Purple', color: 'bg-purple-500' },
                { scheme: 'orange', label: 'Orange', color: 'bg-orange-500' },
              ].map(({ scheme, label, color }) => (
                <Button
                  key={scheme}
                  variant={preferences.colorScheme === scheme ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePreferenceChange('colorScheme', scheme)}
                  className="flex items-center gap-2"
                >
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Accessibility Options */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Accessibility & Preferences</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  key: 'accessibility',
                  label: 'Enhanced Accessibility',
                  icon: Eye,
                  desc: 'Improve screen reader support',
                },
                {
                  key: 'highContrast',
                  label: 'High Contrast Mode',
                  icon: Zap,
                  desc: 'Increase color contrast',
                },
                {
                  key: 'reducedMotion',
                  label: 'Reduced Motion',
                  icon: Activity,
                  desc: 'Minimize animations',
                },
                {
                  key: 'autoSwitch',
                  label: 'Auto Theme Switch',
                  icon: RefreshCw,
                  desc: 'Switch based on time',
                },
                {
                  key: 'scheduleEnabled',
                  label: 'Custom Schedule',
                  icon: Clock,
                  desc: 'Set custom switch times',
                },
                {
                  key: 'syncAcrossDevices',
                  label: 'Sync Across Devices',
                  icon: Globe,
                  desc: 'Sync theme settings',
                },
              ].map(({ key, label, icon: Icon, desc }) => (
                <Card key={key} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{label}</div>
                        <div className="text-sm text-muted-foreground">{desc}</div>
                      </div>
                    </div>
                    <Button
                      variant={preferences[key as keyof ThemePreference] ? 'default' : 'outline'}
                      size="sm"
                      onClick={() =>
                        handlePreferenceChange(
                          key as keyof ThemePreference,
                          !preferences[key as keyof ThemePreference]
                        )
                      }
                    >
                      {preferences[key as keyof ThemePreference] ? 'On' : 'Off'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Schedule Settings */}
          {preferences.scheduleEnabled && (
            <div className="space-y-3">
              <Label className="text-base font-semibold">Schedule Settings</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-yellow-500" />
                      <Label>Light Theme Time</Label>
                    </div>
                    <input
                      type="time"
                      value={schedule.lightTime}
                      onChange={e => handleScheduleChange('lightTime', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-blue-500" />
                      <Label>Dark Theme Time</Label>
                    </div>
                    <input
                      type="time"
                      value={schedule.darkTime}
                      onChange={e => handleScheduleChange('darkTime', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </Card>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Current time: {systemTime.toLocaleTimeString()}
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Location: {schedule.location === 'auto' ? 'Automatic' : 'Manual'}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Theme Preview */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Theme Preview</h2>
          <p className="text-muted-foreground">See how different themes look in various contexts</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Application Preview */}
            <Card className="p-4">
              <h4 className="font-semibold mb-3">Application Interface</h4>
              <div className="space-y-3 p-4 border rounded-lg bg-background">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Dashboard</h5>
                  <Badge>Live Preview</Badge>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-blue-200 dark:bg-blue-800 rounded w-3/4"></div>
                  <div className="h-2 bg-green-200 dark:bg-green-800 rounded w-1/2"></div>
                  <div className="h-2 bg-purple-200 dark:bg-purple-800 rounded w-2/3"></div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Primary Action</Button>
                  <Button size="sm" variant="outline">
                    Secondary
                  </Button>
                </div>
              </div>
            </Card>

            {/* Device Sync Status */}
            <Card className="p-4">
              <h4 className="font-semibold mb-3">Device Synchronization</h4>
              <div className="space-y-3">
                {[
                  { device: 'Desktop', icon: Monitor, status: 'Synced', color: 'text-green-600' },
                  { device: 'Laptop', icon: Laptop, status: 'Synced', color: 'text-green-600' },
                  {
                    device: 'Phone',
                    icon: Smartphone,
                    status: 'Pending',
                    color: 'text-yellow-600',
                  },
                ].map(({ device, icon: Icon, status, color }) => (
                  <div
                    key={device}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{device}</span>
                    </div>
                    <Badge variant="outline" className={color}>
                      {status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">User Experience</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Respect user&apos;s system preferences by default</li>
              <li>• Provide smooth transitions between themes</li>
              <li>• Remember user&apos;s choice across sessions</li>
              <li>• Offer accessibility-friendly options</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">Implementation</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use CSS custom properties for theme variables</li>
              <li>• Implement proper contrast ratios for accessibility</li>
              <li>• Test themes with various content types</li>
              <li>• Consider reduced motion preferences</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
