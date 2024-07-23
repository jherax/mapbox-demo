import repeatedCitiesValues from '../../__mocks__/repeated-cities.json';
import repeatedCities from '../repeatedCities';

describe('Testing repeatedCities()', () => {
  it('should get the list of repeated cities (with accent)', async () => {
    const dupCities = await repeatedCities();
    expect(dupCities).toEqual(repeatedCitiesValues);
    expect(Object.keys(dupCities)).toHaveLength(8781);
  });
});
