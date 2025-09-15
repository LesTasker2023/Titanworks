import { cn } from '@/lib/utils';
import { describe, expect, it } from 'vitest';

describe('cn utility function', () => {
  it('should combine class names correctly', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('should handle conditional classes', () => {
    const result = cn('base-class', {
      'conditional-class': true,
      'hidden-class': false,
    });
    expect(result).toBe('base-class conditional-class');
  });

  it('should handle undefined and null values', () => {
    const result = cn('base', undefined, null, 'end');
    expect(result).toBe('base end');
  });
});
