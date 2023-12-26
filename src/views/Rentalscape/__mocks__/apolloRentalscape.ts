import {ApolloError} from '@apollo/client';
import {MockedResponse} from '@apollo/client/testing';
import {GraphQLError} from 'graphql';

import {REGION_DETAILS} from '../services/getRegionDetails';
import {REGION_HOUSES} from '../services/getRegionHouses';
import regionDetailsMock from './getRegionDetails.json';
import regionHousesMock from './getRegionHouses.json';

/**
 * @@delay: ms to prevent React from batching the loading state away.
 * If you only want to test the loading state, set value to Infinity.
 * @see https://www.apollographql.com/docs/react/development-testing/testing
 */
export const successRegionDetailsMock: MockedResponse[] = [
  {
    delay: 30,
    request: {
      query: REGION_DETAILS.query,
      ...REGION_DETAILS.options,
    },
    result: {
      data: regionDetailsMock,
    },
  },
];

export const emptyRegionDetailsMock: MockedResponse[] = [
  {
    delay: 30,
    request: {
      query: REGION_DETAILS.query,
      ...REGION_DETAILS.options,
    },
    result: {
      data: {region: {items: []}},
    },
  },
];

export const errorRegionDetailsMock: MockedResponse[] = [
  {
    request: {
      query: REGION_DETAILS.query,
      ...REGION_DETAILS.options,
    },
    error: new ApolloError({
      graphQLErrors: [
        new GraphQLError('Unknown server error when fetching data'),
      ],
    }),
  },
];

// ---------------------------------

export const successRegionHousesMock: MockedResponse[] = [
  {
    delay: 30,
    request: {
      query: REGION_HOUSES.query,
      ...REGION_HOUSES.options,
    },
    result: {
      data: regionHousesMock,
    },
  },
];

export const emptyRegionHousesMock: MockedResponse[] = [
  {
    delay: 30,
    request: {
      query: REGION_HOUSES.query,
      ...REGION_HOUSES.options,
    },
    result: {
      data: {region: null},
    },
  },
];

export const errorRegionHousesMock: MockedResponse[] = [
  {
    request: {
      query: REGION_HOUSES.query,
      ...REGION_HOUSES.options,
    },
    error: new ApolloError({
      graphQLErrors: [
        new GraphQLError('Unknown server error when fetching data'),
      ],
    }),
  },
];
