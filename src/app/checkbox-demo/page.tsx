import Checkbox from '@/components/ui/Checkbox/checkbox';

export default function CheckboxDemo() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Enhanced Checkbox Component</h1>
        <p className="text-muted-foreground">
          Showcasing advanced features with SCSS enhancements and comprehensive functionality.
        </p>
      </div>

      {/* Basic Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Basic Checkbox States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-3">Default States</h3>
            <div className="space-y-3">
              <Checkbox label="Unchecked checkbox" />
              <Checkbox label="Checked checkbox" checked />
              <Checkbox label="Disabled checkbox" disabled />
              <Checkbox label="Disabled checked" checked disabled />
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-3">Enhanced States</h3>
            <div className="space-y-3">
              <Checkbox label="Loading state" loading />
              <Checkbox label="Indeterminate state" indeterminate />
              <Checkbox label="Required field" required />
              <Checkbox label="With error" error="This field is required" />
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-3">With Helper Text</h3>
            <div className="space-y-3">
              <Checkbox
                label="Marketing emails"
                helperText="Receive promotional emails and updates"
              />
              <Checkbox
                label="Terms and conditions"
                helperText="Please read and accept our terms"
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Form Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Interactive Form Example</h2>
        <div className="p-6 border rounded-lg bg-muted/50">
          <h3 className="font-medium mb-4">Account Preferences</h3>

          <div className="space-y-4">
            <Checkbox
              label="Email notifications"
              helperText="Receive email updates about your account activity"
              defaultChecked
            />

            <Checkbox
              label="SMS notifications"
              helperText="Receive text messages for important updates"
            />

            <Checkbox
              label="Marketing communications"
              helperText="Get the latest news and offers from our team"
            />

            <Checkbox
              label="Data processing consent"
              helperText="Allow us to process your data according to our privacy policy"
              required
            />
          </div>

          <div className="mt-6 pt-4 border-t">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90">
              Save Preferences
            </button>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Advanced Features</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-medium mb-4">Complex Checkbox Group</h3>
            <div className="space-y-3">
              <Checkbox
                label="Select all permissions"
                indeterminate
                helperText="Manage all user permissions at once"
              />
              <div className="ml-6 space-y-2 border-l-2 border-muted pl-4">
                <Checkbox label="Read access" checked />
                <Checkbox label="Write access" />
                <Checkbox label="Delete access" />
                <Checkbox label="Admin access" disabled />
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-medium mb-4">Loading & Error States</h3>
            <div className="space-y-3">
              <Checkbox
                label="Processing request..."
                loading
                helperText="Please wait while we verify your selection"
              />
              <Checkbox
                label="Failed validation"
                error="This selection conflicts with your account settings"
              />
              <Checkbox
                label="Complex validation"
                error="Please complete all required fields first"
                required
              />
            </div>
          </div>
        </div>
      </section>

      {/* SCSS Enhancements Showcase */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">SCSS Enhancement Features</h2>
        <div className="p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <h3 className="font-medium mb-4">Enhanced Visual Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wide">
                Hover & Focus Effects
              </h4>
              <div className="space-y-2">
                <Checkbox label="Hover for scale animation" />
                <Checkbox label="Focus for enhanced ring" />
                <Checkbox label="Smooth transitions on all states" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wide">
                Advanced Animations
              </h4>
              <div className="space-y-2">
                <Checkbox label="Check mark appears with animation" />
                <Checkbox label="Loading spinner animation" loading />
                <Checkbox label="Indeterminate pulse effect" indeterminate />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/50 dark:bg-black/20 rounded border border-dashed">
            <p className="text-sm text-muted-foreground">
              <strong>🎨 SCSS Features:</strong> Custom hover effects, smooth animations,
              accessibility enhancements, high contrast support, reduced motion support, dark mode
              optimizations, and touch device adaptations.
            </p>
          </div>
        </div>
      </section>

      {/* Component API Reference */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Component API</h2>
        <div className="p-6 border rounded-lg bg-muted/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Enhanced Props</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <code className="bg-muted px-1 rounded">label</code> - Display label text
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">error</code> - Error message (overrides
                  helper)
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">helperText</code> - Additional context
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">loading</code> - Loading state with
                  spinner
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">required</code> - Required field indicator
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">indeterminate</code> - Tri-state checkbox
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Standard Props</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <code className="bg-muted px-1 rounded">checked</code> - Controlled checked state
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">defaultChecked</code> - Uncontrolled
                  default
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">disabled</code> - Disable interaction
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">onCheckedChange</code> - State change
                  handler
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">className</code> - Custom CSS classes
                </li>
                <li>+ all standard Radix Checkbox props</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
