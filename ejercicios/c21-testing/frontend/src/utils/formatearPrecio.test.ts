import { describe, it, expect } from 'vitest';
import { formatearPrecio } from './formatearPrecio';

describe('formatearPrecio', () => {
  it('4500 → "$ 4.500"', () => {
    expect(formatearPrecio(4500)).toBe('$ 4.500');
  });

  it('transforma 1234567 en "$ 1.234.567"', () => {
    expect(formatearPrecio(1234567)).toBe('$ 1.234.567');
  });

  it('transforma 0 en "$ 0"', () => {
    expect(formatearPrecio(0)).toBe('$ 0');
  });
});