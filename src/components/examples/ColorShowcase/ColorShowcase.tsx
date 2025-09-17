import './ColorShowcase.scss';

export function ColorShowcase() {
  const brandColors = [
    {
      name: 'Primary Color',
      key: 'theme-primary-color',
      description: 'Main brand color',
    },
    {
      name: 'Accent Color',
      key: 'theme-accent-color',
      description: 'Secondary brand color',
    },
    {
      name: 'Text Color',
      key: 'theme-text-color',
      description: 'Primary text color',
    },
    {
      name: 'Background Color',
      key: 'theme-background-color',
      description: 'Main background color',
    },
    {
      name: 'Border Color',
      key: 'theme-border-color',
      description: 'Primary border color',
    },
  ];

  const envInfo = [
    { label: 'Site Name', value: process.env.NEXT_PUBLIC_SITE_NAME },
    { label: 'Brand Name', value: process.env.NEXT_PUBLIC_BRAND_DISPLAY_NAME },
    { label: 'Environment', value: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development' },
  ];

  return (
    <section className="color-showcase">
      <div className="color-showcase__container">
        <div className="color-showcase__header">
          <h2 className="color-showcase__title">Environment Colors</h2>
          <p className="color-showcase__description">
            These colors are controlled by environment variables and will appear differently across
            platforms (development, preview, production).
          </p>
        </div>

        <div className="color-showcase__grid">
          {brandColors.map(color => (
            <div key={color.key} className="color-showcase__item">
              <div
                className="color-showcase__swatch"
                style={{
                  backgroundColor: `var(--${color.key})`,
                  border: `2px solid var(--theme-border-color)`,
                }}
                data-color={color.key}
              />
              <div className="color-showcase__info">
                <h3 className="color-showcase__name">{color.name}</h3>
                <p className="color-showcase__description-text">{color.description}</p>
                <code className="color-showcase__var">--{color.key}</code>
              </div>
            </div>
          ))}
        </div>

        <div className="color-showcase__env-info">
          <h3 className="color-showcase__env-title">Current Environment</h3>
          <div className="color-showcase__env-grid">
            {envInfo.map(info => (
              <div key={info.label} className="color-showcase__env-item">
                <span className="color-showcase__env-label">{info.label}:</span>
                <span className="color-showcase__env-value">{info.value || 'Not set'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="color-showcase__usage">
          <h3 className="color-showcase__usage-title">Platform Differences</h3>
          <ul className="color-showcase__usage-list">
            <li>
              <strong>Development:</strong> Uses .env.local values (Trigger Kings theme)
            </li>
            <li>
              <strong>Preview:</strong> Uses Vercel preview environment variables
            </li>
            <li>
              <strong>Production:</strong> Uses Vercel production environment variables
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
