import buildKey from '../buildKey';

describe('Testing buildKey()', () => {
  it('should return a unique string for each call', () => {
    const result1 = buildKey();
    const result2 = buildKey();
    expect(result1).not.toBe(result2);
  });

  it('should return a string with only alphanumeric characters', () => {
    const result = buildKey();
    const alphanumericRegex = /^[a-z0-9]+$/i;
    expect(alphanumericRegex.test(result)).toBe(true);
  });
});
