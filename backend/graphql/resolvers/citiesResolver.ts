import cities from 'cities.json';
import {
  continents,
  countries,
  type ICountry,
  languages,
  type TLanguageCode,
} from 'countries-list';

export type CitiesResponse = {
  success: boolean;
  message: string;
  result?: City | City[];
};

const allCities = cities as City[];
const mapLanguage = (key: TLanguageCode) => languages[key].name;

const citiesResolver = {
  Query: {
    getCities: async (
      parent,
      params: {limit: number; page: number},
      contextShared: ApolloServerContext,
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
          city.countryInfo = {...countries[city.country]};
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

    getCitiesByName: async (
      parent,
      {name}: {name: string},
      contextShared: ApolloServerContext,
    ): Promise<CitiesResponse> => {
      /** @see https://cutt.ly/mozilla-intl-collator */
      const comparator = new Intl.Collator(undefined, {
        ignorePunctuation: true,
        sensitivity: 'base',
        usage: 'search',
      });
      name = name.trim();
      return new Promise<CitiesResponse>(resolve => {
        const result: City[] = [];
        const max = allCities.length;
        /** @see https://github.com/annexare/Countries */
        for (let i = 0; i < max; i += 1) {
          const city = {...allCities[i]};
          if (!comparator.compare(city.name, name)) {
            const countryInfo: CountryInfo = {...countries[city.country]};
            const continent = countryInfo.continent;
            countryInfo.continent = continents[continent] || continent;
            countryInfo.languages = countryInfo.languages.map(mapLanguage);
            city.countryInfo = countryInfo;
            result.push(city);
          }
        }
        const total = result?.length || 0;
        const message = `Listing ${total} cities`;
        const response = createSuccessResponse(message);
        response.result = result ?? [];
        resolve(response);
      });
    },

    getCitiesByCountry: async (
      parent,
      {country}: {country: string},
      contextShared: ApolloServerContext,
    ): Promise<CitiesResponse> => {
      /** @see https://cutt.ly/mozilla-intl-collator! */
      const comparator = new Intl.Collator(undefined, {
        ignorePunctuation: true,
        sensitivity: 'accent',
        usage: 'search',
      });
      country = country.trim();
      return new Promise<CitiesResponse>(resolve => {
        const result: City[] = [];
        const countryKey: string = Object.keys(countries).find(
          key =>
            !comparator.compare(countries[key].name, country) ||
            !comparator.compare(countries[key].native, country),
        );
        /** @see https://github.com/annexare/Countries */
        const countryInfo: CountryInfo = {...countries[countryKey]};
        const continent = countryInfo.continent;
        const countryLang = countryInfo.languages;
        countryInfo.continent = continents[continent];
        countryInfo.languages = countryLang.map(mapLanguage);
        const max = allCities.length;
        for (let i = 0; i < max; i += 1) {
          const city = {...allCities[i]};
          if (city.country === countryKey) {
            city.countryInfo = countryInfo;
            result.push(city);
          }
        }
        const total = result?.length || 0;
        const message = `Listing ${total} cities`;
        const response = createSuccessResponse(message);
        response.result = result ?? [];
        resolve(response);
      });
    },

    getCitiesByLanguage: async (
      parent,
      {lang}: {lang: string},
      contextShared: ApolloServerContext,
    ): Promise<CitiesResponse> => {
      /** @see https://cutt.ly/mozilla-intl-collator! */
      const comparator = new Intl.Collator(undefined, {
        ignorePunctuation: false,
        sensitivity: 'accent',
        usage: 'search',
      });
      lang = lang.trim();
      return new Promise<CitiesResponse>(resolve => {
        const result: City[] = [];
        const max = allCities.length;
        const langKey = Object.keys(languages).find(
          key =>
            !comparator.compare(languages[key].name, lang) ||
            !comparator.compare(languages[key].native, lang),
        ) as TLanguageCode;
        /** @see https://github.com/annexare/Countries */
        for (let i = 0; i < max; i += 1) {
          const city = {...allCities[i]};
          const countryInfo: ICountry = countries[city.country];
          if (countryInfo.languages.includes(langKey)) {
            city.countryInfo = {...countryInfo};
            const continent = countryInfo.continent;
            city.countryInfo.continent = continents[continent] || continent;
            city.countryInfo.languages = countryInfo.languages.map(mapLanguage);
            result.push(city);
          }
        }
        const total = result?.length || 0;
        const message = `Listing ${total} cities`;
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
