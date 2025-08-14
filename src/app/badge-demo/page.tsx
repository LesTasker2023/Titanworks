'use client';

import Badge from '@/components/ui/Badge';

const BadgeDemo = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Badge Component Demo</h1>

      <div>
        <h2 className="text-lg font-semibold mb-3">All Variants</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Enhanced Features</h2>
        <div className="flex flex-wrap gap-2">
          <Badge dot variant="success">
            Online
          </Badge>
          <Badge removable variant="warning" onRemove={() => console.log('Removed')}>
            Removable Tag
          </Badge>
          <Badge dot removable variant="info" onRemove={() => console.log('Status removed')}>
            Status Badge
          </Badge>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Sizes</h2>
        <div className="flex items-center gap-3">
          <Badge size="sm">Small</Badge>
          <Badge size="default">Default</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>
    </div>
  );
};

export default BadgeDemo;
