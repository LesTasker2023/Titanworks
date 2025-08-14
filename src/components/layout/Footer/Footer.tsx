import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        padding: '2rem 0',
        borderTop: '1px solid hsl(var(--border))',
        background: 'hsl(var(--background))',
        textAlign: 'center',
        fontSize: 14,
        color: 'hsl(var(--muted-foreground))',
        marginTop: 'auto',
        transition: 'background 0.3s, color 0.3s',
      }}
    >
      <div>&copy; 2025 Daedalus. All rights reserved.</div>
      <div style={{ marginTop: 8 }}>
        <Link
          href="/privacy"
          style={{
            marginRight: 16,
            color: 'inherit',
            textDecoration: 'underline',
            textUnderlineOffset: 2,
          }}
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 2 }}
        >
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
