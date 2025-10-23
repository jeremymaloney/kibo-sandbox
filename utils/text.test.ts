import { stripHtml } from './text';

describe('stripHtml', () => {
  it('should remove HTML tags', () => {
    expect(stripHtml('<p>Hello</p>')).toBe('Hello');
  });

  it('should decode HTML entities', () => {
    expect(stripHtml('Hello&nbsp;World')).toBe('Hello World');
  });

  it('should handle undefined input', () => {
    expect(stripHtml(undefined)).toBe('');
  });

  it('should clean up extra whitespace', () => {
    expect(stripHtml('Hello   World')).toBe('Hello World');
  });

  it('should handle complex HTML with entities', () => {
    const input = 'Manufacturer:&nbsp;OTHER MANUFACTURER&nbsp;Regulated product';
    expect(stripHtml(input)).toBe('Manufacturer: OTHER MANUFACTURER Regulated product');
  });
});