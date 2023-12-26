import {ApolloError} from '@apollo/client';
import {MockedResponse} from '@apollo/client/testing';
import {GraphQLError} from 'graphql';

import {CITIES_BY_COUNTRY} from '../services/getCitiesByCountry';
import citiesMock from './cities.json';

export const variablesMock = {country: 'Colombia'};

/**
 * @@delay: ms to prevent React from batching the loading state away.
 * If you only want to test the loading state, set value to Infinity.
 * @see https://www.apollographql.com/docs/react/development-testing/testing
 */
export const successCitiesByCountryMock: MockedResponse[] = [
  {
    request: {
      query: CITIES_BY_COUNTRY.query,
      // ...CITIES_BY_COUNTRY.options,
      variables: variablesMock,
    },
    result: {
      data: {
        getCitiesByCountry: {
          message: 'Mocked results',
          result: citiesMock,
        },
      },
    },
  },
];

export const emptyCitiesByCountryMock: MockedResponse[] = [
  {
    request: {
      query: CITIES_BY_COUNTRY.query,
      variables: variablesMock,
    },
    result: {
      data: {
        getCitiesByCountry: {
          message: 'Mocked results',
          result: [],
        },
      },
    },
  },
];

export const errorCitiesByCountryMock: MockedResponse[] = [
  {
    request: {
      query: CITIES_BY_COUNTRY.query,
      variables: variablesMock,
    },
    error: new ApolloError({
      graphQLErrors: [
        new GraphQLError('Unknown server error when fetching data'),
      ],
    }),
  },
];
