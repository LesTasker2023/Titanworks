'use client';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Container size="sm">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <CardTitle className="text-xl font-bold">Authentication Error</CardTitle>
            <CardDescription>
              There was an error signing you in. This could be due to an expired or invalid link.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Possible causes:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>The magic link has expired</li>
                <li>The authentication code is invalid</li>
                <li>You&apos;ve already used this link</li>
              </ul>
            </div>

            <Button asChild className="w-full">
              <Link href="/auth/login">Try Again</Link>
            </Button>

            <Button asChild variant="ghost" className="w-full">
              <Link href="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
