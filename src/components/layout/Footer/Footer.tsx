import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        padding: '2rem 0',
        borderTop: '1px solid var(--border-color, #eaeaea)',
        background: 'var(--footer-bg, #fafafa)',
        textAlign: 'center',
        fontSize: 14,
        color: 'var(--footer-fg, #888)',
        marginTop: 'auto',
      }}
    >
      <div>&copy; 2025 TriggerKings. All rights reserved.</div>
      <div style={{ marginTop: 8 }}>
        <Link href="/privacy" style={{ marginRight: 16 }}>
          Privacy Policy
        </Link>
        <Link href="/terms">Terms of Service</Link>
      </div>
    </footer>
  );
}
