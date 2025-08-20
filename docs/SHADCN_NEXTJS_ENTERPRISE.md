# 🚀 shadcn/ui + Next.js 15 Enterprise Patterns

## 1. 🏆 PERFORMANCE ARCHITECTURE

### Server Component First Strategy

```tsx
// app/dashboard/page.tsx (Server Component by default)
import { Suspense } from 'react';
import { StatsCards } from './components/StatsCards';
import { RecentActivity } from './components/RecentActivity';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>

      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}
```

### Client Islands Pattern

```tsx
// Only make interactive parts client components
'use client';

export function InteractiveChart({ data }) {
  const [timeframe, setTimeframe] = useState('7d');

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Analytics</CardTitle>
          <Select value={timeframe} onValueChange={setTimeframe}>
            {/* Options */}
          </Select>
        </div>
      </CardHeader>
      <CardContent>{/* Chart renders based on timeframe */}</CardContent>
    </Card>
  );
}
```

## 2. 🧠 TYPE-SAFE COMPONENT COMPOSITION

### Compound Component Pattern

```tsx
// Advanced form composition with your components
export function SettingsForm() {
  return (
    <Form>
      <FormSection title="Profile" description="Update your profile information">
        <FormField>
          <Label>Name</Label>
          <Input />
        </FormField>

        <FormField>
          <Label>Email</Label>
          <Input type="email" />
        </FormField>
      </FormSection>

      <FormSection title="Preferences">
        <FormField>
          <Label>Theme</Label>
          <Select>{/* Theme options */}</Select>
        </FormField>
      </FormSection>
    </Form>
  );
}
```

### Polymorphic Components

```tsx
// Type-safe component that can render as different elements
type PolymorphicProps<T extends ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

export function Text<T extends ElementType = 'p'>({
  as,
  className,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || 'p'
  return <Component className={cn('text-base', className)} {...props} />
}

// Usage:
<Text>Default paragraph</Text>
<Text as="h1" className="text-2xl">Heading</Text>
<Text as="span" className="text-sm">Inline text</Text>
```

## 3. 🔥 ADVANCED DATA PATTERNS

### Server Actions with Optimistic Updates

```tsx
'use client';

export function TodoList({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

  async function addTodo(formData: FormData) {
    const title = formData.get('title') as string;
    const tempId = Date.now();

    // Optimistic update
    setTodos(prev => [...prev, { id: tempId, title, completed: false }]);

    try {
      const newTodo = await createTodo(title);
      setTodos(prev => prev.map(todo => (todo.id === tempId ? newTodo : todo)));
    } catch (error) {
      // Revert optimistic update
      setTodos(prev => prev.filter(todo => todo.id !== tempId));
      toast({ title: 'Error', description: 'Failed to add todo' });
    }
  }

  return (
    <div>
      <form action={addTodo}>
        <Input name="title" placeholder="Add todo..." />
        <Button type="submit">Add</Button>
      </form>

      {todos.map(todo => (
        <Card key={todo.id}>
          <CardContent>
            <div className="flex items-center gap-2">
              <Checkbox checked={todo.completed} />
              <span>{todo.title}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

### Parallel Data Loading

```tsx
// Multiple async components loading in parallel
export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <RecentOrders />
      </Suspense>

      <Suspense fallback={<ActivitySkeleton />}>
        <ActivityFeed />
      </Suspense>
    </div>
  );
}
```

## 4. 🎨 ADVANCED UI PATTERNS

### Dynamic Theme System

```tsx
// components/theme/ThemeCustomizer.tsx
'use client';

export function ThemeCustomizer() {
  const [config, setConfig] = useState({
    theme: 'system',
    radius: 0.5,
    color: 'slate',
  });

  useEffect(() => {
    // Apply CSS custom properties
    document.documentElement.style.setProperty('--radius', `${config.radius}rem`);

    // Update theme
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    if (config.theme !== 'system') {
      root.classList.add(config.theme);
    }
  }, [config]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize Theme</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Theme</Label>
          <Select value={config.theme} onValueChange={theme => setConfig(prev => ({ ...prev, theme }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Border Radius</Label>
          <Slider
            value={[config.radius]}
            onValueChange={([radius]) => setConfig(prev => ({ ...prev, radius }))}
            max={1}
            min={0}
            step={0.1}
          />
        </div>
      </CardContent>
    </Card>
  );
}
```

### Command Palette (Your Style)

```tsx
'use client';

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Quick Actions">
              <CommandItem onSelect={() => (window.location.href = '/dashboard')}>
                <Home className="mr-2 h-4 w-4" />
                Go to Dashboard
              </CommandItem>
              <CommandItem onSelect={() => (window.location.href = '/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Open Settings
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Components">
              <CommandItem onSelect={() => (window.location.href = '/component-showcase')}>
                <Palette className="mr-2 h-4 w-4" />
                Component Showcase
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
```

## 5. 🚀 DEPLOYMENT OPTIMIZATIONS

### Bundle Analysis

```bash
# Check what you're shipping
yarn analyze

# Component tree-shaking validation
npx next-bundle-analyzer
```

### Performance Monitoring

```tsx
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
```

## 6. 🧪 TESTING EXCELLENCE

### Component Testing with your setup

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('handles async actions with loading state', async () => {
    const mockAction = vi.fn().mockResolvedValueOnce(undefined);

    render(
      <Button loading={false} onClick={mockAction}>
        Submit
      </Button>
    );

    const button = screen.getByRole('button', { name: /submit/i });

    await userEvent.click(button);

    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
```

## 🏆 YOUR NEXT STEPS

1. **Add Command Palette** - Universal search/navigation
2. **Implement Server Actions** - Form handling without API routes
3. **Create Theme Customizer** - Live theme editing
4. **Add Performance Monitoring** - Track real user metrics
5. **Build Component Variants** - More business-specific components

Your architecture is already enterprise-grade. These patterns will make it legendary! 🚀
