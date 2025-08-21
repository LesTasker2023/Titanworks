'use client';

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Bluetooth,
  Camera,
  Download,
  Eye,
  Filter,
  Flag,
  Globe,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Mic,
  MicOff,
  Monitor,
  Moon,
  RefreshCw,
  Settings,
  Share,
  Shield,
  Smartphone,
  Star,
  Sun,
  Target,
  User,
  Users,
  Volume2,
  VolumeX,
  Wifi,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Switch } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader } from '../Card';
import { Label } from '../Label';
import { Separator } from '../Separator';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  desktop: boolean;
  marketing: boolean;
  security: boolean;
  updates: boolean;
  mentions: boolean;
}

interface PrivacySettings {
  profileVisible: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showActivity: boolean;
  allowMessages: boolean;
  allowCalls: boolean;
  shareData: boolean;
  trackLocation: boolean;
}

interface SystemSettings {
  darkMode: boolean;
  autoUpdate: boolean;
  crashReports: boolean;
  analytics: boolean;
  betaFeatures: boolean;
  notifications: boolean;
  soundEffects: boolean;
  animations: boolean;
}

interface DeviceSettings {
  wifi: boolean;
  bluetooth: boolean;
  location: boolean;
  camera: boolean;
  microphone: boolean;
  nfc: boolean;
  hotspot: boolean;
  airplaneMode: boolean;
}

interface FeatureFlags {
  newDashboard: boolean;
  advancedFilters: boolean;
  realTimeChat: boolean;
  aiAssistant: boolean;
  voiceCommands: boolean;
  gestureControls: boolean;
  offlineMode: boolean;
  multiAccount: boolean;
}

export default function SwitchDemo() {
  const [basicSwitch, setBasicSwitch] = useState(false);
  const [labeledSwitch, setLabeledSwitch] = useState(true);
  const [disabledSwitch, setDisabledSwitch] = useState(false);

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    desktop: true,
    marketing: false,
    security: true,
    updates: true,
    mentions: true,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    showActivity: true,
    allowMessages: true,
    allowCalls: false,
    shareData: false,
    trackLocation: false,
  });

  const [system, setSystem] = useState<SystemSettings>({
    darkMode: false,
    autoUpdate: true,
    crashReports: true,
    analytics: false,
    betaFeatures: false,
    notifications: true,
    soundEffects: true,
    animations: true,
  });

  const [device, setDevice] = useState<DeviceSettings>({
    wifi: true,
    bluetooth: true,
    location: true,
    camera: true,
    microphone: true,
    nfc: false,
    hotspot: false,
    airplaneMode: false,
  });

  const [features, setFeatures] = useState<FeatureFlags>({
    newDashboard: false,
    advancedFilters: true,
    realTimeChat: true,
    aiAssistant: false,
    voiceCommands: false,
    gestureControls: false,
    offlineMode: true,
    multiAccount: false,
  });

  // Apply dark mode effect
  useEffect(() => {
    if (system.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [system.darkMode]);

  const updateNotificationSetting = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updatePrivacySetting = (key: keyof PrivacySettings) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateSystemSetting = (key: keyof SystemSettings) => {
    setSystem(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateDeviceSetting = (key: keyof DeviceSettings) => {
    setDevice(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateFeatureFlag = (key: keyof FeatureFlags) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getActiveCount = (settings: any) => {
    return Object.values(settings).filter(Boolean).length;
  };

  const resetAllSettings = () => {
    setNotifications({
      email: true,
      push: true,
      sms: false,
      desktop: true,
      marketing: false,
      security: true,
      updates: true,
      mentions: true,
    });
    setPrivacy({
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      showActivity: true,
      allowMessages: true,
      allowCalls: false,
      shareData: false,
      trackLocation: false,
    });
    setSystem({
      darkMode: false,
      autoUpdate: true,
      crashReports: true,
      analytics: false,
      betaFeatures: false,
      notifications: true,
      soundEffects: true,
      animations: true,
    });
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Switch Component</h1>
        <p className="text-muted-foreground text-lg">
          Toggle controls for boolean state management in applications
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={resetAllSettings}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Reset All
          </Button>
        </div>
      </div>

      {/* Basic Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Basic Examples</h2>
          <p className="text-muted-foreground">
            Simple switch implementations for common use cases
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Basic Switch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="basic-switch" checked={basicSwitch} onCheckedChange={setBasicSwitch} />
                <Label htmlFor="basic-switch">Toggle me</Label>
              </div>
              <p className="text-sm text-muted-foreground">State: {basicSwitch ? 'On' : 'Off'}</p>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Labeled Switch</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="labeled-switch" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </Label>
                <Switch
                  id="labeled-switch"
                  checked={labeledSwitch}
                  onCheckedChange={setLabeledSwitch}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {labeledSwitch ? 'Receiving notifications' : 'Notifications disabled'}
              </p>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Disabled Switch</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  Admin Only
                </Label>
                <Switch checked={disabledSwitch} onCheckedChange={setDisabledSwitch} disabled />
              </div>
              <p className="text-sm text-muted-foreground">
                This feature requires admin privileges
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Advanced Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Advanced Examples</h2>
          <p className="text-muted-foreground">
            Complex switch configurations for enterprise applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Notification Settings</h3>
                </div>
                <Badge variant="outline">{getActiveCount(notifications)}/8 Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Notifications
                  </Label>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={() => updateNotificationSetting('email')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Push Notifications
                  </Label>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={() => updateNotificationSetting('push')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    SMS Notifications
                  </Label>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={() => updateNotificationSetting('sms')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Desktop Notifications
                  </Label>
                  <Switch
                    checked={notifications.desktop}
                    onCheckedChange={() => updateNotificationSetting('desktop')}
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Marketing Updates
                  </Label>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={() => updateNotificationSetting('marketing')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Security Alerts
                  </Label>
                  <Switch
                    checked={notifications.security}
                    onCheckedChange={() => updateNotificationSetting('security')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    System Updates
                  </Label>
                  <Switch
                    checked={notifications.updates}
                    onCheckedChange={() => updateNotificationSetting('updates')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Mentions & Replies
                  </Label>
                  <Switch
                    checked={notifications.mentions}
                    onCheckedChange={() => updateNotificationSetting('mentions')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Privacy & Visibility</h3>
                </div>
                <Badge variant="outline">{getActiveCount(privacy)}/8 Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Public Profile
                  </Label>
                  <Switch
                    checked={privacy.profileVisible}
                    onCheckedChange={() => updatePrivacySetting('profileVisible')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Show Email Address
                  </Label>
                  <Switch
                    checked={privacy.showEmail}
                    onCheckedChange={() => updatePrivacySetting('showEmail')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Show Phone Number
                  </Label>
                  <Switch
                    checked={privacy.showPhone}
                    onCheckedChange={() => updatePrivacySetting('showPhone')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Show Activity Status
                  </Label>
                  <Switch
                    checked={privacy.showActivity}
                    onCheckedChange={() => updatePrivacySetting('showActivity')}
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Allow Messages
                  </Label>
                  <Switch
                    checked={privacy.allowMessages}
                    onCheckedChange={() => updatePrivacySetting('allowMessages')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Allow Calls
                  </Label>
                  <Switch
                    checked={privacy.allowCalls}
                    onCheckedChange={() => updatePrivacySetting('allowCalls')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Share className="h-4 w-4" />
                    Share Usage Data
                  </Label>
                  <Switch
                    checked={privacy.shareData}
                    onCheckedChange={() => updatePrivacySetting('shareData')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Track Location
                  </Label>
                  <Switch
                    checked={privacy.trackLocation}
                    onCheckedChange={() => updatePrivacySetting('trackLocation')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">System Preferences</h3>
                </div>
                <Badge variant="outline">{getActiveCount(system)}/8 Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    {system.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    Dark Mode
                  </Label>
                  <Switch
                    checked={system.darkMode}
                    onCheckedChange={() => updateSystemSetting('darkMode')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Auto Updates
                  </Label>
                  <Switch
                    checked={system.autoUpdate}
                    onCheckedChange={() => updateSystemSetting('autoUpdate')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Crash Reports
                  </Label>
                  <Switch
                    checked={system.crashReports}
                    onCheckedChange={() => updateSystemSetting('crashReports')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </Label>
                  <Switch
                    checked={system.analytics}
                    onCheckedChange={() => updateSystemSetting('analytics')}
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Beta Features
                  </Label>
                  <Switch
                    checked={system.betaFeatures}
                    onCheckedChange={() => updateSystemSetting('betaFeatures')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    System Notifications
                  </Label>
                  <Switch
                    checked={system.notifications}
                    onCheckedChange={() => updateSystemSetting('notifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    {system.soundEffects ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                    Sound Effects
                  </Label>
                  <Switch
                    checked={system.soundEffects}
                    onCheckedChange={() => updateSystemSetting('soundEffects')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Animations
                  </Label>
                  <Switch
                    checked={system.animations}
                    onCheckedChange={() => updateSystemSetting('animations')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Device Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Device Controls</h3>
                </div>
                <Badge variant="outline">{getActiveCount(device)}/8 Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    WiFi
                  </Label>
                  <Switch
                    checked={device.wifi}
                    onCheckedChange={() => updateDeviceSetting('wifi')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Bluetooth className="h-4 w-4" />
                    Bluetooth
                  </Label>
                  <Switch
                    checked={device.bluetooth}
                    onCheckedChange={() => updateDeviceSetting('bluetooth')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location Services
                  </Label>
                  <Switch
                    checked={device.location}
                    onCheckedChange={() => updateDeviceSetting('location')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Camera Access
                  </Label>
                  <Switch
                    checked={device.camera}
                    onCheckedChange={() => updateDeviceSetting('camera')}
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    {device.microphone ? (
                      <Mic className="h-4 w-4" />
                    ) : (
                      <MicOff className="h-4 w-4" />
                    )}
                    Microphone Access
                  </Label>
                  <Switch
                    checked={device.microphone}
                    onCheckedChange={() => updateDeviceSetting('microphone')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    NFC
                  </Label>
                  <Switch checked={device.nfc} onCheckedChange={() => updateDeviceSetting('nfc')} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    Mobile Hotspot
                  </Label>
                  <Switch
                    checked={device.hotspot}
                    onCheckedChange={() => updateDeviceSetting('hotspot')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Airplane Mode
                  </Label>
                  <Switch
                    checked={device.airplaneMode}
                    onCheckedChange={() => updateDeviceSetting('airplaneMode')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Flags */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flag className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Feature Flags</h3>
              </div>
              <Badge variant="outline">{getActiveCount(features)}/8 Enabled</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    New Dashboard
                  </Label>
                  <Switch
                    checked={features.newDashboard}
                    onCheckedChange={() => updateFeatureFlag('newDashboard')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Advanced Filters
                  </Label>
                  <Switch
                    checked={features.advancedFilters}
                    onCheckedChange={() => updateFeatureFlag('advancedFilters')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Real-time Chat
                  </Label>
                  <Switch
                    checked={features.realTimeChat}
                    onCheckedChange={() => updateFeatureFlag('realTimeChat')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    AI Assistant
                  </Label>
                  <Switch
                    checked={features.aiAssistant}
                    onCheckedChange={() => updateFeatureFlag('aiAssistant')}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    Voice Commands
                  </Label>
                  <Switch
                    checked={features.voiceCommands}
                    onCheckedChange={() => updateFeatureFlag('voiceCommands')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Gesture Controls
                  </Label>
                  <Switch
                    checked={features.gestureControls}
                    onCheckedChange={() => updateFeatureFlag('gestureControls')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Offline Mode
                  </Label>
                  <Switch
                    checked={features.offlineMode}
                    onCheckedChange={() => updateFeatureFlag('offlineMode')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Multi-Account
                  </Label>
                  <Switch
                    checked={features.multiAccount}
                    onCheckedChange={() => updateFeatureFlag('multiAccount')}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">User Experience</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use clear, descriptive labels for switch purposes</li>
              <li>• Group related switches in logical sections</li>
              <li>• Provide immediate visual feedback on state changes</li>
              <li>• Consider the impact of switch changes on user workflow</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">Implementation</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use controlled components for predictable state management</li>
              <li>• Implement proper accessibility with labels and ARIA attributes</li>
              <li>• Consider validation and confirmation for critical settings</li>
              <li>• Persist settings to prevent loss of user preferences</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
