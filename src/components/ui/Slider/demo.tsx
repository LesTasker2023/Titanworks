'use client';

import {
  Activity,
  Contrast,
  DollarSign,
  Monitor,
  Palette,
  Pause,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Star,
  Sun,
  Thermometer,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Slider } from '.';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent, CardHeader } from '../Card';
import { Label } from '../Label';
import { Separator } from '../Separator';

interface ColorSliders {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

interface AudioSettings {
  master: number;
  music: number;
  effects: number;
  voice: number;
}

interface VideoSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  gamma: number;
}

interface PerformanceMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

interface PricingConfig {
  minPrice: number;
  maxPrice: number;
  discount: number;
  tax: number;
}

export default function SliderDemo() {
  const [basicValue, setBasicValue] = useState([50]);
  const [rangeValue, setRangeValue] = useState([20, 80]);
  const [volume, setVolume] = useState([75]);
  const [brightness, setBrightness] = useState([60]);
  const [temperature, setTemperature] = useState([22]);

  const [colorSliders, setColorSliders] = useState<ColorSliders>({
    red: 255,
    green: 128,
    blue: 64,
    alpha: 255,
  });

  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    master: 80,
    music: 65,
    effects: 45,
    voice: 90,
  });

  const [videoSettings, setVideoSettings] = useState<VideoSettings>({
    brightness: 50,
    contrast: 50,
    saturation: 50,
    gamma: 50,
  });

  const [performanceMetrics] = useState<PerformanceMetrics>({
    cpu: 65,
    memory: 45,
    disk: 78,
    network: 32,
  });

  const [pricingConfig, setPricingConfig] = useState<PricingConfig>({
    minPrice: 10,
    maxPrice: 500,
    discount: 15,
    tax: 8.5,
  });

  const [progressValue, setProgressValue] = useState([0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulate progress for media player
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgressValue(prev => {
          const newValue = prev[0] + 1;
          if (newValue >= 100) {
            setIsPlaying(false);
            return [0];
          }
          return [newValue];
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const updateColorSlider = (key: keyof ColorSliders, value: number[]) => {
    setColorSliders(prev => ({ ...prev, [key]: value[0] }));
  };

  const updateAudioSetting = (key: keyof AudioSettings, value: number[]) => {
    setAudioSettings(prev => ({ ...prev, [key]: value[0] }));
  };

  const updateVideoSetting = (key: keyof VideoSettings, value: number[]) => {
    setVideoSettings(prev => ({ ...prev, [key]: value[0] }));
  };

  const updatePricingSetting = (key: keyof PricingConfig, value: number[]) => {
    setPricingConfig(prev => ({ ...prev, [key]: value[0] }));
  };

  const getVolumeIcon = () => {
    if (volume[0] === 0) return VolumeX;
    return Volume2;
  };

  const getPerformanceColor = (value: number) => {
    if (value < 30) return 'bg-green-500';
    if (value < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 18) return 'text-blue-500';
    if (temp < 25) return 'text-green-500';
    return 'text-red-500';
  };

  const VolumeIcon = getVolumeIcon();

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Slider Component</h1>
        <p className="text-muted-foreground text-lg">
          Range input controls for interactive value selection
        </p>
      </div>

      {/* Basic Examples Section */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Basic Examples</h2>
          <p className="text-muted-foreground">
            Simple slider implementations for common use cases
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Single Value</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Basic Slider</Label>
                <Slider
                  value={basicValue}
                  onValueChange={setBasicValue}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">Value: {basicValue[0]}</p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <VolumeIcon className="h-4 w-4" />
                  Volume
                </Label>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">{volume[0]}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Range Values</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Price Range</Label>
                <Slider
                  value={rangeValue}
                  onValueChange={setRangeValue}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Range: ${rangeValue[0]} - ${rangeValue[1]}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  Brightness
                </Label>
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">{brightness[0]}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Custom Steps</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Thermometer className={`h-4 w-4 ${getTemperatureColor(temperature[0])}`} />
                  Temperature
                </Label>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  min={10}
                  max={35}
                  step={0.5}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">{temperature[0]}°C</p>
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <Slider value={[4]} max={5} step={0.1} className="w-full" />
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">4.0</span>
                </div>
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
            Complex slider configurations for enterprise applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Color Picker */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Color Picker</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-red-500">Red: {colorSliders.red}</Label>
                  <Slider
                    value={[colorSliders.red]}
                    onValueChange={value => updateColorSlider('red', value)}
                    max={255}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-green-500">Green: {colorSliders.green}</Label>
                  <Slider
                    value={[colorSliders.green]}
                    onValueChange={value => updateColorSlider('green', value)}
                    max={255}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-500">Blue: {colorSliders.blue}</Label>
                  <Slider
                    value={[colorSliders.blue]}
                    onValueChange={value => updateColorSlider('blue', value)}
                    max={255}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Alpha: {Math.round((colorSliders.alpha / 255) * 100)}%</Label>
                  <Slider
                    value={[colorSliders.alpha]}
                    onValueChange={value => updateColorSlider('alpha', value)}
                    max={255}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="mt-4">
                <div
                  className="h-16 w-full rounded-md border-2 border-muted"
                  style={{
                    backgroundColor: `rgba(${colorSliders.red}, ${colorSliders.green}, ${colorSliders.blue}, ${colorSliders.alpha / 255})`,
                  }}
                ></div>
                <p className="text-xs text-muted-foreground mt-2 font-mono">
                  rgb({colorSliders.red}, {colorSliders.green}, {colorSliders.blue},{' '}
                  {(colorSliders.alpha / 255).toFixed(2)})
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Audio Mixer */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Audio Mixer</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Master: {audioSettings.master}%</Label>
                  <Slider
                    value={[audioSettings.master]}
                    onValueChange={value => updateAudioSetting('master', value)}
                    max={100}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Music: {audioSettings.music}%</Label>
                  <Slider
                    value={[audioSettings.music]}
                    onValueChange={value => updateAudioSetting('music', value)}
                    max={100}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Effects: {audioSettings.effects}%</Label>
                  <Slider
                    value={[audioSettings.effects]}
                    onValueChange={value => updateAudioSetting('effects', value)}
                    max={100}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Voice: {audioSettings.voice}%</Label>
                  <Slider
                    value={[audioSettings.voice]}
                    onValueChange={value => updateAudioSetting('voice', value)}
                    max={100}
                    className="w-full"
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-semibold">Media Player</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{progressValue[0]}%</span>
                  </div>
                  <Slider
                    value={progressValue}
                    onValueChange={setProgressValue}
                    max={100}
                    className="w-full"
                  />
                  <div className="flex justify-center gap-2">
                    <Button variant="ghost" size="sm">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Monitor */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <h3 className="text-lg font-semibold">System Monitor</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>CPU Usage</Label>
                    <Badge variant={performanceMetrics.cpu > 70 ? 'destructive' : 'outline'}>
                      {performanceMetrics.cpu}%
                    </Badge>
                  </div>
                  <Slider value={[performanceMetrics.cpu]} max={100} disabled className="w-full" />
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getPerformanceColor(performanceMetrics.cpu)}`}
                      style={{ width: `${performanceMetrics.cpu}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Memory Usage</Label>
                    <Badge variant={performanceMetrics.memory > 70 ? 'destructive' : 'outline'}>
                      {performanceMetrics.memory}%
                    </Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getPerformanceColor(performanceMetrics.memory)}`}
                      style={{ width: `${performanceMetrics.memory}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Disk Usage</Label>
                    <Badge variant={performanceMetrics.disk > 70 ? 'destructive' : 'outline'}>
                      {performanceMetrics.disk}%
                    </Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getPerformanceColor(performanceMetrics.disk)}`}
                      style={{ width: `${performanceMetrics.disk}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Network Usage</Label>
                    <Badge variant={performanceMetrics.network > 70 ? 'destructive' : 'outline'}>
                      {performanceMetrics.network}%
                    </Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getPerformanceColor(performanceMetrics.network)}`}
                      style={{ width: `${performanceMetrics.network}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Display Settings</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    Brightness: {videoSettings.brightness}%
                  </Label>
                  <Slider
                    value={[videoSettings.brightness]}
                    onValueChange={value => updateVideoSetting('brightness', value)}
                    max={100}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Contrast className="h-4 w-4" />
                    Contrast: {videoSettings.contrast}%
                  </Label>
                  <Slider
                    value={[videoSettings.contrast]}
                    onValueChange={value => updateVideoSetting('contrast', value)}
                    max={100}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Saturation: {videoSettings.saturation}%
                  </Label>
                  <Slider
                    value={[videoSettings.saturation]}
                    onValueChange={value => updateVideoSetting('saturation', value)}
                    max={100}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Gamma: {videoSettings.gamma}%
                  </Label>
                  <Slider
                    value={[videoSettings.gamma]}
                    onValueChange={value => updateVideoSetting('gamma', value)}
                    max={100}
                    className="w-full"
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Preview</Label>
                <div
                  className="h-24 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-md"
                  style={{
                    filter: `brightness(${videoSettings.brightness}%) contrast(${videoSettings.contrast}%) saturate(${videoSettings.saturation}%)`,
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Pricing Configuration</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label>Minimum Price: ${pricingConfig.minPrice}</Label>
                <Slider
                  value={[pricingConfig.minPrice]}
                  onValueChange={value => updatePricingSetting('minPrice', value)}
                  min={0}
                  max={pricingConfig.maxPrice - 10}
                  step={5}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Maximum Price: ${pricingConfig.maxPrice}</Label>
                <Slider
                  value={[pricingConfig.maxPrice]}
                  onValueChange={value => updatePricingSetting('maxPrice', value)}
                  min={pricingConfig.minPrice + 10}
                  max={1000}
                  step={5}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Discount: {pricingConfig.discount}%</Label>
                <Slider
                  value={[pricingConfig.discount]}
                  onValueChange={value => updatePricingSetting('discount', value)}
                  min={0}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Tax Rate: {pricingConfig.tax}%</Label>
                <Slider
                  value={[pricingConfig.tax]}
                  onValueChange={value => updatePricingSetting('tax', value)}
                  min={0}
                  max={25}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>
            <Separator className="my-4" />
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Price Calculation</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    Base Price Range: ${pricingConfig.minPrice} - ${pricingConfig.maxPrice}
                  </p>
                  <p>Discount: -{pricingConfig.discount}%</p>
                </div>
                <div>
                  <p>Tax Rate: {pricingConfig.tax}%</p>
                  <p className="font-semibold">
                    Final Range: $
                    {(
                      pricingConfig.minPrice *
                      (1 - pricingConfig.discount / 100) *
                      (1 + pricingConfig.tax / 100)
                    ).toFixed(2)}{' '}
                    - $
                    {(
                      pricingConfig.maxPrice *
                      (1 - pricingConfig.discount / 100) *
                      (1 + pricingConfig.tax / 100)
                    ).toFixed(2)}
                  </p>
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
              <li>• Provide immediate visual feedback during value changes</li>
              <li>• Use appropriate step sizes for different data types</li>
              <li>• Include labels and current values for clarity</li>
              <li>• Consider touch targets for mobile accessibility</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">Implementation</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Validate min/max bounds to prevent invalid states</li>
              <li>• Debounce rapid value changes for performance</li>
              <li>• Use controlled components for complex state management</li>
              <li>• Consider keyboard navigation and screen readers</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
