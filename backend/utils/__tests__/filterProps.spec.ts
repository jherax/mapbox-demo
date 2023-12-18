import citiesMock from '../../__mocks__/cities.json';
import filterProps from '../filterProps';

describe('Testing filterProps()', () => {
  // Should return an object with only the specified properties from the input object
  it('should return an object with only the specified properties', () => {
    const input: Partial<City> = {
      name: 'Andorra la Vella',
      lat: '42.50779',
      lng: '1.52109',
      country: 'Andorra',
      admin1: '07',
      admin2: '',
    };
    const keys = ['name', 'country'];
    const expected = {
      name: 'Andorra la Vella',
      country: 'Andorra',
    };

    const result = filterProps<typeof input>(keys)(input);
    expect(result).toEqual(expected);
  });

  it('should be used to map an array of objects with only the specified properties', () => {
    const cities = citiesMock as City[];
    const keys = ['name', 'country'];
    const expected = [
      {
        name: 'Sant Julià de Lòria',
        country: 'Andorra',
      },
      {
        name: 'Pas de la Casa',
        country: 'Andorra',
      },
      {
        name: 'Ordino',
        country: 'Andorra',
      },
      {
        name: 'Les Escaldes',
        country: 'Andorra',
      },
      {
        name: 'la Massana',
        country: 'Andorra',
      },
      {
        name: 'Encamp',
        country: 'Andorra',
      },
      {
        name: 'Canillo',
        country: 'Andorra',
      },
      {
        name: 'Arinsal',
        country: 'Andorra',
      },
      {
        name: 'Andorra la Vella',
        country: 'Andorra',
      },
    ];
    const result = cities.map(filterProps(keys));
    expect(result).toEqual(expected);
  });

  it('should throw an error when the input object is null', () => {
    const keys = ['name', 'country'];
    const input = null;

    expect(() => filterProps(keys)(input)).toThrow(
      /Cannot read properties of null/,
    );
  });

  it('should return an empty object when the input object is not an object', () => {
    const input = 'not an object';
    const keys = ['name', 'country', 'admin1'];
    const expected = {};

    const result = filterProps(keys)(input);
    expect(result).toEqual(expected);
  });
});
