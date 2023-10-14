import {MockedProvider} from '@apollo/client/testing';
import {render, screen} from '@testing-library/react';

import logger from '../../utils/logger';
import Rentalscape from '../Rentalscape';
import {REGION_CONFIG} from '../Rentalscape/services/getRegionConfig';

jest.spyOn(logger, 'info').mockImplementation(jest.fn());

/**
 * @see https://www.apollographql.com/docs/react/development-testing/testing
 */

const graphqlMocks = [
  {
    request: {
      query: REGION_CONFIG.query,
      variables: REGION_CONFIG.variables,
    },
    result: {
      data: {region: {items: []}},
    },
  },
];

describe('Testing <Rentalscape />', () => {
  test('renders 2 child sections', async () => {
    render(
      <MockedProvider mocks={graphqlMocks} addTypename={false}>
        <Rentalscape />
      </MockedProvider>,
    );

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Mapbox')).toBeInTheDocument();
  });
});
