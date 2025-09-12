// Utility to strip transient UI state props before spreading to DOM elements
// Do NOT strip 'disabled' or 'selected' as they are valid HTML attributes and required for accessibility/semantics
// Only strip props that are purely React state or not part of HTML spec

const TRANSIENT_PROPS = [
  'active',
  'hover',
  'focus',
  'loading',
  'open', // 'open' is not a standard attribute for most elements
  // 'disabled', // Removed: valid HTML attribute
  // 'selected', // Removed: valid HTML attribute
  'error',
  'expanded',
  'checked', // Only strip if not used for input elements
  'highlighted',
  'pressed',
  'toggled',
  'ariaActiveDescendant',
  'ariaSetSize',
  'ariaPosInSet',
];

export function stripTransientProps(props: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key in props) {
    if (!TRANSIENT_PROPS.includes(key)) {
      result[key] = props[key];
    }
  }
  return result;
}
