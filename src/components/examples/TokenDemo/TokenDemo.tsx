/**
 * Example component demonstrating environment-controlled design tokens
 *
 * This component shows how to use design tokens that pull their values
 * from environment variables via the DesignTokenProvider.
 *
 * Usage:
 * <TokenDemo />
 */
'use client';

import { useDesignTokens } from '@/lib/design-tokens';
import './TokenDemo.scss';

interface TokenDemoProps {
  className?: string;
}

export function TokenDemo({ className }: TokenDemoProps) {
  const tokens = useDesignTokens();

  return (
    <div className={`token-demo ${className || ''}`}>
      <div className="token-demo__header">
        <h2 className="token-demo__title">Environment-Controlled Design Tokens</h2>
        <p className="token-demo__description">
          These colors and styles are controlled by environment variables in <code>.env.local</code>
        </p>
      </div>

      <div className="token-demo__grid">
        <div className="token-demo__section">
          <h3 className="token-demo__section-title">Surface Tokens</h3>
          <div className="token-demo__color-grid">
            <div className="token-demo__color token-demo__color--surface-primary">
              <span>Primary</span>
              <code>{tokens.surfacePrimary}</code>
            </div>
            <div className="token-demo__color token-demo__color--surface-secondary">
              <span>Secondary</span>
              <code>{tokens.surfaceSecondary}</code>
            </div>
            <div className="token-demo__color token-demo__color--surface-interactive">
              <span>Interactive</span>
              <code>{tokens.surfaceInteractive}</code>
            </div>
            <div className="token-demo__color token-demo__color--surface-accent">
              <span>Accent</span>
              <code>{tokens.surfaceAccent}</code>
            </div>
          </div>
        </div>

        <div className="token-demo__section">
          <h3 className="token-demo__section-title">Status Tokens</h3>
          <div className="token-demo__color-grid">
            <div className="token-demo__color token-demo__color--status-success">
              <span>Success</span>
              <code>{tokens.statusSuccess}</code>
            </div>
            <div className="token-demo__color token-demo__color--status-warning">
              <span>Warning</span>
              <code>{tokens.statusWarning}</code>
            </div>
            <div className="token-demo__color token-demo__color--status-error">
              <span>Error</span>
              <code>{tokens.statusError}</code>
            </div>
            <div className="token-demo__color token-demo__color--status-info">
              <span>Info</span>
              <code>{tokens.statusInfo}</code>
            </div>
          </div>
        </div>

        <div className="token-demo__section">
          <h3 className="token-demo__section-title">Component Examples</h3>
          <div className="token-demo__components">
            <button className="token-demo__button token-demo__button--primary">
              Primary Button
            </button>
            <button className="token-demo__button token-demo__button--secondary">
              Secondary Button
            </button>
            <input className="token-demo__input" placeholder="Input field using design tokens" />
            <div className="token-demo__card">Card using design tokens</div>
          </div>
        </div>

        <div className="token-demo__section">
          <h3 className="token-demo__section-title">Typography & Spacing</h3>
          <div className="token-demo__text">
            <p className="token-demo__text--base">Base font: {tokens.fontFamilyBase}</p>
            <p className="token-demo__text--mono">Mono font: {tokens.fontFamilyMono}</p>
            <p className="token-demo__text--small">Spacing unit: {tokens.spacingUnit}</p>
          </div>
        </div>
      </div>

      <div className="token-demo__footer">
        <p>
          <strong>How to customize:</strong> Edit the values in <code>.env.local</code>
          and restart the dev server to see changes.
        </p>
      </div>
    </div>
  );
}
