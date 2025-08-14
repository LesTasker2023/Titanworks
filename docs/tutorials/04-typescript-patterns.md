# 🎨 TypeScript Patterns & Advanced Usage

_Master TypeScript in React: Type-safe components, generic patterns, and advanced type manipulation for bulletproof applications_

---

## 🎯 What You'll Learn

- Advanced TypeScript patterns for React components
- Generic component patterns and reusable type utilities
- Type-safe prop patterns and API design
- Performance optimization with TypeScript
- Enterprise-grade type safety patterns
- Advanced inference and conditional types

---

## 🚀 TypeScript Philosophy at TriggerKings

TypeScript isn't just about catching bugs—it's about **expressing intent**, **enabling refactoring confidence**, and **creating self-documenting APIs**:

```typescript
// The TriggerKings Type Strategy
type TypeScriptGoals = {
  readonly safety: 'Catch errors at compile time';
  readonly intent: 'Code that expresses developer intent clearly';
  readonly refactoring: 'Fearless large-scale changes';
  readonly documentation: 'Types as living documentation';
  readonly performance: 'Zero runtime overhead';
  readonly developer_experience: 'IntelliSense superpowers';
};

// Quality Standards
type TypeStandards = {
  readonly strictMode: true;
  readonly noImplicitAny: true;
  readonly exactOptionalPropertyTypes: true;
  readonly noUncheckedIndexedAccess: true;
  readonly strictNullChecks: true;
};
```

---

## 📋 Advanced Component Patterns

### **Generic Component Pattern**

```typescript
// Generic Button with type-safe variants
type VariantConfig<T extends Record<string, unknown>> = {
  [K in keyof T]: {
    styles: string;
    description: string;
    examples: string[];
  };
};

interface BaseComponentProps<TVariant extends string = string> {
  variant?: TVariant;
  className?: string;
  children?: React.ReactNode;
}

type StrictVariantProps<
  TConfig extends VariantConfig<any>,
  TVariant extends keyof TConfig = keyof TConfig
> = BaseComponentProps<TVariant> & {
  variant: TVariant;
};

// Usage with strict variant type checking
const buttonVariants = {
  primary: {
    styles: 'bg-blue-600 text-white hover:bg-blue-700',
    description: 'Primary call-to-action',
    examples: ['Submit', 'Save', 'Continue'],
  },
  secondary: {
    styles: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    description: 'Secondary actions',
    examples: ['Cancel', 'Back', 'Skip'],
  },
  danger: {
    styles: 'bg-red-600 text-white hover:bg-red-700',
    description: 'Destructive actions',
    examples: ['Delete', 'Remove', 'Clear'],
  },
} as const satisfies VariantConfig<any>;

type ButtonVariant = keyof typeof buttonVariants;
type ButtonProps = StrictVariantProps<typeof buttonVariants>;

const Button = <T extends ButtonVariant>({
  variant,
  children,
  className,
  ...props
}: ButtonProps) => {
  const variantStyles = buttonVariants[variant].styles;

  return (
    <button
      className={cn(variantStyles, className)}
      {...props}
    >
      {children}
    </button>
  );
};

// Type-safe usage - TypeScript will enforce only valid variants
<Button variant="primary">Valid</Button>
// <Button variant="invalid">❌ TypeScript Error</Button>
```

### **Polymorphic Component Pattern**

```typescript
// Polymorphic component that can render as any element
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & {
  ref?: PolymorphicRef<C>
};

// Implementation
interface TextProps {
  variant?: 'body' | 'heading' | 'caption';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted';
}

type TextComponent = <C extends React.ElementType = 'span'>(
  props: PolymorphicComponentPropWithRef<C, TextProps>
) => React.ReactElement | null;

const Text: TextComponent = React.forwardRef(
  <C extends React.ElementType = 'span'>({
    as,
    variant = 'body',
    size = 'md',
    weight = 'normal',
    color = 'primary',
    children,
    className,
    ...props
  }: PolymorphicComponentPropWithRef<C, TextProps>,
  ref?: PolymorphicRef<C>) => {
    const Component = as || 'span';

    const variantStyles = {
      body: 'font-sans',
      heading: 'font-serif font-bold',
      caption: 'font-mono text-xs',
    };

    const sizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          variantStyles[variant],
          sizeStyles[size],
          `font-${weight}`,
          `text-${color}`,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

// Usage - fully type-safe with proper element attributes
<Text as="h1" variant="heading" size="xl">Title</Text>
<Text as="p" variant="body">Paragraph text</Text>
<Text as="a" href="/link" variant="body" color="primary">Link</Text>
<Text as="button" onClick={handler} variant="caption">Button</Text>

// TypeScript ensures only valid attributes for each element type
```

### **Compound Component Pattern**

```typescript
// Advanced compound component with context and type safety
interface TabsContextValue {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline';
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within <Tabs>');
  }
  return context;
};

// Root component with generic defaultValue type
interface TabsProps<T extends string = string> {
  defaultValue?: T;
  value?: T;
  onValueChange?: (value: T) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline';
  children: React.ReactNode;
}

const Tabs = <T extends string>({
  defaultValue,
  value: controlledValue,
  onValueChange,
  orientation = 'horizontal',
  variant = 'default',
  children,
}: TabsProps<T>) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const value = controlledValue ?? internalValue;

  const handleValueChange = (newValue: string) => {
    if (!controlledValue) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue as T);
  };

  return (
    <TabsContext.Provider value={{
      selectedTab: value,
      setSelectedTab: handleValueChange,
      orientation,
      variant,
    }}>
      <div
        className={cn(
          'tabs',
          orientation === 'vertical' && 'flex flex-row',
          orientation === 'horizontal' && 'flex flex-col'
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// List component with type-safe children validation
interface TabsListProps {
  children: React.ReactElement<TabsTriggerProps> | React.ReactElement<TabsTriggerProps>[];
}

const TabsList = ({ children }: TabsListProps) => {
  const { orientation, variant } = useTabs();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        'tabs-list',
        orientation === 'horizontal' && 'flex flex-row border-b',
        orientation === 'vertical' && 'flex flex-col border-r',
        variant === 'pills' && 'bg-gray-100 rounded-lg p-1',
        variant === 'underline' && 'border-b-2'
      )}
    >
      {children}
    </div>
  );
};

// Trigger component with strict value typing
interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const TabsTrigger = ({ value, children, disabled = false }: TabsTriggerProps) => {
  const { selectedTab, setSelectedTab, variant } = useTabs();
  const isSelected = selectedTab === value;

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      aria-controls={`panel-${value}`}
      disabled={disabled}
      onClick={() => setSelectedTab(value)}
      className={cn(
        'tabs-trigger',
        'px-3 py-2 font-medium text-sm transition-colors',
        isSelected && 'text-blue-600',
        !isSelected && 'text-gray-700 hover:text-gray-900',
        disabled && 'opacity-50 cursor-not-allowed',
        variant === 'pills' && isSelected && 'bg-white rounded-md shadow-sm',
        variant === 'underline' && isSelected && 'border-b-2 border-blue-600',
      )}
    >
      {children}
    </button>
  );
};

// Content component with automatic ARIA
interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

const TabsContent = ({ value, children }: TabsContentProps) => {
  const { selectedTab } = useTabs();
  const isSelected = selectedTab === value;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className="tabs-content p-4"
    >
      {children}
    </div>
  );
};

// Export as compound component with sub-components
const TabsCompound = Object.assign(Tabs, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

// Usage - fully type-safe
<TabsCompound defaultValue="tab1" onValueChange={(value: 'tab1' | 'tab2' | 'tab3') => console.log(value)}>
  <TabsCompound.List>
    <TabsCompound.Trigger value="tab1">Tab 1</TabsCompound.Trigger>
    <TabsCompound.Trigger value="tab2">Tab 2</TabsCompound.Trigger>
    <TabsCompound.Trigger value="tab3">Tab 3</TabsCompound.Trigger>
  </TabsCompound.List>

  <TabsCompound.Content value="tab1">
    <h2>Content 1</h2>
  </TabsCompound.Content>
  <TabsCompound.Content value="tab2">
    <h2>Content 2</h2>
  </TabsCompound.Content>
  <TabsCompound.Content value="tab3">
    <h2>Content 3</h2>
  </TabsCompound.Content>
</TabsCompound>
```

---

## 🔥 Advanced Type Utilities

### **Type-Safe Event Handlers**

```typescript
// Generic event handler types
type EventHandler<T = HTMLElement, E = Event> = (event: E & { currentTarget: T }) => void;

type MouseEventHandler<T = HTMLElement> = EventHandler<T, React.MouseEvent<T>>;
type ChangeEventHandler<T = HTMLInputElement> = EventHandler<T, React.ChangeEvent<T>>;
type SubmitEventHandler<T = HTMLFormElement> = EventHandler<T, React.FormEvent<T>>;

// Type-safe form component
interface FormFieldProps<T extends Record<string, unknown>> {
  name: keyof T;
  value: T[keyof T];
  onChange: (name: keyof T, value: T[keyof T]) => void;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  required?: boolean;
  validation?: (value: T[keyof T]) => string | null;
}

const FormField = <T extends Record<string, unknown>>({
  name,
  value,
  onChange,
  label,
  type = 'text',
  required = false,
  validation,
}: FormFieldProps<T>) => {
  const [error, setError] = React.useState<string | null>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.currentTarget.value as T[keyof T];
    onChange(name, newValue);

    if (validation) {
      const validationError = validation(newValue);
      setError(validationError);
    }
  };

  return (
    <div className="form-field">
      <label htmlFor={String(name)} className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={String(name)}
        type={type}
        value={String(value)}
        onChange={handleChange}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${String(name)}-error` : undefined}
        className={cn(
          'mt-1 block w-full rounded-md border px-3 py-2',
          error ? 'border-red-500' : 'border-gray-300'
        )}
      />
      {error && (
        <p id={`${String(name)}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

// Type-safe form usage
interface UserForm {
  name: string;
  email: string;
  age: number;
  bio?: string;
}

const UserFormComponent = () => {
  const [formData, setFormData] = React.useState<UserForm>({
    name: '',
    email: '',
    age: 0,
  });

  const handleFieldChange = <K extends keyof UserForm>(
    name: K,
    value: UserForm[K]
  ) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      <FormField
        name="name"
        value={formData.name}
        onChange={handleFieldChange}
        label="Full Name"
        required
        validation={(value) => value.length < 2 ? 'Name must be at least 2 characters' : null}
      />
      <FormField
        name="email"
        value={formData.email}
        onChange={handleFieldChange}
        label="Email Address"
        type="email"
        required
        validation={(value) => !value.includes('@') ? 'Invalid email address' : null}
      />
    </form>
  );
};
```

### **Discriminated Union Patterns**

```typescript
// Type-safe API response handling
type ApiState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

// Type guard functions
const isLoading = <T>(state: ApiState<T>): state is { status: 'loading' } =>
  state.status === 'loading';

const isSuccess = <T>(state: ApiState<T>): state is { status: 'success'; data: T } =>
  state.status === 'success';

const isError = <T>(state: ApiState<T>): state is { status: 'error'; error: string } =>
  state.status === 'error';

// Generic hook with discriminated unions
function useApiCall<T>(apiCall: () => Promise<T>) {
  const [state, setState] = React.useState<ApiState<T>>({ status: 'idle' });

  const execute = async () => {
    setState({ status: 'loading' });

    try {
      const data = await apiCall();
      setState({ status: 'success', data });
    } catch (error) {
      setState({
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  return { state, execute };
}

// Type-safe component using discriminated union
const UserProfile = ({ userId }: { userId: string }) => {
  const { state, execute } = useApiCall(() =>
    fetch(`/api/users/${userId}`).then(res => res.json() as Promise<User>)
  );

  React.useEffect(() => {
    execute();
  }, [userId]);

  // TypeScript ensures exhaustive handling
  switch (state.status) {
    case 'idle':
      return <div>Click to load</div>;

    case 'loading':
      return <div>Loading user...</div>;

    case 'success':
      // state.data is properly typed as User
      return (
        <div>
          <h1>{state.data.name}</h1>
          <p>{state.data.email}</p>
        </div>
      );

    case 'error':
      // state.error is properly typed as string
      return <div>Error: {state.error}</div>;

    default:
      // TypeScript ensures this is never reached
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
  }
};
```

### **Template Literal Types**

```typescript
// CSS-in-JS with type-safe utilities
type SpacingScale = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20';
type SpacingProperty = 'p' | 'm' | 'px' | 'py' | 'pt' | 'pb' | 'pl' | 'pr' | 'mx' | 'my' | 'mt' | 'mb' | 'ml' | 'mr';
type SpacingClass = `${SpacingProperty}-${SpacingScale}`;

type ColorScale = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type ColorName = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'gray';
type ColorClass = `text-${ColorName}-${ColorScale}` | `bg-${ColorName}-${ColorScale}` | `border-${ColorName}-${ColorScale}`;

type TailwindClass = SpacingClass | ColorClass | 'flex' | 'block' | 'hidden' | 'relative' | 'absolute';

// Type-safe className utilities
const createClassNameBuilder = <T extends string>() => {
  const classes: T[] = [];

  return {
    add: (className: T) => {
      classes.push(className);
      return this;
    },
    build: () => classes.join(' '),
  };
};

// Usage with type safety
const className = createClassNameBuilder<TailwindClass>()
  .add('p-4')
  .add('bg-blue-500')
  .add('text-white')
  .build();

// Route parameter extraction
type ExtractRouteParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param]: string } & ExtractRouteParams<Rest>
    : T extends `${string}:${infer Param}`
      ? { [K in Param]: string }
      : {};

type UserRouteParams = ExtractRouteParams<'/users/:userId/posts/:postId'>;
// Result: { userId: string; postId: string }

const RouteComponent = ({ params }: { params: UserRouteParams }) => {
  // TypeScript knows params has userId and postId
  return <div>User: {params.userId}, Post: {params.postId}</div>;
};
```

---

## 🎯 Type-Safe API Patterns

### **Generic API Client**

```typescript
// Type-safe API client with generics
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

type ApiResult<T> = Promise<ApiResponse<T>>;

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): ApiResult<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(`API Error: ${error.message}`);
    }

    return response.json();
  }

  get<T>(endpoint: string): ApiResult<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T, U = unknown>(endpoint: string, data: U): ApiResult<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T, U = unknown>(endpoint: string, data: U): ApiResult<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string): ApiResult<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Type-safe API service layer
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface UpdateUserRequest extends Partial<CreateUserRequest> {}

class UserService {
  constructor(private api: ApiClient) {}

  getUsers(): ApiResult<User[]> {
    return this.api.get<User[]>('/users');
  }

  getUser(id: string): ApiResult<User> {
    return this.api.get<User>(`/users/${id}`);
  }

  createUser(data: CreateUserRequest): ApiResult<User> {
    return this.api.post<User, CreateUserRequest>('/users', data);
  }

  updateUser(id: string, data: UpdateUserRequest): ApiResult<User> {
    return this.api.put<User, UpdateUserRequest>(`/users/${id}`, data);
  }

  deleteUser(id: string): ApiResult<void> {
    return this.api.delete<void>(`/users/${id}`);
  }
}

// Type-safe React hook for API calls
function useUserService() {
  const api = React.useMemo(() => new ApiClient('/api'), []);
  const userService = React.useMemo(() => new UserService(api), [api]);

  return userService;
}

// Usage in components with full type safety
const UserList = () => {
  const userService = useUserService();
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getUsers();
      setUsers(response.data); // TypeScript knows this is User[]
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  );
};
```

---

## 🔧 Advanced Configuration Patterns

### **Type-Safe Configuration**

```typescript
// Environment-specific configuration with type safety
interface BaseConfig {
  readonly app: {
    readonly name: string;
    readonly version: string;
    readonly port: number;
  };
  readonly database: {
    readonly url: string;
    readonly poolSize: number;
  };
  readonly features: {
    readonly analytics: boolean;
    readonly debugMode: boolean;
  };
}

interface DevelopmentConfig extends BaseConfig {
  readonly environment: 'development';
  readonly features: BaseConfig['features'] & {
    readonly hotReload: true;
    readonly mockApi: boolean;
  };
}

interface ProductionConfig extends BaseConfig {
  readonly environment: 'production';
  readonly features: BaseConfig['features'] & {
    readonly hotReload: false;
    readonly compression: true;
    readonly caching: boolean;
  };
}

type Config = DevelopmentConfig | ProductionConfig;

// Configuration factory with environment detection
const createConfig = (): Config => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const baseConfig: BaseConfig = {
    app: {
      name: 'TriggerKings',
      version: '1.0.0',
      port: parseInt(process.env.PORT || '3000', 10),
    },
    database: {
      url: process.env.DATABASE_URL || 'localhost:5432',
      poolSize: 10,
    },
    features: {
      analytics: !isDevelopment,
      debugMode: isDevelopment,
    },
  };

  if (isDevelopment) {
    return {
      ...baseConfig,
      environment: 'development',
      features: {
        ...baseConfig.features,
        hotReload: true,
        mockApi: process.env.MOCK_API === 'true',
      },
    } satisfies DevelopmentConfig;
  }

  return {
    ...baseConfig,
    environment: 'production',
    features: {
      ...baseConfig.features,
      hotReload: false,
      compression: true,
      caching: process.env.ENABLE_CACHING !== 'false',
    },
  } satisfies ProductionConfig;
};

// Type-safe configuration access
const config = createConfig();

// Usage with type narrowing
if (config.environment === 'development') {
  // TypeScript knows this is DevelopmentConfig
  if (config.features.mockApi) {
    console.log('Using mock API');
  }
} else {
  // TypeScript knows this is ProductionConfig
  if (config.features.compression) {
    console.log('Compression enabled');
  }
}

// Configuration validation utility
const validateConfig = (config: Config): config is Config => {
  // Runtime validation that complements TypeScript
  const requiredEnvVars = ['DATABASE_URL'];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  if (config.app.port < 1 || config.app.port > 65535) {
    throw new Error('Port must be between 1 and 65535');
  }

  return true;
};

// Validated configuration export
export const appConfig = (() => {
  const config = createConfig();
  validateConfig(config);
  return config;
})();
```

---

## ⚡ Performance with TypeScript

### **Type-Only Imports**

```typescript
// Performance optimization: type-only imports
import type { ComponentProps, ReactElement } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';

// Only import types, not runtime code
type IconProps = ComponentProps<LucideIcon>;
type ButtonVariants = VariantProps<typeof buttonVariants>;

// Runtime imports are separate and explicit
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

// This pattern reduces bundle size and improves tree-shaking
```

### **Const Assertions for Performance**

```typescript
// Const assertions for immutable data structures
const THEME_COLORS = {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    900: '#1e3a8a',
  },
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    900: '#14532d',
  },
} as const;

// TypeScript can optimize this better than:
// const THEME_COLORS = { ... }; (mutable)

type ThemeColor = keyof typeof THEME_COLORS;
type ColorShade = keyof typeof THEME_COLORS.primary;

// Compile-time optimizations with satisfies
const buttonConfig = {
  variants: ['default', 'success', 'warning', 'danger'],
  sizes: ['sm', 'md', 'lg', 'xl'],
  defaultVariant: 'default',
  defaultSize: 'md',
} as const satisfies {
  variants: readonly string[];
  sizes: readonly string[];
  defaultVariant: string;
  defaultSize: string;
};

// TypeScript can inline these values at compile time
```

---

## 🛡️ Type Safety Best Practices

### **Strict Type Checking Setup**

```json
// tsconfig.json - Maximum type safety
{
  "compilerOptions": {
    // Strict mode options
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    // Additional checks
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "exactOptionalPropertyTypes": true,

    // Module resolution
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,

    // Modern JavaScript
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": false,

    // Path mapping
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", ".next", "dist"]
}
```

### **Runtime Type Validation**

```typescript
// Zod integration for runtime validation
import { z } from 'zod';

// Schema definition
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  age: z.number().min(0).max(150),
  preferences: z
    .object({
      theme: z.enum(['light', 'dark']),
      notifications: z.boolean(),
    })
    .optional(),
  createdAt: z.string().datetime(),
});

// Type inference from schema
type User = z.infer<typeof UserSchema>;

// Validation utility
const validateUser = (data: unknown): User => {
  return UserSchema.parse(data);
};

// Safe parsing with error handling
const safeParseUser = (data: unknown) => {
  const result = UserSchema.safeParse(data);

  if (result.success) {
    return { data: result.data, error: null };
  }

  return {
    data: null,
    error: result.error.errors.map(e => e.message).join(', '),
  };
};

// API response validation
const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  const rawData = await response.json();

  // Runtime validation ensures type safety
  return validateUser(rawData);
};

// Form validation with Zod
const UserFormSchema = UserSchema.omit({ id: true, createdAt: true });
type UserFormData = z.infer<typeof UserFormSchema>;

const validateUserForm = (formData: FormData): UserFormData => {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    age: parseInt(formData.get('age') as string, 10),
    preferences: {
      theme: formData.get('theme') as 'light' | 'dark',
      notifications: formData.get('notifications') === 'on',
    },
  };

  return UserFormSchema.parse(data);
};
```

---

## 💡 Advanced Debugging & Development

### **Type-Safe Debug Utilities**

```typescript
// Type-safe logging system
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: number;
  context?: Record<string, unknown>;
}

class TypeSafeLogger {
  private logs: LogEntry[] = [];

  private log(level: LogLevel, message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: Date.now(),
      context,
    };

    this.logs.push(entry);

    if (process.env.NODE_ENV === 'development') {
      const logFn = console[level] || console.log;
      logFn(`[${level.toUpperCase()}] ${message}`, context ? context : '');
    }
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, unknown>) {
    this.log('error', message, context);
  }

  getLogs(level?: LogLevel): LogEntry[] {
    return level
      ? this.logs.filter(log => log.level === level)
      : this.logs;
  }
}

// Type-safe performance monitoring
interface PerformanceEntry {
  name: string;
  startTime: number;
  endTime: number;
  duration: number;
  metadata?: Record<string, unknown>;
}

class PerformanceMonitor {
  private entries = new Map<string, number>();
  private completed: PerformanceEntry[] = [];

  start(name: string, metadata?: Record<string, unknown>) {
    this.entries.set(name, performance.now());
    return () => this.end(name, metadata);
  }

  end(name: string, metadata?: Record<string, unknown>) {
    const startTime = this.entries.get(name);
    if (!startTime) {
      logger.warn(`Performance measurement "${name}" was not started`);
      return;
    }

    const endTime = performance.now();
    const entry: PerformanceEntry = {
      name,
      startTime,
      endTime,
      duration: endTime - startTime,
      metadata,
    };

    this.completed.push(entry);
    this.entries.delete(name);

    logger.debug(`Performance: ${name} took ${entry.duration.toFixed(2)}ms`, metadata);
  }

  getEntries(): PerformanceEntry[] {
    return this.completed;
  }

  getSlowEntries(threshold = 100): PerformanceEntry[] {
    return this.completed.filter(entry => entry.duration > threshold);
  }
}

// Usage in React components
const logger = new TypeSafeLogger();
const performance = new PerformanceMonitor();

const ExpensiveComponent = ({ data }: { data: unknown[] }) => {
  React.useEffect(() => {
    const endPerf = performance.start('ExpensiveComponent:render', {
      dataLength: data.length
    });

    return () => {
      endPerf();
    };
  }, [data.length]);

  const processedData = React.useMemo(() => {
    logger.debug('Processing data', { count: data.length });
    return data.map(item => ({ ...item, processed: true }));
  }, [data]);

  return <div>{/* Render processed data */}</div>;
};
```

---

## 🎯 Next Steps & Mastery Path

Ready to level up your TypeScript game?

1. **🧪 [Testing Strategy](./06-testing-strategy.md)** - Type-safe testing patterns
2. **♿ [Accessibility](./05-accessibility-patterns.md)** - Type-safe A11y implementation
3. **⚡ [Performance](./07-performance-optimization.md)** - TypeScript optimization techniques
4. **🎨 [Design System](./11-design-system.md)** - Type-safe design tokens

---

## 💫 TypeScript Mastery Checklist

**✅ Advanced Patterns**

- [ ] Generic components with proper constraints
- [ ] Polymorphic components with type safety
- [ ] Compound components with context typing
- [ ] Discriminated unions for state management
- [ ] Template literal types for APIs

**✅ Performance Optimization**

- [ ] Type-only imports configured
- [ ] Const assertions for immutable data
- [ ] Satisfies operator for strict typing
- [ ] Bundle size optimization
- [ ] Tree-shaking optimization

**✅ Type Safety**

- [ ] Strict TypeScript configuration
- [ ] Runtime validation with Zod
- [ ] Exhaustive type checking
- [ ] Type-safe API clients
- [ ] Configuration typing

**✅ Development Experience**

- [ ] Type-safe debugging utilities
- [ ] Performance monitoring
- [ ] Error boundary typing
- [ ] Testing type integration
- [ ] Documentation generation

---

_TypeScript mastery achieved! Your code is now bulletproof, self-documenting, and refactorable with confidence._ 🛡️✨
