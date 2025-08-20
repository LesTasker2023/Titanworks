'use client';

import { ImageIcon, Monitor, Play, Smartphone, Tablet, Video } from 'lucide-react';
import { useState } from 'react';
import { AspectRatio } from '.';
import { Button } from '../Button';
import { Card, CardContent } from '../Card';

export default function AspectRatioDemo() {
  const [selectedRatio, setSelectedRatio] = useState<number>(16 / 9);

  const ratios = [
    { name: '16:9 (Widescreen)', value: 16 / 9, icon: Monitor },
    { name: '4:3 (Traditional)', value: 4 / 3, icon: Monitor },
    { name: '1:1 (Square)', value: 1, icon: Tablet },
    { name: '9:16 (Portrait)', value: 9 / 16, icon: Smartphone },
    { name: '21:9 (Ultrawide)', value: 21 / 9, icon: Monitor },
  ];

  const sampleImages = [
    { url: '/daedalus.png', title: 'Landscape Photo', type: 'image' },
    { url: '/daedalus.png', title: 'Portrait Photo', type: 'image' },
    { url: '/daedalus.png', title: 'Square Art', type: 'image' },
  ];

  const videoExamples = [
    { title: 'Product Demo', duration: '2:30', views: '1.2K' },
    { title: 'Tutorial Series', duration: '15:45', views: '5.8K' },
    { title: 'Company Overview', duration: '3:15', views: '892' },
  ];

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">AspectRatio Component</h1>
        <p className="text-muted-foreground">
          Maintain consistent aspect ratios for images, videos, and content
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <p className="text-sm text-muted-foreground">
              Standard aspect ratios for different content types
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 16:9 Video */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">16:9 Video (Widescreen)</h4>
                <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <div className="text-center">
                      <Video className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">1920 × 1080</p>
                      <p className="text-xs opacity-80">HD Video</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>

              {/* 1:1 Square */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">1:1 Square (Social Media)</h4>
                <AspectRatio ratio={1} className="bg-muted rounded-lg overflow-hidden">
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-500 to-teal-600 text-white">
                    <div className="text-center">
                      <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">1080 × 1080</p>
                      <p className="text-xs opacity-80">Instagram Post</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Advanced Usage</h3>
            <p className="text-sm text-muted-foreground">
              Dynamic aspect ratios with real content and interactive controls
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-background space-y-6">
            {/* Interactive Ratio Selector */}
            <div>
              <h4 className="font-medium mb-3">Interactive Ratio Selector</h4>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {ratios.map(ratio => {
                    const Icon = ratio.icon;
                    return (
                      <Button
                        key={ratio.name}
                        variant={selectedRatio === ratio.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedRatio(ratio.value)}
                        className="flex items-center gap-1"
                      >
                        <Icon className="h-3 w-3" />
                        {ratio.name}
                      </Button>
                    );
                  })}
                </div>

                <AspectRatio
                  ratio={selectedRatio}
                  className="bg-muted rounded-lg overflow-hidden max-w-md"
                >
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-orange-500 to-red-600 text-white">
                    <div className="text-center">
                      <Monitor className="h-12 w-12 mx-auto mb-3" />
                      <p className="font-medium">
                        {ratios.find(r => r.value === selectedRatio)?.name}
                      </p>
                      <p className="text-sm opacity-80">Ratio: {selectedRatio.toFixed(3)}</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>

            {/* Image Gallery with Consistent Ratios */}
            <div>
              <h4 className="font-medium mb-3">Image Gallery (Consistent 16:9)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sampleImages.map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <AspectRatio ratio={16 / 9}>
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    </AspectRatio>
                    <CardContent className="p-3">
                      <h5 className="font-medium text-sm">{image.title}</h5>
                      <p className="text-xs text-muted-foreground">16:9 aspect ratio</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Video Playlist Cards */}
            <div>
              <h4 className="font-medium mb-3">Video Playlist (16:9 Thumbnails)</h4>
              <div className="space-y-3">
                {videoExamples.map((video, index) => (
                  <Card key={index} className="flex">
                    <div className="w-48 flex-shrink-0">
                      <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
                        <div className="relative flex items-center justify-center h-full bg-gradient-to-br from-slate-600 to-slate-800 text-white">
                          <Play className="h-8 w-8 opacity-80" />
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-xs px-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                      </AspectRatio>
                    </div>
                    <CardContent className="flex-1 p-4">
                      <h5 className="font-medium">{video.title}</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        {video.views} views • {video.duration}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Thumbnail maintains 16:9 ratio for consistent layout
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Responsive Design Showcase */}
            <div>
              <h4 className="font-medium mb-3">Responsive Design Showcase</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Desktop Layout (21:9)</h5>
                  <AspectRatio ratio={21 / 9} className="bg-muted rounded-lg overflow-hidden">
                    <div className="flex items-center justify-center h-full bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                      <div className="text-center">
                        <Monitor className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">Ultra-wide Banner</p>
                        <p className="text-xs opacity-80">Hero section</p>
                      </div>
                    </div>
                  </AspectRatio>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Mobile Layout (9:16)</h5>
                  <div className="max-w-32 mx-auto">
                    <AspectRatio ratio={9 / 16} className="bg-muted rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full bg-gradient-to-b from-indigo-500 to-blue-600 text-white">
                        <div className="text-center">
                          <Smartphone className="h-4 w-4 mx-auto mb-2" />
                          <p className="text-xs font-medium">Mobile Story</p>
                          <p className="text-xs opacity-80">Full screen</p>
                        </div>
                      </div>
                    </AspectRatio>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Grid */}
            <div>
              <h4 className="font-medium mb-3">Aspect Ratio Comparison</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { ratio: 4 / 3, name: '4:3', desc: 'Classic TV' },
                  { ratio: 16 / 9, name: '16:9', desc: 'Widescreen' },
                  { ratio: 1, name: '1:1', desc: 'Square' },
                  { ratio: 9 / 16, name: '9:16', desc: 'Portrait' },
                ].map(item => (
                  <div key={item.name} className="text-center space-y-2">
                    <AspectRatio ratio={item.ratio} className="bg-muted rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                        <div className="text-center">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs opacity-80">{item.desc}</p>
                        </div>
                      </div>
                    </AspectRatio>
                    <p className="text-xs text-muted-foreground">Ratio: {item.ratio.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
