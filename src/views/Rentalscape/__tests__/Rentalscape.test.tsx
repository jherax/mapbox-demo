import {MockedProvider} from '@apollo/client/testing';
import {
  cleanup,
  queryByAttribute,
  render,
  screen,
} from '@testing-library/react';

import loadApolloErrors from '../../../utils/loadApolloErrors';
import logger from '../../../utils/logger';
import Rentalscape from '..';
import * as dataMocks from '../__mocks__/apolloRentalscape';

jest.mock('react-map-gl');
jest.spyOn(logger, 'info');

loadApolloErrors();
const getById = queryByAttribute.bind(null, 'id');

/**
 * @see https://jestjs.io/docs/snapshot-testing
 * @see https://testing-library.com/docs/react-testing-library/setup
 */
describe('Testing <Rentalscape />', () => {
  afterEach(() => cleanup());

  it('should render correctly when there are no fetched data', async () => {
    const emptyGqlMocks = [
      dataMocks.emptyRegionDetailsMock,
      dataMocks.emptyRegionHousesMock,
    ].flat();

    const {asFragment} = render(
      <MockedProvider mocks={emptyGqlMocks} addTypename={false}>
        <Rentalscape />
      </MockedProvider>,
    );

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  // ---------------------------------

  it('should render Sidebar and Mapbox sections', async () => {
    const graphqlMocks = [
      dataMocks.successRegionDetailsMock,
      dataMocks.successRegionHousesMock,
    ].flat();

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

  // ---------------------------------

  it('should render the error view', async () => {
    const errorGqlMocks = [
      dataMocks.errorRegionDetailsMock,
      dataMocks.errorRegionHousesMock,
    ].flat();

    const {asFragment} = render(
      <MockedProvider mocks={errorGqlMocks} addTypename={false}>
        <Rentalscape />
      </MockedProvider>,
    );

    const errorMessage = 'Unknown server error when fetching data';
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
