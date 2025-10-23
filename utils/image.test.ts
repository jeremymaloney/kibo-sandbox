import { getAbsoluteImageUrl } from './image';

describe('getAbsoluteImageUrl', () => {
  it('should return placeholder when url is undefined', () => {
    expect(getAbsoluteImageUrl(undefined)).toBe('/placeholder-image.jpg');
  });

  it('should return placeholder when url is empty string', () => {
    expect(getAbsoluteImageUrl('')).toBe('/placeholder-image.jpg');
  });

  it('should convert protocol-relative URL to HTTPS', () => {
    const input = '//cdn.sb.usc1.gcp.kibocommerce.com/1000346-1000737/cms/1000737/files/image.jpg';
    const expected = 'https://cdn.sb.usc1.gcp.kibocommerce.com/1000346-1000737/cms/1000737/files/image.jpg';
    expect(getAbsoluteImageUrl(input)).toBe(expected);
  });

  it('should return absolute HTTPS URL as-is', () => {
    const input = 'https://example.com/image.jpg';
    expect(getAbsoluteImageUrl(input)).toBe(input);
  });

  it('should return absolute HTTP URL as-is', () => {
    const input = 'http://example.com/image.jpg';
    expect(getAbsoluteImageUrl(input)).toBe(input);
  });

  it('should return relative URL as-is', () => {
    const input = '/images/product.jpg';
    expect(getAbsoluteImageUrl(input)).toBe(input);
  });
});