# ♿ Accessibility Patterns & Excellence

_Master WCAG 2.1 AA compliance: Build inclusive, accessible components that work for everyone_

---

## 🎯 What You'll Learn

- **WCAG 2.1 AA Guidelines**: Complete compliance strategies
- **Semantic HTML**: Foundation of accessible components
- **ARIA Patterns**: When and how to implement ARIA correctly
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Optimizing for assistive technologies
- **Testing & Validation**: Automated and manual testing approaches

---

## 🌟 Accessibility Philosophy at Daedalus

Accessibility isn't a feature—it's a **fundamental requirement**. We build for the **15% of the global population** with disabilities first, which benefits everyone:

```typescript
// The Daedalus A11y Commitment
const ACCESSIBILITY_PRINCIPLES = {
  perceivable: 'Information must be presentable in ways users can perceive',
  operable: 'Interface components must be operable by all users',
  understandable: 'Information and UI operation must be understandable',
  robust: 'Content must be robust enough for various assistive technologies',
} as const;

// Our Quality Standards
const A11Y_REQUIREMENTS = {
  wcagLevel: 'AA' as const,
  keyboardNavigation: '100% operable with keyboard only',
  screenReaderSupport: 'Complete semantic markup and ARIA',
  colorContrast: 'Minimum 4.5:1 for normal text, 3:1 for large text',
  focusManagement: 'Clear, logical focus order and visible indicators',
  semanticHTML: 'HTML5 semantics with proper landmark roles',
} as const;
```

---

## 🏗️ Semantic HTML Foundation

### **Proper HTML Structure**

```tsx
// ❌ BAD: Div-soup without semantics
const BadComponent = () => (
  <div className="header">
    <div className="nav">
      <div className="nav-item">Home</div>
      <div className="nav-item">About</div>
    </div>
    <div className="main">
      <div className="article">
        <div className="title">Article Title</div>
        <div className="content">Article content...</div>
      </div>
    </div>
  </div>
);

// ✅ GOOD: Semantic HTML structure
const AccessibleComponent = () => (
  <div className="page-layout">
    {/* Skip link for keyboard users */}
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>

    <header role="banner">
      <nav role="navigation" aria-label="Main navigation">
        <ul>
          <li>
            <a href="/" aria-current="page">
              Home
            </a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>

    <main id="main-content" role="main">
      <article>
        <header>
          <h1>Article Title</h1>
          <p>
            <time dateTime="2024-01-15">January 15, 2024</time> by
            <span itemProp="author">John Doe</span>
          </p>
        </header>

        <section>
          <h2>Article Section</h2>
          <p>Article content with proper semantic structure...</p>
        </section>
      </article>
    </main>

    <aside role="complementary" aria-label="Related articles">
      <h2>Related Articles</h2>
      {/* Related content */}
    </aside>

    <footer role="contentinfo">
      <p>&copy; 2024 Daedalus. All rights reserved.</p>
    </footer>
  </div>
);
```

### **Accessible Form Patterns**

```tsx
// Complete accessible form implementation
interface AccessibleFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
  errors?: Record<string, string>;
}

const AccessibleForm = ({ onSubmit, isLoading = false, errors = {} }: AccessibleFormProps) => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
    birthDate: '',
    country: '',
  });

  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const formRef = React.useRef<HTMLFormElement>(null);

  // Form validation
  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return typeof value === 'string' && value.length < 2 ? 'Must be at least 2 characters' : '';

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return typeof value === 'string' && !emailRegex.test(value) ? 'Please enter a valid email address' : '';

      case 'password':
        return typeof value === 'string' && value.length < 8 ? 'Password must be at least 8 characters' : '';

      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';

      default:
        return '';
    }
  };

  const handleFieldChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    const error = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);

      // Focus first field with error
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = formRef.current?.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      errorElement?.focus();

      return;
    }

    onSubmit(formData);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Registration form">
      {/* Form title and description */}
      <fieldset>
        <legend>Personal Information</legend>

        {/* First Name */}
        <div className="form-field">
          <label htmlFor="firstName" className="required">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={e => handleFieldChange('firstName', e.target.value)}
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.firstName}
            aria-describedby={fieldErrors.firstName ? 'firstName-error' : 'firstName-hint'}
            className={cn('form-input', fieldErrors.firstName && 'form-input--error')}
          />
          <div id="firstName-hint" className="form-hint">
            Enter your first name as it appears on official documents
          </div>
          {fieldErrors.firstName && (
            <div id="firstName-error" className="form-error" role="alert">
              <span aria-hidden="true">⚠️</span>
              {fieldErrors.firstName}
            </div>
          )}
        </div>

        {/* Last Name */}
        <div className="form-field">
          <label htmlFor="lastName" className="required">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={e => handleFieldChange('lastName', e.target.value)}
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.lastName}
            aria-describedby={fieldErrors.lastName ? 'lastName-error' : undefined}
            className={cn('form-input', fieldErrors.lastName && 'form-input--error')}
          />
          {fieldErrors.lastName && (
            <div id="lastName-error" className="form-error" role="alert">
              <span aria-hidden="true">⚠️</span>
              {fieldErrors.lastName}
            </div>
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend>Account Details</legend>

        {/* Email */}
        <div className="form-field">
          <label htmlFor="email" className="required">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={e => handleFieldChange('email', e.target.value)}
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : 'email-hint'}
            className={cn('form-input', fieldErrors.email && 'form-input--error')}
          />
          <div id="email-hint" className="form-hint">
            We'll use this to send you account notifications
          </div>
          {fieldErrors.email && (
            <div id="email-error" className="form-error" role="alert">
              <span aria-hidden="true">⚠️</span>
              {fieldErrors.email}
            </div>
          )}
        </div>

        {/* Password */}
        <div className="form-field">
          <label htmlFor="password" className="required">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={e => handleFieldChange('password', e.target.value)}
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.password}
            aria-describedby="password-requirements"
            className={cn('form-input', fieldErrors.password && 'form-input--error')}
          />
          <div id="password-requirements" className="form-hint">
            Password must be at least 8 characters long
          </div>
          {fieldErrors.password && (
            <div className="form-error" role="alert">
              <span aria-hidden="true">⚠️</span>
              {fieldErrors.password}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="form-field">
          <label htmlFor="confirmPassword" className="required">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={e => handleFieldChange('confirmPassword', e.target.value)}
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.confirmPassword}
            className={cn('form-input', fieldErrors.confirmPassword && 'form-input--error')}
          />
          {fieldErrors.confirmPassword && (
            <div className="form-error" role="alert">
              <span aria-hidden="true">⚠️</span>
              {fieldErrors.confirmPassword}
            </div>
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend>Additional Information</legend>

        {/* Birth Date */}
        <div className="form-field">
          <label htmlFor="birthDate">Date of Birth</label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={e => handleFieldChange('birthDate', e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            aria-describedby="birthDate-hint"
            className="form-input"
          />
          <div id="birthDate-hint" className="form-hint">
            Optional: Used for age verification
          </div>
        </div>

        {/* Country Selection */}
        <div className="form-field">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={e => handleFieldChange('country', e.target.value)}
            className="form-select"
            aria-describedby="country-hint"
          >
            <option value="">Select your country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
          </select>
          <div id="country-hint" className="form-hint">
            Used for localization and legal compliance
          </div>
        </div>

        {/* Newsletter Checkbox */}
        <div className="form-field">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.newsletter}
              onChange={e => handleFieldChange('newsletter', e.target.checked)}
              aria-describedby="newsletter-hint"
              className="form-checkbox"
            />
            <span className="checkbox-text">Subscribe to newsletter</span>
          </label>
          <div id="newsletter-hint" className="form-hint">
            Receive updates and special offers (you can unsubscribe anytime)
          </div>
        </div>
      </fieldset>

      {/* Global form errors */}
      {Object.keys(errors).length > 0 && (
        <div className="form-errors" role="alert" aria-live="polite">
          <h3>Please correct the following errors:</h3>
          <ul>
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>
                <a href={`#${field}`}>{error}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit Button */}
      <div className="form-actions">
        <button
          type="submit"
          disabled={isLoading}
          aria-describedby="submit-hint"
          className={cn('btn btn-primary', isLoading && 'btn-loading')}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner" aria-hidden="true" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
        <div id="submit-hint" className="form-hint">
          By creating an account, you agree to our Terms of Service
        </div>
      </div>
    </form>
  );
};
```

---

## 🔧 ARIA Patterns Implementation

### **Accessible Dropdown/Combobox**

```tsx
// Complete ARIA combobox implementation
interface ComboboxOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

interface AccessibleComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

const AccessibleCombobox = ({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option...',
  label,
  description,
  error,
  disabled = false,
  required = false,
}: AccessibleComboboxProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const [searchTerm, setSearchTerm] = React.useState('');

  const comboboxRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listboxRef = React.useRef<HTMLUListElement>(null);

  const comboboxId = React.useId();
  const listboxId = `${comboboxId}-listbox`;
  const labelId = `${comboboxId}-label`;
  const descriptionId = description ? `${comboboxId}-description` : undefined;
  const errorId = error ? `${comboboxId}-error` : undefined;

  // Filter options based on search term
  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options;
    return options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [options, searchTerm]);

  // Find selected option
  const selectedOption = options.find(option => option.value === value);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(filteredOptions.length - 1);
        } else {
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          const option = filteredOptions[focusedIndex];
          if (!option.disabled) {
            onValueChange(option.value);
            setIsOpen(false);
            setFocusedIndex(-1);
            setSearchTerm('');
          }
        } else {
          setIsOpen(!isOpen);
        }
        break;

      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          inputRef.current?.focus();
        }
        break;

      case 'Tab':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;

      default:
        // Handle typing for search
        if (e.key.length === 1) {
          setIsOpen(true);
        }
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll focused option into view
  React.useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const focusedElement = listboxRef.current?.children[focusedIndex] as HTMLElement;
      focusedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, focusedIndex]);

  return (
    <div className="combobox-container" ref={comboboxRef}>
      {/* Label */}
      <label id={labelId} htmlFor={comboboxId} className={cn('combobox-label', required && 'required')}>
        {label}
      </label>

      {/* Description */}
      {description && (
        <div id={descriptionId} className="combobox-description">
          {description}
        </div>
      )}

      {/* Combobox Input */}
      <div className="combobox-wrapper">
        <input
          ref={inputRef}
          id={comboboxId}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-labelledby={labelId}
          aria-describedby={cn(descriptionId, errorId).trim() || undefined}
          aria-required={required}
          aria-invalid={!!error}
          value={searchTerm || selectedOption?.label || ''}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          onChange={e => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className={cn('combobox-input', error && 'combobox-input--error', disabled && 'combobox-input--disabled')}
        />

        {/* Dropdown Arrow */}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          aria-hidden="true"
          className="combobox-trigger"
        >
          <ChevronDown className={cn('combobox-arrow', isOpen && 'combobox-arrow--open')} />
        </button>
      </div>

      {/* Options Listbox */}
      {isOpen && (
        <ul ref={listboxRef} id={listboxId} role="listbox" aria-labelledby={labelId} className="combobox-listbox">
          {filteredOptions.length === 0 ? (
            <li className="combobox-option combobox-option--no-results">No options found</li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={option.id}
                role="option"
                aria-selected={option.value === value}
                aria-disabled={option.disabled}
                className={cn(
                  'combobox-option',
                  index === focusedIndex && 'combobox-option--focused',
                  option.value === value && 'combobox-option--selected',
                  option.disabled && 'combobox-option--disabled'
                )}
                onClick={() => {
                  if (!option.disabled) {
                    onValueChange(option.value);
                    setIsOpen(false);
                    setFocusedIndex(-1);
                    setSearchTerm('');
                  }
                }}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                {option.label}
                {option.value === value && <Check className="combobox-check" aria-hidden="true" />}
              </li>
            ))
          )}
        </ul>
      )}

      {/* Error Message */}
      {error && (
        <div id={errorId} className="combobox-error" role="alert">
          <AlertCircle className="combobox-error-icon" aria-hidden="true" />
          {error}
        </div>
      )}
    </div>
  );
};
```

### **Accessible Modal/Dialog**

```tsx
// Complete accessible modal implementation
interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  finalFocusRef?: React.RefObject<HTMLElement>;
}

const AccessibleModal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnEscape = true,
  closeOnOverlayClick = true,
  initialFocusRef,
  finalFocusRef,
}: AccessibleModalProps) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  const titleId = React.useId();
  const descriptionId = React.useId();

  // Focus management
  React.useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus the initial element or the modal itself
      const focusElement = initialFocusRef?.current || modalRef.current;
      if (focusElement) {
        focusElement.focus();
      }
    } else {
      // Return focus to the previously focused element
      const returnFocus = finalFocusRef?.current || previousFocusRef.current;
      if (returnFocus) {
        returnFocus.focus();
      }
    }
  }, [isOpen, initialFocusRef, finalFocusRef]);

  // Trap focus within the modal
  React.useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTabKey);
    return () => modal.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose();
    }
  };

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-portal">
      {/* Overlay */}
      <div ref={overlayRef} className="modal-overlay" onClick={handleOverlayClick} aria-hidden="true" />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn('modal', `modal--${size}`)}
        tabIndex={-1}
      >
        {/* Header */}
        <header className="modal-header">
          <h2 id={titleId} className="modal-title">
            {title}
          </h2>

          <button type="button" onClick={onClose} aria-label="Close dialog" className="modal-close">
            <X className="modal-close-icon" aria-hidden="true" />
          </button>
        </header>

        {/* Description */}
        {description && (
          <div id={descriptionId} className="modal-description">
            {description}
          </div>
        )}

        {/* Content */}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

// Usage with proper focus management
const ModalExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const openButtonRef = React.useRef<HTMLButtonElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div>
      <button ref={openButtonRef} onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <AccessibleModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirmation Required"
        description="This action cannot be undone. Are you sure you want to continue?"
        initialFocusRef={closeButtonRef}
        finalFocusRef={openButtonRef}
      >
        <div className="space-y-4">
          <p>This will permanently delete your account and all associated data.</p>

          <div className="flex gap-3">
            <button ref={closeButtonRef} onClick={() => setIsOpen(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button
              onClick={() => {
                console.log('Account deleted');
                setIsOpen(false);
              }}
              className="btn btn-danger"
            >
              Delete Account
            </button>
          </div>
        </div>
      </AccessibleModal>
    </div>
  );
};
```

---

## ⌨️ Keyboard Navigation Patterns

### **Comprehensive Keyboard Support**

```tsx
// Custom hook for keyboard navigation
interface UseKeyboardNavigationOptions {
  items: string[] | number[];
  onSelect: (index: number) => void;
  orientation?: 'horizontal' | 'vertical' | 'both';
  wrap?: boolean;
  disabled?: boolean;
}

const useKeyboardNavigation = ({
  items,
  onSelect,
  orientation = 'vertical',
  wrap = true,
  disabled = false,
}: UseKeyboardNavigationOptions) => {
  const [focusedIndex, setFocusedIndex] = React.useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || items.length === 0) return;

    const isVertical = orientation === 'vertical' || orientation === 'both';
    const isHorizontal = orientation === 'horizontal' || orientation === 'both';

    switch (e.key) {
      case 'ArrowDown':
        if (isVertical) {
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev + 1;
            return wrap ? next % items.length : Math.min(next, items.length - 1);
          });
        }
        break;

      case 'ArrowUp':
        if (isVertical) {
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev - 1;
            return wrap ? (next + items.length) % items.length : Math.max(next, 0);
          });
        }
        break;

      case 'ArrowRight':
        if (isHorizontal) {
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev + 1;
            return wrap ? next % items.length : Math.min(next, items.length - 1);
          });
        }
        break;

      case 'ArrowLeft':
        if (isHorizontal) {
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev - 1;
            return wrap ? (next + items.length) % items.length : Math.max(next, 0);
          });
        }
        break;

      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;

      case 'End':
        e.preventDefault();
        setFocusedIndex(items.length - 1);
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0) {
          onSelect(focusedIndex);
        }
        break;

      case 'Escape':
        setFocusedIndex(-1);
        break;
    }
  };

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
  };
};

// Accessible list with keyboard navigation
interface AccessibleListProps<T> {
  items: T[];
  onSelect: (item: T, index: number) => void;
  renderItem: (item: T, index: number, isFocused: boolean) => React.ReactNode;
  label: string;
  description?: string;
  orientation?: 'horizontal' | 'vertical';
  multiselect?: boolean;
}

const AccessibleList = <T,>({
  items,
  onSelect,
  renderItem,
  label,
  description,
  orientation = 'vertical',
  multiselect = false,
}: AccessibleListProps<T>) => {
  const [selectedIndices, setSelectedIndices] = React.useState<Set<number>>(new Set());
  const listRef = React.useRef<HTMLUListElement>(null);

  const listId = React.useId();
  const labelId = `${listId}-label`;
  const descriptionId = description ? `${listId}-description` : undefined;

  const { focusedIndex, setFocusedIndex, handleKeyDown } = useKeyboardNavigation({
    items: items.map((_, index) => index),
    onSelect: index => {
      const item = items[index];
      if (multiselect) {
        setSelectedIndices(prev => {
          const newSet = new Set(prev);
          if (newSet.has(index)) {
            newSet.delete(index);
          } else {
            newSet.add(index);
          }
          return newSet;
        });
      } else {
        setSelectedIndices(new Set([index]));
      }
      onSelect(item, index);
    },
    orientation,
  });

  // Focus management
  React.useEffect(() => {
    if (focusedIndex >= 0) {
      const focusedElement = listRef.current?.children[focusedIndex] as HTMLElement;
      focusedElement?.focus();
    }
  }, [focusedIndex]);

  return (
    <div className="accessible-list-container">
      <div id={labelId} className="accessible-list-label">
        {label}
      </div>

      {description && (
        <div id={descriptionId} className="accessible-list-description">
          {description}
        </div>
      )}

      <ul
        ref={listRef}
        id={listId}
        role={multiselect ? 'listbox' : 'listbox'}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        aria-multiselectable={multiselect}
        aria-orientation={orientation}
        className={cn('accessible-list', `accessible-list--${orientation}`)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {items.map((item, index) => (
          <li
            key={index}
            role="option"
            aria-selected={selectedIndices.has(index)}
            tabIndex={-1}
            className={cn(
              'accessible-list-item',
              index === focusedIndex && 'accessible-list-item--focused',
              selectedIndices.has(index) && 'accessible-list-item--selected'
            )}
            onClick={() => {
              setFocusedIndex(index);
              if (multiselect) {
                setSelectedIndices(prev => {
                  const newSet = new Set(prev);
                  if (newSet.has(index)) {
                    newSet.delete(index);
                  } else {
                    newSet.add(index);
                  }
                  return newSet;
                });
              } else {
                setSelectedIndices(new Set([index]));
              }
              onSelect(item, index);
            }}
          >
            {renderItem(item, index, index === focusedIndex)}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Usage example
const NavigationExample = () => {
  const menuItems = [
    { id: '1', label: 'Dashboard', icon: '🏠' },
    { id: '2', label: 'Profile', icon: '👤' },
    { id: '3', label: 'Settings', icon: '⚙️' },
    { id: '4', label: 'Help', icon: '❓' },
    { id: '5', label: 'Logout', icon: '🚪' },
  ];

  return (
    <AccessibleList
      items={menuItems}
      onSelect={item => console.log('Selected:', item.label)}
      label="Main Navigation"
      description="Use arrow keys to navigate, Enter to select"
      renderItem={(item, index, isFocused) => (
        <div className="nav-item">
          <span aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
          {isFocused && <span className="sr-only">(focused)</span>}
        </div>
      )}
    />
  );
};
```

---

## 🔍 Screen Reader Optimization

### **Screen Reader Friendly Patterns**

```tsx
// Optimized for screen readers
const ScreenReaderOptimized = () => {
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  return (
    <div>
      {/* Progress indicator with proper ARIA */}
      <div className="progress-container">
        <label htmlFor="file-upload-progress">Upload Progress</label>

        <div
          id="file-upload-progress"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Upload progress: ${progress}% complete`}
          className="progress-bar"
        >
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Screen reader text */}
        <div className="sr-only" aria-live="polite">
          {progress === 100 ? 'Upload complete' : `${progress}% uploaded`}
        </div>
      </div>

      {/* Status announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {status === 'loading' && 'Processing...'}
        {status === 'success' && 'Operation completed successfully'}
        {status === 'error' && 'An error occurred. Please try again.'}
      </div>

      {/* Interactive content with rich descriptions */}
      <article>
        <header>
          <h1>Article Title</h1>
          <div className="article-meta">
            <time dateTime="2024-01-15">
              <span aria-label="Published on January 15th, 2024">Jan 15, 2024</span>
            </time>
            <span aria-label="Reading time: approximately 5 minutes">5 min read</span>
            <span aria-label="Article category">Technology</span>
          </div>
        </header>

        <div className="article-content">
          <p>
            This article discusses modern web accessibility practices.
            <a href="/accessibility-guide" aria-describedby="accessibility-guide-description">
              Learn more about accessibility
            </a>
            <span id="accessibility-guide-description" className="sr-only">
              Opens a comprehensive guide to web accessibility in a new page
            </span>
          </p>

          {/* Complex data table */}
          <table role="table" aria-label="Accessibility compliance scores by category" className="data-table">
            <caption>
              Website accessibility scores across different categories. Scores range from 0 to 100, with 100 being fully
              compliant.
            </caption>

            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Score</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th scope="row">Color Contrast</th>
                <td>95</td>
                <td>
                  <span className="status status--excellent" aria-label="Excellent compliance">
                    ✅ Excellent
                  </span>
                </td>
                <td>
                  <button type="button" aria-label="View color contrast details" className="btn btn-small">
                    Details
                  </button>
                </td>
              </tr>

              <tr>
                <th scope="row">Keyboard Navigation</th>
                <td>88</td>
                <td>
                  <span className="status status--good" aria-label="Good compliance with minor issues">
                    ⚠️ Good
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    aria-label="View keyboard navigation issues and fixes"
                    className="btn btn-small"
                  >
                    Fix Issues
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Interactive form with rich feedback */}
          <form className="feedback-form">
            <fieldset>
              <legend>Rate this article</legend>

              <div className="rating-group" role="radiogroup" aria-label="Article rating from 1 to 5 stars">
                {[1, 2, 3, 4, 5].map(rating => (
                  <label key={rating} className="rating-option">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      aria-describedby={`rating-${rating}-description`}
                    />
                    <span className="rating-stars" aria-hidden="true">
                      {'★'.repeat(rating)}
                      {'☆'.repeat(5 - rating)}
                    </span>
                    <span id={`rating-${rating}-description`} className="sr-only">
                      {rating} star{rating !== 1 ? 's' : ''} out of 5
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form-field">
              <label htmlFor="feedback-comment">Additional Comments</label>
              <textarea
                id="feedback-comment"
                rows={4}
                placeholder="Tell us what you thought about this article..."
                aria-describedby="comment-hint"
              />
              <div id="comment-hint" className="form-hint">
                Your feedback helps us improve our content (optional)
              </div>
            </div>

            <button type="submit" className="btn btn-primary" aria-describedby="submit-feedback-help">
              Submit Feedback
            </button>
            <div id="submit-feedback-help" className="sr-only">
              Submitting feedback will help us improve this article for future readers
            </div>
          </form>
        </div>
      </article>

      {/* Dynamic content with proper announcements */}
      <section aria-label="Real-time notifications">
        <h2>Notifications</h2>

        <div
          aria-live="assertive"
          aria-atomic="false"
          className="notification-region"
          aria-label="Important notifications"
        >
          {/* Important notifications appear here */}
        </div>

        <div aria-live="polite" aria-atomic="false" className="sr-only" aria-label="General updates">
          {/* Non-critical updates appear here */}
        </div>
      </section>
    </div>
  );
};
```

---

## 🧪 Accessibility Testing

### **Automated Testing Setup**

```typescript
// Jest + React Testing Library accessibility tests
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import AccessibleButton from './AccessibleButton';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('AccessibleButton', () => {
  // Basic accessibility tests
  it('should not have any accessibility violations', async () => {
    const { container } = render(
      <AccessibleButton>Click me</AccessibleButton>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Keyboard navigation tests
  it('should be focusable and operable with keyboard', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <AccessibleButton onClick={handleClick}>
        Click me
      </AccessibleButton>
    );

    const button = screen.getByRole('button', { name: 'Click me' });

    // Tab to focus
    await user.tab();
    expect(button).toHaveFocus();

    // Enter to activate
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Space to activate
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  // Screen reader tests
  it('should provide proper screen reader information', () => {
    render(
      <AccessibleButton
        aria-label="Close dialog"
        aria-describedby="close-help"
      >
        ×
      </AccessibleButton>
    );

    const button = screen.getByRole('button', { name: 'Close dialog' });
    expect(button).toHaveAttribute('aria-describedby', 'close-help');
  });

  // Focus management tests
  it('should manage focus properly when disabled', () => {
    render(
      <AccessibleButton disabled>
        Disabled button
      </AccessibleButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  // ARIA state tests
  it('should announce loading state properly', () => {
    render(
      <AccessibleButton loading aria-describedby="loading-text">
        Save Changes
      </AccessibleButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  // Color contrast tests (if using specific colors)
  it('should meet color contrast requirements', async () => {
    const { container } = render(
      <AccessibleButton variant="primary">
        Primary Action
      </AccessibleButton>
    );

    // Test with axe color contrast rules
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });

    expect(results).toHaveNoViolations();
  });
});

// Form accessibility tests
describe('AccessibleForm', () => {
  it('should have proper form structure and labels', async () => {
    const { container } = render(<AccessibleForm />);

    // Check for form accessibility
    const results = await axe(container);
    expect(results).toHaveNoViolations();

    // Verify all inputs have labels
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      expect(input).toHaveAccessibleName();
    });

    // Verify fieldsets have legends
    const fieldsets = container.querySelectorAll('fieldset');
    fieldsets.forEach(fieldset => {
      expect(fieldset.querySelector('legend')).toBeInTheDocument();
    });
  });

  it('should show error messages with proper ARIA', async () => {
    const user = userEvent.setup();

    render(<AccessibleForm />);

    const emailInput = screen.getByLabelText(/email/i);

    // Enter invalid email
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // Trigger validation

    // Check for error message
    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(emailInput).toHaveAttribute('aria-describedby');
  });
});

// Modal accessibility tests
describe('AccessibleModal', () => {
  it('should trap focus and handle keyboard navigation', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <AccessibleModal
        isOpen={true}
        onClose={onClose}
        title="Test Modal"
      >
        <button>First button</button>
        <button>Second button</button>
      </AccessibleModal>
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveFocus();

    // Test escape key
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();

    // Test focus trap
    const firstButton = screen.getByText('First button');
    const secondButton = screen.getByText('Second button');
    const closeButton = screen.getByLabelText(/close/i);

    firstButton.focus();

    // Tab should move to second button
    await user.tab();
    expect(secondButton).toHaveFocus();

    // Tab should move to close button
    await user.tab();
    expect(closeButton).toHaveFocus();

    // Tab should wrap back to first button
    await user.tab();
    expect(firstButton).toHaveFocus();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <AccessibleModal
        isOpen={true}
        onClose={jest.fn()}
        title="Test Modal"
        description="Modal description"
      >
        <p>Modal content</p>
      </AccessibleModal>
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby');
    expect(modal).toHaveAttribute('aria-describedby');
  });
});
```

### **Manual Testing Checklist**

```typescript
// Accessibility testing checklist component
const AccessibilityTestingChecklist = () => {
  const [completedTests, setCompletedTests] = React.useState<Set<string>>(new Set());

  const testCategories = [
    {
      category: 'Keyboard Navigation',
      tests: [
        { id: 'tab-order', test: 'All interactive elements are reachable via Tab key' },
        { id: 'focus-visible', test: 'Focus indicators are clearly visible' },
        { id: 'no-keyboard-trap', test: 'No keyboard traps (can always escape)' },
        { id: 'skip-links', test: 'Skip links are available and functional' },
        { id: 'enter-space', test: 'Enter/Space activate buttons and links' },
        { id: 'arrow-keys', test: 'Arrow keys work in menus and lists' },
        { id: 'escape-key', test: 'Escape key closes modals and dropdowns' },
      ],
    },
    {
      category: 'Screen Reader Support',
      tests: [
        { id: 'page-title', test: 'Page has descriptive title' },
        { id: 'headings-hierarchy', test: 'Heading hierarchy is logical (h1, h2, h3...)' },
        { id: 'landmarks', test: 'Page uses semantic landmarks (nav, main, aside)' },
        { id: 'labels', test: 'All form controls have accessible labels' },
        { id: 'alt-text', test: 'Images have appropriate alt text' },
        { id: 'link-text', test: 'Link text is descriptive' },
        { id: 'button-labels', test: 'Buttons have clear, descriptive labels' },
        { id: 'aria-live', test: 'Dynamic content updates are announced' },
      ],
    },
    {
      category: 'Visual Design',
      tests: [
        { id: 'color-contrast', test: 'Text meets 4.5:1 contrast ratio' },
        { id: 'large-text-contrast', test: 'Large text meets 3:1 contrast ratio' },
        { id: 'color-only', test: 'Information not conveyed by color alone' },
        { id: 'zoom-200', test: 'Page usable at 200% zoom' },
        { id: 'focus-indicators', test: 'Focus indicators are visible and clear' },
        { id: 'responsive-design', test: 'Layout works on mobile devices' },
      ],
    },
    {
      category: 'Content & Structure',
      tests: [
        { id: 'semantic-markup', test: 'Uses semantic HTML elements' },
        { id: 'form-structure', test: 'Forms use fieldsets and legends' },
        { id: 'table-headers', test: 'Data tables have proper headers' },
        { id: 'error-messages', test: 'Error messages are clear and specific' },
        { id: 'instructions', test: 'Form instructions are provided' },
        { id: 'timeout-warnings', test: 'Users warned of session timeouts' },
      ],
    },
    {
      category: 'Interactive Elements',
      tests: [
        { id: 'button-purpose', test: 'Button purposes are clear' },
        { id: 'link-context', test: 'Link purposes are clear in context' },
        { id: 'form-validation', test: 'Form validation is accessible' },
        { id: 'modal-focus', test: 'Modal dialogs manage focus properly' },
        { id: 'dropdown-navigation', test: 'Dropdowns work with keyboard' },
        { id: 'tab-panels', test: 'Tab panels have proper ARIA' },
      ],
    },
  ];

  const toggleTest = (testId: string) => {
    setCompletedTests(prev => {
      const newSet = new Set(prev);
      if (newSet.has(testId)) {
        newSet.delete(testId);
      } else {
        newSet.add(testId);
      }
      return newSet;
    });
  };

  const totalTests = testCategories.reduce((sum, category) => sum + category.tests.length, 0);
  const completedCount = completedTests.size;
  const progressPercentage = (completedCount / totalTests) * 100;

  return (
    <div className="accessibility-checklist">
      <header className="checklist-header">
        <h1>Accessibility Testing Checklist</h1>
        <div className="progress-summary">
          <div
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Testing progress: ${completedCount} of ${totalTests} tests completed`}
            className="progress-bar"
          >
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p>{completedCount} of {totalTests} tests completed ({progressPercentage.toFixed(1)}%)</p>
        </div>
      </header>

      {testCategories.map(category => (
        <section key={category.category} className="test-category">
          <h2>{category.category}</h2>
          <ul className="test-list">
            {category.tests.map(test => (
              <li key={test.id} className="test-item">
                <label className="test-label">
                  <input
                    type="checkbox"
                    checked={completedTests.has(test.id)}
                    onChange={() => toggleTest(test.id)}
                    aria-describedby={`${test.id}-description`}
                  />
                  <span className="test-text">{test.test}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <footer className="checklist-footer">
        <div className="testing-tools">
          <h3>Recommended Testing Tools</h3>
          <ul>
            <li><strong>axe DevTools:</strong> Browser extension for automated testing</li>
            <li><strong>WAVE:</strong> Web accessibility evaluation tool</li>
            <li><strong>Screen Reader:</strong> NVDA (Windows), VoiceOver (Mac), ORCA (Linux)</li>
            <li><strong>Keyboard Only:</strong> Unplug your mouse and navigate</li>
            <li><strong>Color Oracle:</strong> Color blindness simulator</li>
            <li><strong>Lighthouse:</strong> Built-in Chrome accessibility audit</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
```

---

## 🎯 Next Steps & Mastery

Ready to become an accessibility champion?

1. **🧪 [Testing Strategy](./06-testing-strategy.md)** - Integrate A11y into your testing pipeline
2. **📚 [Storybook Documentation](./08-storybook-documentation.md)** - Document accessibility features
3. **⚡ [Performance](./07-performance-optimization.md)** - Optimize for assistive technologies
4. **🎨 [Design System](./11-design-system.md)** - Accessible design tokens and patterns

---

## ♿ Accessibility Mastery Checklist

**✅ Foundation Knowledge**

- [ ] WCAG 2.1 AA guidelines understood
- [ ] Semantic HTML mastery achieved
- [ ] ARIA patterns properly implemented
- [ ] Screen reader testing completed

**✅ Implementation Skills**

- [ ] Keyboard navigation fully implemented
- [ ] Focus management mastered
- [ ] Form accessibility patterns applied
- [ ] Modal/dialog accessibility complete

**✅ Testing & Validation**

- [ ] Automated accessibility testing setup
- [ ] Manual testing checklist followed
- [ ] Screen reader testing performed
- [ ] Real user testing conducted

**✅ Advanced Patterns**

- [ ] Complex widget accessibility (combobox, tabs, etc.)
- [ ] Live region management
- [ ] High contrast mode support
- [ ] Reduced motion preferences

---

## 💡 Pro Tips for Accessibility Excellence

- **Test early and often**: Integrate accessibility testing into your development workflow
- **Use real assistive technology**: Test with actual screen readers, not just automated tools
- **Follow the standards**: WCAG 2.1 AA is your minimum baseline
- **Think about cognitive accessibility**: Clear language, logical flow, consistent patterns
- **Progressive enhancement**: Start with accessible HTML, enhance with JavaScript
- **Focus management is critical**: Always know where focus goes
- **Color and contrast matter**: Don't rely on color alone to convey information
- **Mobile accessibility**: Touch targets, gesture alternatives, voice control

---

_Accessibility mastery achieved! You're now building the inclusive web that works for everyone._ ♿✨
