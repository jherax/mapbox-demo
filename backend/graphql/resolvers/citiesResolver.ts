import cities from 'cities.json';
import {continents, countries} from 'countries-list';

export type CitiesResponse = {
  success: boolean;
  message: string;
  result?: City | City[];
};

const allCities = cities as City[];

const citiesResolver = {
  Query: {
    getCities: async (
      parent,
      params,
      contextShared,
    ): Promise<CitiesResponse> => {
      const page = +(params.page || 1);
      const limit = +(params.limit || 10);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const totalPages = Math.floor(allCities.length / limit);
      return new Promise<CitiesResponse>(resolve => {
        const result = allCities.slice(startIndex, endIndex);
        /** @see https://github.com/annexare/Countries */
        result.forEach(city => {
          city.countryInfo = countries[city.country];
          const continent = city.countryInfo.continent;
          city.countryInfo.continent = continents[continent] || continent;
        });
        const total = result?.length || 0;
        const message = `Listing ${total} cities. Page ${page}/${totalPages}`;
        const response = createSuccessResponse(message);
        response.result = result ?? [];
        resolve(response);
      });
    },
  },
};

function createSuccessResponse(message: string): CitiesResponse {
  return {success: true, message, result: null};
}

export default citiesResolver;
