import setHrefValue from '../setHrefValue';

describe('Testing setHrefValue()', () => {
  it('should return a tel link when type is "PHONE" and value is provided', () => {
    const options = {type: 'PHONE', value: ' 530-448-8003 '};
    const result = setHrefValue(options);
    expect(result).toBe('tel:530-448-8003');
  });

  it('should return a mailto link when type is "EMAIL" and value is provided', () => {
    const options = {type: 'EMAIL', value: ' test@example.com '};
    const result = setHrefValue(options);
    expect(result).toBe('mailto:test@example.com');
  });

  it('should return the original value when type is not "PHONE" or "EMAIL"', () => {
    const options = {type: 'OTHER', value: 'example'};
    const result = setHrefValue(options);
    expect(result).toBe('example');
  });

  it('should return the prefix when type is provided but value is not', () => {
    const options = {type: 'PHONE'} as any;
    const result = setHrefValue(options);
    expect(result).toBe('tel:');
  });

  it('should return the original value when value is provided but type missing', () => {
    const options = {value: 'example'} as any;
    const result = setHrefValue(options);
    expect(result).toBe('example');
  });
});
