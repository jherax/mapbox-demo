import {useLazyQuery} from '@apollo/client';

import {CITIES_BY_COUNTRY, CitiesByCountryResponse} from './getCitiesByCountry';

export function useLazyCitiesByCountry() {
  const [getCities, {loading, error, data}] =
    useLazyQuery<CitiesByCountryResponse>(
      CITIES_BY_COUNTRY.query,
      CITIES_BY_COUNTRY.options,
    );
  return {getCities, loading, error, data};
}
