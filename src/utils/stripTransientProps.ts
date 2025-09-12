// Utility to strip transient UI state props before spreading to DOM elements
// Do NOT strip 'disabled' or 'selected' as they are valid HTML attributes and required for accessibility/semantics
// Only strip props that are purely React state or not part of HTML spec

// Props that represent component visual/interaction state but are NOT valid HTML attributes
// These cause React warnings when passed to DOM elements and must be stripped
const TRANSIENT_PROPS = [
  'active', // Component visual state (not HTML attribute)
  'hover', // Component visual state (not HTML attribute)
  'loading', // Component async state (not HTML attribute)
  'error', // Component validation state (not HTML attribute)
  'success', // Component validation state (not HTML attribute)
  'warning', // Component validation state (not HTML attribute)
  'pressed', // Component interaction state (use aria-pressed instead)
  'expanded', // Component interaction state (use aria-expanded instead)
  'toggled', // Component interaction state (use aria-pressed instead)
  'highlighted', // Component visual state (not HTML attribute)
  'focus', // Component visual state (use :focus-visible CSS instead)

  // Preserve legitimate HTML boolean attributes:
  // 'disabled' - Valid HTML5 form control attribute
  // 'selected' - Valid HTML5 option element attribute
  // 'checked'  - Valid HTML5 input element attribute
  // 'required' - Valid HTML5 form validation attribute
  // 'readonly' - Valid HTML5 form control attribute
  // 'hidden'   - Valid HTML5 global attribute
  // 'open'     - Valid HTML5 for details/dialog elements (context-dependent)
];

/**
 * Strip transient component state props that should not appear in the DOM.
 *
 * Rationale: React warns when non-HTML attributes are passed to DOM elements.
 * This utility preserves HTML semantics while removing component-internal state props.
 *
 * @param props Component props object
 * @returns Props object safe for DOM spreading
 */
export function stripTransientProps<T extends Record<string, any>>(props: T): T {
  const result = { ...props };

  // Only remove transient props, preserve all others including Radix-required props
  for (const key of TRANSIENT_PROPS) {
    if (key in result) {
      delete result[key];
    }
  }

  return result as T;
}
