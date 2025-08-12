import { Input } from '@/components/ui';

export default function InputTestPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Input Titan Component</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive input component with variants, states, and enhanced accessibility
        </p>
      </div>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input variant="default" placeholder="Default" />
          <Input variant="outline" placeholder="Outline" />
          <Input variant="filled" placeholder="Filled" />
          <Input variant="ghost" placeholder="Ghost" />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <div className="space-y-2">
          <Input size="sm" placeholder="Small input" />
          <Input size="default" placeholder="Default input" />
          <Input size="lg" placeholder="Large input" />
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input placeholder="Default state" />
          <Input state="error" placeholder="Error state" />
          <Input state="success" placeholder="Success state" />
          <Input state="warning" placeholder="Warning state" />
        </div>
      </section>

      {/* With Labels and Messages */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Labels & Messages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Email Address"
            placeholder="user@example.com"
            helperText="We'll never share your email"
          />
          <Input
            label="Invalid Email"
            placeholder="Enter email"
            errorMessage="Please enter a valid email address"
            defaultValue="invalid-email"
          />
          <Input
            label="Valid Email"
            placeholder="Enter email"
            successMessage="Email address is valid"
            defaultValue="user@example.com"
          />
          <Input
            label="Required Field"
            placeholder="This field is required"
            required
            helperText="This field is required"
          />
        </div>
      </section>

      {/* Input Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Input Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input type="text" label="Text" placeholder="Enter text" />
          <Input type="email" label="Email" placeholder="user@example.com" />
          <Input type="password" label="Password" placeholder="Enter password" />
          <Input type="number" label="Number" placeholder="123" />
          <Input type="tel" label="Phone" placeholder="+1 (555) 123-4567" />
          <Input type="url" label="Website" placeholder="https://example.com" />
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Icons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Search" placeholder="Search..." leftIcon="🔍" />
          <Input label="Status" placeholder="Enter status" rightIcon="✓" state="success" />
          <Input label="Search with status" placeholder="Search..." leftIcon="🔍" rightIcon="✓" />
        </div>
      </section>

      {/* Complex Form Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Complex Form Example</h2>
        <form className="max-w-md mx-auto space-y-4">
          <Input label="Full Name" placeholder="John Doe" required />
          <Input
            type="email"
            label="Email Address"
            placeholder="john@example.com"
            helperText="We'll never share your email"
            required
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter password"
            helperText="At least 8 characters"
            required
          />
          <Input
            type="tel"
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
            variant="outline"
          />
          <Input label="Website" type="url" placeholder="https://example.com" variant="filled" />
          <Input label="Company" placeholder="Company name" variant="ghost" />
        </form>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Disabled State</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Disabled Input"
            placeholder="Cannot edit"
            disabled
            defaultValue="Disabled value"
          />
          <Input
            variant="outline"
            label="Disabled Outline"
            placeholder="Cannot edit"
            disabled
            defaultValue="Disabled outline"
          />
        </div>
      </section>
    </div>
  );
}
