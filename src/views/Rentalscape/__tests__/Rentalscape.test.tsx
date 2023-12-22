import {MockedProvider} from '@apollo/client/testing';
import {queryByAttribute, render, screen} from '@testing-library/react';

import loadApolloErrors from '../../../utils/loadApolloErrors';
import logger from '../../../utils/logger';
import Rentalscape from '..';
import regionDetailsMock from '../__mocks__/getRegionDetails.json';
import regionHousesMock from '../__mocks__/getRegionHouses.json';
import {REGION_DETAILS} from '../services/getRegionDetails';
import {REGION_HOUSES} from '../services/getRegionHouses';

jest.mock('react-map-gl');
jest.spyOn(logger, 'info');

loadApolloErrors();
const getById = queryByAttribute.bind(null, 'id');

/**
 * @@delay: ms to prevent React from batching the loading state away.
 * If you only want to test the loading state, set value to Infinity.
 * @see https://www.apollographql.com/docs/react/development-testing/testing
 */
const graphqlMocks = [
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

/**
 * @see https://jestjs.io/docs/snapshot-testing
 * @see https://testing-library.com/docs/react-testing-library/setup
 */
describe('Testing <Rentalscape />', () => {
  it('should render correctly when there are no fetched data', async () => {
    const emptyGqlMocks = [...graphqlMocks];
    emptyGqlMocks[0].result = {
      data: {region: {items: []}},
    };
    emptyGqlMocks[1].result = {
      data: {region: null as any},
    };

    const {asFragment} = render(
      <MockedProvider mocks={emptyGqlMocks} addTypename={false}>
        <Rentalscape />
      </MockedProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Sidebar and Mapbox sections', async () => {
    const {asFragment, container} = render(
      <MockedProvider mocks={graphqlMocks} addTypename={false}>
        <Rentalscape />
      </MockedProvider>,
    );

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('PUBLIC PORTAL')).toBeInTheDocument();
    expect(getById(container, 'Sidebar')).toBeInTheDocument();
    expect(getById(container, 'Mapbox')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
