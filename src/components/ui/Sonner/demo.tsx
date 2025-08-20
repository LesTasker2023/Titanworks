'use client';

import {
  Activity,
  AlertTriangle,
  Archive,
  CheckCircle,
  CreditCard,
  Globe,
  Info,
  Loader2,
  LucideIcon,
  MessageSquare,
  Package,
  RefreshCw,
  Send,
  Settings,
  Shield,
  Star,
  Upload,
  X,
  XCircle,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader } from '../Card';
import { Input } from '../Input';
import { Label } from '../Label';

interface NotificationTemplate {
  title: string;
  description: string;
  type: 'success' | 'error' | 'warning' | 'info';
  icon: LucideIcon;
  action?: () => void;
  actionLabel?: string;
}

interface ToastConfig {
  position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  theme: 'light' | 'dark' | 'system';
  duration: number;
  closeButton: boolean;
  richColors: boolean;
}

export default function SonnerDemo() {
  const [customMessage, setCustomMessage] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [toastCount, setToastCount] = useState(0);
  const [config, setConfig] = useState<ToastConfig>({
    position: 'bottom-right',
    theme: 'system',
    duration: 4000,
    closeButton: true,
    richColors: true,
  });

  const notificationTemplates: NotificationTemplate[] = [
    {
      title: 'File uploaded successfully',
      description: 'Your document has been uploaded and is ready for processing.',
      type: 'success',
      icon: Upload,
      action: () => toast.info('Opening file manager...'),
      actionLabel: 'View File',
    },
    {
      title: 'Payment processed',
      description: 'Your payment of $299.99 has been successfully processed.',
      type: 'success',
      icon: CreditCard,
      action: () => toast.info('Opening receipt...'),
      actionLabel: 'View Receipt',
    },
    {
      title: 'New message received',
      description: 'You have a new message from Sarah Johnson about the project update.',
      type: 'info',
      icon: MessageSquare,
      action: () => toast.info('Opening conversation...'),
      actionLabel: 'Read Message',
    },
    {
      title: 'System maintenance scheduled',
      description: 'Scheduled maintenance will begin at 2:00 AM UTC tomorrow.',
      type: 'warning',
      icon: Settings,
      action: () => toast.info('Opening maintenance schedule...'),
      actionLabel: 'Learn More',
    },
    {
      title: 'Connection failed',
      description: 'Unable to connect to the server. Please check your internet connection.',
      type: 'error',
      icon: Globe,
      action: () => toast.info('Retrying connection...'),
      actionLabel: 'Retry',
    },
    {
      title: 'Backup completed',
      description: 'All your data has been safely backed up to the cloud.',
      type: 'success',
      icon: Shield,
      action: () => toast.info('Opening backup details...'),
      actionLabel: 'View Details',
    },
    {
      title: 'Storage almost full',
      description: 'You are using 89% of your available storage space.',
      type: 'warning',
      icon: Archive,
      action: () => toast.info('Opening storage management...'),
      actionLabel: 'Manage Storage',
    },
    {
      title: 'Security alert',
      description: 'Suspicious login attempt detected from an unknown device.',
      type: 'error',
      icon: Shield,
      action: () => toast.info('Opening security settings...'),
      actionLabel: 'Review Activity',
    },
  ];

  const showBasicToast = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    setToastCount(prev => prev + 1);
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      case 'info':
        toast.info(message);
        break;
    }
  };

  const showCustomToast = () => {
    if (!customTitle && !customMessage) {
      toast.error('Please enter a title or message');
      return;
    }

    setToastCount(prev => prev + 1);
    toast(customTitle || 'Custom Toast', {
      description: customMessage || undefined,
      action: {
        label: 'Undo',
        onClick: () => toast.info('Action undone'),
      },
    });
  };

  const showTemplateToast = (template: NotificationTemplate) => {
    setToastCount(prev => prev + 1);
    const toastConfig: {
      description: string;
      icon: React.ReactNode;
      action?: { label: string; onClick: () => void };
    } = {
      description: template.description,
      icon: <template.icon className="h-4 w-4" />,
    };

    if (template.action && template.actionLabel) {
      toastConfig.action = {
        label: template.actionLabel,
        onClick: template.action,
      };
    }

    switch (template.type) {
      case 'success':
        toast.success(template.title, toastConfig);
        break;
      case 'error':
        toast.error(template.title, toastConfig);
        break;
      case 'warning':
        toast.warning(template.title, toastConfig);
        break;
      case 'info':
        toast.info(template.title, toastConfig);
        break;
    }
  };

  const showPromiseToast = () => {
    setToastCount(prev => prev + 1);
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('Success!');
        } else {
          reject(new Error('Failed!'));
        }
      }, 2000);
    });

    toast.promise(promise, {
      loading: 'Processing your request...',
      success: 'Request completed successfully!',
      error: 'Request failed. Please try again.',
    });
  };

  const showLoadingToast = () => {
    setToastCount(prev => prev + 1);
    const toastId = toast.loading('Uploading files...', {
      description: 'Please wait while we upload your files',
    });

    setTimeout(() => {
      toast.success('Upload completed!', {
        id: toastId,
        description: '5 files uploaded successfully',
      });
    }, 3000);
  };

  const showProgressToast = () => {
    setToastCount(prev => prev + 1);
    let progress = 0;
    const toastId = toast.loading(`Progress: ${progress}%`, {
      description: 'Processing your data...',
    });

    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        toast.loading(`Progress: ${progress}%`, {
          id: toastId,
          description: `Processing your data... ${progress}% complete`,
        });
      }

      if (progress >= 100) {
        clearInterval(interval);
        toast.success('Processing complete!', {
          id: toastId,
          description: 'Your data has been processed successfully',
        });
      }
    }, 300);
  };

  const showRichToast = () => {
    setToastCount(prev => prev + 1);
    toast.success('Order confirmed!', {
      description: 'Your order #1234 has been confirmed and will be shipped soon.',
      icon: <Package className="h-4 w-4" />,
      action: {
        label: 'Track Order',
        onClick: () => toast.info('Opening order tracking...'),
      },
      cancel: {
        label: 'Cancel Order',
        onClick: () => toast.error('Order cancelled'),
      },
    });
  };

  const showMultipleToasts = () => {
    const messages = [
      { type: 'info' as const, message: 'Starting process...' },
      { type: 'warning' as const, message: 'Checking permissions...' },
      { type: 'success' as const, message: 'Process completed!' },
    ];

    messages.forEach((msg, index) => {
      setTimeout(() => {
        showBasicToast(msg.type, msg.message);
      }, index * 1000);
    });
  };

  const dismissAllToasts = () => {
    toast.dismiss();
    setToastCount(0);
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <Toaster
        position={config.position}
        theme={config.theme}
        duration={config.duration}
        closeButton={config.closeButton}
        richColors={config.richColors}
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Sonner Component</h1>
        <p className="text-muted-foreground text-lg">
          Modern toast notification system for user feedback
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Active Toasts: {toastCount}</Badge>
          {toastCount > 0 && (
            <Button variant="ghost" size="sm" onClick={dismissAllToasts}>
              <X className="h-4 w-4 mr-1" />
              Dismiss All
            </Button>
          )}
        </div>
      </div>

      {/* Basic Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Basic Examples</h2>
          <p className="text-muted-foreground">Simple toast notifications for common use cases</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Toast Types</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => showBasicToast('success', 'Operation completed successfully!')}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4 text-green-500" />
                Success
              </Button>
              <Button
                variant="outline"
                onClick={() => showBasicToast('error', 'Something went wrong. Please try again.')}
                className="flex items-center gap-2"
              >
                <XCircle className="h-4 w-4 text-red-500" />
                Error
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  showBasicToast('warning', 'Please review your settings before continuing.')
                }
                className="flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Warning
              </Button>
              <Button
                variant="outline"
                onClick={() => showBasicToast('info', 'Here is some helpful information for you.')}
                className="flex items-center gap-2"
              >
                <Info className="h-4 w-4 text-blue-500" />
                Info
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Custom Message</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={customTitle}
                  onChange={e => setCustomTitle(e.target.value)}
                  placeholder="Enter toast title..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Input
                  id="message"
                  value={customMessage}
                  onChange={e => setCustomMessage(e.target.value)}
                  placeholder="Enter toast message..."
                />
              </div>
              <Button onClick={showCustomToast} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Show Custom Toast
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Advanced Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Advanced Examples</h2>
          <p className="text-muted-foreground">
            Complex toast patterns for enterprise applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interactive Toasts */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Interactive Toasts</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={showPromiseToast} className="w-full flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Promise Toast
              </Button>
              <Button
                onClick={showLoadingToast}
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Loader2 className="h-4 w-4" />
                Loading Toast
              </Button>
              <Button
                onClick={showProgressToast}
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Activity className="h-4 w-4" />
                Progress Toast
              </Button>
              <Button
                onClick={showRichToast}
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Star className="h-4 w-4" />
                Rich Toast
              </Button>
            </CardContent>
          </Card>

          {/* Configuration */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Toast Configuration</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Position</Label>
                <select
                  value={config.position}
                  onChange={e =>
                    setConfig(prev => ({
                      ...prev,
                      position: e.target.value as ToastConfig['position'],
                    }))
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="top-left">Top Left</option>
                  <option value="top-center">Top Center</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-center">Bottom Center</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Theme</Label>
                <select
                  value={config.theme}
                  onChange={e =>
                    setConfig(prev => ({ ...prev, theme: e.target.value as ToastConfig['theme'] }))
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Duration: {config.duration}ms</Label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={config.duration}
                  onChange={e =>
                    setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))
                  }
                  className="w-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="closeButton"
                  checked={config.closeButton}
                  onChange={e => setConfig(prev => ({ ...prev, closeButton: e.target.checked }))}
                />
                <Label htmlFor="closeButton">Show close button</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="richColors"
                  checked={config.richColors}
                  onChange={e => setConfig(prev => ({ ...prev, richColors: e.target.checked }))}
                />
                <Label htmlFor="richColors">Rich colors</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Templates */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Notification Templates</h3>
              <Button variant="outline" size="sm" onClick={showMultipleToasts}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Show Sequence
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notificationTemplates.map((template, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => showTemplateToast(template)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-md ${
                        template.type === 'success'
                          ? 'bg-green-100 text-green-600'
                          : template.type === 'error'
                            ? 'bg-red-100 text-red-600'
                            : template.type === 'warning'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      <template.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{template.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {template.type}
                        </Badge>
                        {template.actionLabel && (
                          <span className="text-xs text-primary">{template.actionLabel}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
              <li>• Use appropriate toast types for different message contexts</li>
              <li>• Keep messages concise and actionable</li>
              <li>• Provide clear actions for important notifications</li>
              <li>• Consider toast position based on your app layout</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">Implementation</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Avoid showing too many toasts simultaneously</li>
              <li>• Use loading states for long-running operations</li>
              <li>• Implement proper error handling with retry actions</li>
              <li>• Test toast behavior across different screen sizes</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
