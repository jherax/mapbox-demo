import {gql} from '@apollo/client';

export const CITIES_BY_COUNTRY: ApolloClientQueryOptions = {
  query: gql`
    query GetCitiesByCountry($country: String!) {
      getCitiesByCountry(country: $country) {
        message
        result {
          name
          lat
          lng
          country
        }
      }
    }
  `,
  options: {
    variables: {
      country: null,
    },
    context: {
      clientName: 'CITIES',
    },
    fetchPolicy: 'network-only', // Used for first execution
    nextFetchPolicy: 'cache-first',
  },
} as const;

export type CitiesByCountryResponse = {
  getCitiesByCountry: {
    success: boolean;
    message: string;
    result: City[];
  };
};
