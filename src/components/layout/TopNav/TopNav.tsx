import ThemeToggle from '@/components/layout/ThemeToggle';

export default function TopNav() {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '1rem 2rem',
        borderBottom: '1px solid var(--border-color, #eaeaea)',
        background: 'var(--nav-bg, #fff)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 20 }}>TriggerKings</div>
      <ThemeToggle />
    </nav>
  );
}
