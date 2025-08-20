'use client';

import {
  Activity,
  AlertTriangle,
  Battery,
  CheckCircle,
  Clock,
  Cpu,
  Download,
  Gauge,
  HardDrive,
  MemoryStick,
  RefreshCw,
  RotateCcw,
  Settings,
  Target,
  TrendingUp,
  Upload,
  Users,
  Wifi,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Progress } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';
import { Label } from '../Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select';
import { Slider } from '../Slider';
import { Switch } from '../Switch';

interface ProgressConfig {
  value: number;
  variant: 'default' | 'success' | 'warning' | 'danger';
  size: 'sm' | 'default' | 'lg' | 'xl';
}

interface Task {
  id: number;
  name: string;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  startTime: Date;
  estimatedDuration: number;
}

export default function ProgressDemo() {
  const [basicProgress, setBasicProgress] = useState(33);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [systemProgress, setSystemProgress] = useState({
    cpu: 45,
    memory: 72,
    disk: 83,
    network: 28,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [autoProgress, setAutoProgress] = useState(false);
  const [progressConfig, setProgressConfig] = useState<ProgressConfig>({
    value: 50,
    variant: 'default',
    size: 'default',
  });
  const [recentActions, setRecentActions] = useState<string[]>([]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: 'Project Setup',
      progress: 100,
      status: 'completed',
      startTime: new Date(Date.now() - 3600000),
      estimatedDuration: 30,
    },
    {
      id: 2,
      name: 'Database Migration',
      progress: 75,
      status: 'in-progress',
      startTime: new Date(Date.now() - 1800000),
      estimatedDuration: 45,
    },
    {
      id: 3,
      name: 'API Integration',
      progress: 40,
      status: 'in-progress',
      startTime: new Date(Date.now() - 900000),
      estimatedDuration: 60,
    },
    {
      id: 4,
      name: 'Frontend Build',
      progress: 0,
      status: 'pending',
      startTime: new Date(),
      estimatedDuration: 25,
    },
    {
      id: 5,
      name: 'Testing Suite',
      progress: 85,
      status: 'error',
      startTime: new Date(Date.now() - 2700000),
      estimatedDuration: 35,
    },
  ]);

  const addRecentAction = (action: string) => {
    setRecentActions(prev => [action, ...prev.slice(0, 4)]);
  };

  // Auto progress simulation
  useEffect(() => {
    if (!autoProgress) return;

    const interval = setInterval(() => {
      setProgressConfig(prev => ({
        ...prev,
        value: prev.value >= 100 ? 0 : prev.value + 1,
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [autoProgress]);

  // Upload simulation
  useEffect(() => {
    if (!isUploading) return;

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          setIsUploading(false);
          addRecentAction('Upload Completed');
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isUploading]);

  // Download simulation
  useEffect(() => {
    if (!isDownloading) return;

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          setIsDownloading(false);
          addRecentAction('Download Completed');
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isDownloading]);

  // System metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemProgress(prev => ({
        cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, prev.memory + (Math.random() - 0.5) * 5)),
        disk: Math.max(0, Math.min(100, prev.disk + (Math.random() - 0.5) * 2)),
        network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 15)),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Task progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prev =>
        prev.map(task => {
          if (task.status === 'in-progress' && task.progress < 100) {
            const newProgress = Math.min(100, task.progress + Math.random() * 2);
            const newStatus = newProgress >= 100 ? 'completed' : 'in-progress';
            return { ...task, progress: newProgress, status: newStatus };
          }
          return task;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const startUpload = () => {
    setUploadProgress(0);
    setIsUploading(true);
    addRecentAction('Upload Started');
  };

  const startDownload = () => {
    setDownloadProgress(0);
    setIsDownloading(true);
    addRecentAction('Download Started');
  };

  const resetProgress = () => {
    setBasicProgress(0);
    setUploadProgress(0);
    setDownloadProgress(0);
    setIsUploading(false);
    setIsDownloading(false);
    addRecentAction('Progress Reset');
  };

  const getVariantForValue = (value: number) => {
    if (value >= 80) return 'success';
    if (value >= 60) return 'default';
    if (value >= 40) return 'warning';
    return 'danger';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Progress Component</h1>
        <p className="text-muted-foreground">
          Visual progress indicators for tasks, uploads, system metrics, and workflows
        </p>
      </div>

      {/* Recent Actions */}
      {recentActions.length > 0 && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Recent Progress Actions:</span>
            <div className="flex gap-2">
              {recentActions.map((action, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {action}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Basic Progress Examples */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Basic Progress Bars</h3>
            <p className="text-sm text-muted-foreground">
              Different variants and sizes of progress indicators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Variants */}
            <div className="space-y-4">
              <h4 className="font-medium">Progress Variants</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Default (33%)</span>
                    <span className="text-muted-foreground">33%</span>
                  </div>
                  <Progress value={33} variant="default" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Success (85%)</span>
                    <span className="text-green-600">85%</span>
                  </div>
                  <Progress value={85} variant="success" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Warning (60%)</span>
                    <span className="text-yellow-600">60%</span>
                  </div>
                  <Progress value={60} variant="warning" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Danger (25%)</span>
                    <span className="text-red-600">25%</span>
                  </div>
                  <Progress value={25} variant="danger" />
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <h4 className="font-medium">Progress Sizes</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Small</span>
                    <span className="text-muted-foreground">70%</span>
                  </div>
                  <Progress value={70} size="sm" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Default</span>
                    <span className="text-muted-foreground">70%</span>
                  </div>
                  <Progress value={70} size="default" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Large</span>
                    <span className="text-muted-foreground">70%</span>
                  </div>
                  <Progress value={70} size="lg" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Extra Large</span>
                    <span className="text-muted-foreground">70%</span>
                  </div>
                  <Progress value={70} size="xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Progress */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Interactive Progress Control</h3>
            <p className="text-sm text-muted-foreground">
              Control progress values and configurations in real-time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Manual Control */}
            <div className="space-y-4">
              <h4 className="font-medium">Manual Control</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Progress Value: {basicProgress}%</Label>
                  <Slider
                    value={[basicProgress]}
                    onValueChange={value => setBasicProgress(value[0])}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Progress</span>
                    <span className="text-muted-foreground">{basicProgress}%</span>
                  </div>
                  <Progress value={basicProgress} variant={getVariantForValue(basicProgress)} />
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setBasicProgress(Math.max(0, basicProgress - 10))}
                  >
                    -10%
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setBasicProgress(Math.min(100, basicProgress + 10))}
                  >
                    +10%
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setBasicProgress(100)}>
                    Complete
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setBasicProgress(0)}>
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            {/* Configuration Panel */}
            <div className="space-y-4">
              <h4 className="font-medium">Configuration Panel</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Variant</Label>
                    <Select
                      value={progressConfig.variant}
                      onValueChange={(value: 'default' | 'success' | 'warning' | 'danger') =>
                        setProgressConfig(prev => ({ ...prev, variant: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="danger">Danger</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Size</Label>
                    <Select
                      value={progressConfig.size}
                      onValueChange={(value: 'sm' | 'default' | 'lg' | 'xl') =>
                        setProgressConfig(prev => ({ ...prev, size: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                        <SelectItem value="xl">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Progress Value: {progressConfig.value}%</Label>
                  <Slider
                    value={[progressConfig.value]}
                    onValueChange={value =>
                      setProgressConfig(prev => ({ ...prev, value: value[0] }))
                    }
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Preview</span>
                    <span className="text-muted-foreground">{progressConfig.value}%</span>
                  </div>
                  <Progress
                    value={progressConfig.value}
                    variant={progressConfig.variant}
                    size={progressConfig.size}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-progress"
                      checked={autoProgress}
                      onCheckedChange={setAutoProgress}
                    />
                    <Label htmlFor="auto-progress">Auto Progress</Label>
                  </div>
                  <Button size="sm" variant="outline" onClick={resetProgress}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* File Transfer Progress */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">File Transfer Progress</h3>
            <p className="text-sm text-muted-foreground">
              Realistic upload and download progress indicators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  File Upload
                </h4>
                <Badge
                  variant={
                    isUploading ? 'default' : uploadProgress === 100 ? 'success' : 'secondary'
                  }
                >
                  {isUploading ? 'Uploading...' : uploadProgress === 100 ? 'Completed' : 'Ready'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>document-report.pdf (2.4 MB)</span>
                    <span className="text-muted-foreground">{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress
                    value={uploadProgress}
                    variant={uploadProgress === 100 ? 'success' : 'default'}
                  />
                </div>

                {isUploading && (
                  <div className="text-xs text-muted-foreground">
                    Uploading at {((2.4 * uploadProgress) / 100).toFixed(1)} MB / 2.4 MB
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" onClick={startUpload} disabled={isUploading}>
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? 'Uploading...' : 'Start Upload'}
                  </Button>
                  {uploadProgress > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setUploadProgress(0);
                        setIsUploading(false);
                        addRecentAction('Upload Cancelled');
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Download Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  File Download
                </h4>
                <Badge
                  variant={
                    isDownloading ? 'default' : downloadProgress === 100 ? 'success' : 'secondary'
                  }
                >
                  {isDownloading
                    ? 'Downloading...'
                    : downloadProgress === 100
                      ? 'Completed'
                      : 'Ready'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>software-update.zip (156 MB)</span>
                    <span className="text-muted-foreground">{Math.round(downloadProgress)}%</span>
                  </div>
                  <Progress
                    value={downloadProgress}
                    variant={downloadProgress === 100 ? 'success' : 'default'}
                  />
                </div>

                {isDownloading && (
                  <div className="text-xs text-muted-foreground">
                    Downloaded {((156 * downloadProgress) / 100).toFixed(1)} MB / 156 MB
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" onClick={startDownload} disabled={isDownloading}>
                    <Download className="mr-2 h-4 w-4" />
                    {isDownloading ? 'Downloading...' : 'Start Download'}
                  </Button>
                  {downloadProgress > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setDownloadProgress(0);
                        setIsDownloading(false);
                        addRecentAction('Download Cancelled');
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* System Metrics */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">System Performance Metrics</h3>
            <p className="text-sm text-muted-foreground">
              Real-time system resource monitoring with progress bars
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-sm">CPU Usage</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Processor</span>
                  <span className="text-muted-foreground">{Math.round(systemProgress.cpu)}%</span>
                </div>
                <Progress
                  value={systemProgress.cpu}
                  variant={getVariantForValue(100 - systemProgress.cpu)}
                  size="sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MemoryStick className="h-4 w-4 text-green-500" />
                <span className="font-medium text-sm">Memory</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>RAM Usage</span>
                  <span className="text-muted-foreground">
                    {Math.round(systemProgress.memory)}%
                  </span>
                </div>
                <Progress
                  value={systemProgress.memory}
                  variant={getVariantForValue(100 - systemProgress.memory)}
                  size="sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-purple-500" />
                <span className="font-medium text-sm">Storage</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Disk Usage</span>
                  <span className="text-muted-foreground">{Math.round(systemProgress.disk)}%</span>
                </div>
                <Progress
                  value={systemProgress.disk}
                  variant={getVariantForValue(100 - systemProgress.disk)}
                  size="sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-orange-500" />
                <span className="font-medium text-sm">Network</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Bandwidth</span>
                  <span className="text-muted-foreground">
                    {Math.round(systemProgress.network)}%
                  </span>
                </div>
                <Progress value={systemProgress.network} variant="default" size="sm" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4 text-green-500" />
                <span className="font-medium text-sm">Battery Level</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Remaining</span>
                  <span className="text-muted-foreground">78%</span>
                </div>
                <Progress value={78} variant="success" size="lg" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-sm">Performance Score</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Overall</span>
                  <span className="text-muted-foreground">92%</span>
                </div>
                <Progress value={92} variant="success" size="lg" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span className="font-medium text-sm">Optimization</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Efficiency</span>
                  <span className="text-muted-foreground">87%</span>
                </div>
                <Progress value={87} variant="default" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Task Progress Dashboard */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Task Progress Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Project workflow tracking with real-time progress updates
            </p>
          </div>

          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <h4 className="font-medium">{task.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        Started {task.startTime.toLocaleTimeString()} • Est.{' '}
                        {task.estimatedDuration}min
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        task.status === 'completed'
                          ? 'success'
                          : task.status === 'error'
                            ? 'destructive'
                            : task.status === 'in-progress'
                              ? 'default'
                              : 'secondary'
                      }
                    >
                      {task.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="text-muted-foreground">{Math.round(task.progress)}%</span>
                  </div>
                  <Progress
                    value={task.progress}
                    variant={
                      task.status === 'completed'
                        ? 'success'
                        : task.status === 'error'
                          ? 'danger'
                          : task.progress > 75
                            ? 'success'
                            : task.progress > 50
                              ? 'default'
                              : task.progress > 25
                                ? 'warning'
                                : 'danger'
                    }
                  />
                </div>

                {task.status === 'in-progress' && task.progress < 100 && (
                  <div className="text-xs text-muted-foreground">
                    Estimated completion:{' '}
                    {new Date(
                      Date.now() +
                        (task.estimatedDuration - (task.progress / 100) * task.estimatedDuration) *
                          60000
                    ).toLocaleTimeString()}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {tasks.filter(t => t.status === 'completed').length} of {tasks.length} tasks completed
            </div>
            <Button size="sm" onClick={() => addRecentAction('Tasks Refreshed')}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Tasks
            </Button>
          </div>
        </div>
      </Card>

      {/* Best Practices */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Progress Bar Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Visual Design</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Use appropriate colors for different states</p>
                <p>• Maintain consistent sizing across your app</p>
                <p>• Provide clear percentage or status labels</p>
                <p>• Consider animation for smooth transitions</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">User Experience</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Show estimated time remaining when possible</p>
                <p>• Provide cancel/pause options for long tasks</p>
                <p>• Update progress smoothly, not in large jumps</p>
                <p>• Give feedback when operations complete</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-purple-500" />
                <h4 className="font-medium">Implementation</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Validate progress values (0-100 range)</p>
                <p>• Handle error states appropriately</p>
                <p>• Use semantic HTML with proper ARIA labels</p>
                <p>• Test with screen readers for accessibility</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
