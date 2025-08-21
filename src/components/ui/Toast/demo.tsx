'use client';

import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Download,
  Heart,
  Info,
  Loader2,
  Mail,
  Save,
  Star,
  Trash2,
  Upload,
  X,
  XCircle,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../Button';
import { Card, CardContent, CardHeader } from '../Card';
import { Label } from '../Label';

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: string;
  timestamp: Date;
}

interface ToastSettings {
  position:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
  duration: number;
  maxToasts: number;
  showProgress: boolean;
  soundEnabled: boolean;
  stackable: boolean;
  pauseOnHover: boolean;
}

export default function ToastDemo() {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [settings, setSettings] = useState<ToastSettings>({
    position: 'top-right',
    duration: 5000,
    maxToasts: 5,
    showProgress: true,
    soundEnabled: false,
    stackable: true,
    pauseOnHover: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toastCounter, setToastCounter] = useState(0);

  const createToast = (
    type: ToastNotification['type'],
    title: string,
    message: string,
    action?: string
  ) => {
    const newToast: ToastNotification = {
      id: `toast-${Date.now()}-${Math.random()}`,
      type,
      title,
      message,
      duration: settings.duration,
      action,
      timestamp: new Date(),
    };

    setToasts(prev => {
      const updated = [newToast, ...prev];
      return updated.slice(0, settings.maxToasts);
    });
    setToastCounter(prev => prev + 1);

    // Auto remove toast
    setTimeout(() => {
      removeToast(newToast.id);
    }, settings.duration);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  const updateSetting = (key: keyof ToastSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const getToastIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getToastBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800';
    }
  };

  const handleAsyncAction = async (type: 'save' | 'download' | 'upload' | 'delete') => {
    setIsLoading(true);

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);

    const messages = {
      save: { title: 'File Saved', message: 'Your document has been saved successfully.' },
      download: {
        title: 'Download Complete',
        message: 'Your file has been downloaded to your device.',
      },
      upload: { title: 'Upload Successful', message: 'File uploaded and processed successfully.' },
      delete: { title: 'Item Deleted', message: 'The selected item has been permanently deleted.' },
    };

    createToast('success', messages[type].title, messages[type].message, 'View Details');
  };

  const demoToastExamples = [
    {
      type: 'success' as const,
      title: 'Payment Successful',
      message: 'Your subscription has been activated.',
      action: 'View Receipt',
    },
    {
      type: 'error' as const,
      title: 'Connection Failed',
      message: 'Unable to connect to the server. Please try again.',
      action: 'Retry',
    },
    {
      type: 'warning' as const,
      title: 'Storage Almost Full',
      message: 'You have used 90% of your storage space.',
      action: 'Upgrade Plan',
    },
    {
      type: 'info' as const,
      title: 'New Feature Available',
      message: 'Check out our latest collaboration tools.',
      action: 'Learn More',
    },
  ];

  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Toast Component</h1>
        <p className="text-muted-foreground text-lg">
          Non-intrusive notifications and alerts for user feedback
        </p>
      </div>

      {/* Basic Toast Types */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Basic Toast Types</h2>
          <p className="text-muted-foreground">Different toast notification styles</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              onClick={() =>
                createToast('success', 'Success!', 'Operation completed successfully.')
              }
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Success
            </Button>
            <Button
              onClick={() =>
                createToast('error', 'Error!', 'Something went wrong. Please try again.')
              }
              variant="destructive"
              className="flex items-center gap-2"
            >
              <XCircle className="h-4 w-4" />
              Error
            </Button>
            <Button
              onClick={() =>
                createToast('warning', 'Warning!', 'Please check your input and try again.')
              }
              variant="outline"
              className="flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4" />
              Warning
            </Button>
            <Button
              onClick={() => createToast('info', 'Info', 'Here is some helpful information.')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Info className="h-4 w-4" />
              Info
            </Button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Active toasts: {toasts.length} | Total created: {toastCounter}
            </div>
            <Button
              onClick={clearAllToasts}
              variant="outline"
              size="sm"
              disabled={toasts.length === 0}
            >
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Toast Features */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Advanced Toast Features</h2>
          <p className="text-muted-foreground">Real-world application scenarios with actions</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Application Actions */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Application Actions</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={() => handleAsyncAction('save')}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save
              </Button>
              <Button
                onClick={() => handleAsyncAction('download')}
                disabled={isLoading}
                variant="outline"
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Download
              </Button>
              <Button
                onClick={() => handleAsyncAction('upload')}
                disabled={isLoading}
                variant="outline"
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                Upload
              </Button>
              <Button
                onClick={() => handleAsyncAction('delete')}
                disabled={isLoading}
                variant="destructive"
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Delete
              </Button>
            </div>
          </div>

          {/* Demo Examples */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Example Scenarios</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {demoToastExamples.map((example, index) => (
                <Button
                  key={index}
                  onClick={() =>
                    createToast(example.type, example.title, example.message, example.action)
                  }
                  variant="outline"
                  className="justify-start h-auto p-3"
                >
                  <div className="flex items-start gap-3">
                    {getToastIcon(example.type)}
                    <div className="text-left">
                      <div className="font-medium">{example.title}</div>
                      <div className="text-sm text-muted-foreground">{example.message}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Social Actions */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Social & Engagement</Label>
            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={() =>
                  createToast('success', 'Liked!', 'You liked this post.', 'View Post')
                }
                variant="outline"
                size="sm"
              >
                <Heart className="h-4 w-4 mr-2" />
                Like Post
              </Button>
              <Button
                onClick={() =>
                  createToast(
                    'info',
                    'Message Sent',
                    'Your message has been delivered.',
                    'View Chat'
                  )
                }
                variant="outline"
                size="sm"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button
                onClick={() =>
                  createToast(
                    'success',
                    'Review Added',
                    'Thank you for your 5-star review!',
                    'Share'
                  )
                }
                variant="outline"
                size="sm"
              >
                <Star className="h-4 w-4 mr-2" />
                Add Review
              </Button>
              <Button
                onClick={() =>
                  createToast('warning', 'Limited Time', 'Offer expires in 2 hours!', 'Shop Now')
                }
                variant="outline"
                size="sm"
              >
                <Clock className="h-4 w-4 mr-2" />
                Flash Sale
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Toast Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Toast Settings</h2>
          <p className="text-muted-foreground">Customize toast behavior and appearance</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Position Settings */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Position</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                'top-left',
                'top-center',
                'top-right',
                'bottom-left',
                'bottom-center',
                'bottom-right',
              ].map(position => (
                <Button
                  key={position}
                  variant={settings.position === position ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSetting('position', position)}
                  className="capitalize"
                >
                  {position.replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>

          {/* Duration and Limits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Duration (seconds)</Label>
              <div className="flex gap-2">
                {[3, 5, 8, 10].map(duration => (
                  <Button
                    key={duration}
                    variant={settings.duration === duration * 1000 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateSetting('duration', duration * 1000)}
                  >
                    {duration}s
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Max Toasts</Label>
              <div className="flex gap-2">
                {[3, 5, 8, 10].map(max => (
                  <Button
                    key={max}
                    variant={settings.maxToasts === max ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateSetting('maxToasts', max)}
                  >
                    {max}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Behavior Settings */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Behavior Options</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'showProgress', label: 'Show Progress Bar', icon: Activity },
                { key: 'soundEnabled', label: 'Sound Notifications', icon: Bell },
                { key: 'stackable', label: 'Stack Multiple Toasts', icon: Zap },
                { key: 'pauseOnHover', label: 'Pause on Hover', icon: Clock },
              ].map(({ key, label, icon: Icon }) => (
                <Card key={key} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                    <Button
                      variant={settings[key as keyof ToastSettings] ? 'default' : 'outline'}
                      size="sm"
                      onClick={() =>
                        updateSetting(
                          key as keyof ToastSettings,
                          !settings[key as keyof ToastSettings]
                        )
                      }
                    >
                      {settings[key as keyof ToastSettings] ? 'On' : 'Off'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Toasts Preview */}
      {toasts.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Active Toasts</h2>
            <p className="text-muted-foreground">Currently displayed notifications</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {toasts.map(toast => (
                <div
                  key={toast.id}
                  className={`p-4 rounded-lg border flex items-start justify-between ${getToastBgColor(toast.type)}`}
                >
                  <div className="flex items-start gap-3">
                    {getToastIcon(toast.type)}
                    <div className="flex-1">
                      <div className="font-medium">{toast.title}</div>
                      <div className="text-sm text-muted-foreground">{toast.message}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {toast.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {toast.action && (
                      <Button size="sm" variant="outline">
                        {toast.action}
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => removeToast(toast.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Content Guidelines</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Keep messages concise and actionable</li>
              <li>• Use appropriate icons for different types</li>
              <li>• Provide clear action buttons when needed</li>
              <li>• Include timestamps for important notifications</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">User Experience</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Don&apos;t overwhelm users with too many toasts</li>
              <li>• Allow users to dismiss notifications manually</li>
              <li>• Use consistent positioning and timing</li>
              <li>• Consider accessibility for screen readers</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
