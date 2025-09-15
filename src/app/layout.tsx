import { DomainFooter, DomainNavigation } from '@/components/layout';
import { AuthProvider } from '@/lib/auth/AuthProvider';
import { getCurrentDomain, getDomainConfig } from '@/lib/domain';
import { getSiteMetadata } from '@/lib/siteConfig';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = getSiteMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const domain = getCurrentDomain();
  const config = getDomainConfig(domain);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col ${config.theme === 'dark' ? 'dark' : ''}`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={config.theme}
          enableSystem={config.theme === 'auto'}
          disableTransitionOnChange
        >
          <AuthProvider>
            <DomainNavigation />
            <main className="flex-1">{children}</main>
            <DomainFooter />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
