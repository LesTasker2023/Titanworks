import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Daedalus',
  description: 'Enterprise Component System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
