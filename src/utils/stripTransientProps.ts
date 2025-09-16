/**
 * Removes transient props (prefixed with $) from being passed to DOM elements
 * This is commonly used with styled-components to prevent React warnings
 */
export function stripTransientProps<T extends Record<string, any>>(
  props: T
): Omit<T, keyof T & `$${string}`> {
  const result = {} as any;
  for (const key in props) {
    if (!key.startsWith('$')) {
      result[key] = props[key];
    }
  }
  return result;
}
