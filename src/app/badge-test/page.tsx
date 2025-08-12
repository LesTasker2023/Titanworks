import { Badge } from '@/components/ui/badge';

export default function BadgeTestPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Badge Test Page</h1>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Badge>Default Badge</Badge>
        <Badge variant="secondary">Secondary Badge</Badge>
        <Badge variant="destructive">Destructive Badge</Badge>
        <Badge variant="outline">Outline Badge</Badge>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Inspect Element to Check Classes</h2>
        <Badge className="test-badge">Test Badge for Inspection</Badge>
      </div>
    </div>
  );
}
