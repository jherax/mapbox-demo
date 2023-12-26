import {MockedProvider} from '@apollo/client/testing';
import {cleanup, renderHook, waitFor} from '@testing-library/react';

import loadApolloErrors from '../../../utils/loadApolloErrors';
import {
  successRegionDetailsMock,
  successRegionHousesMock,
} from '../__mocks__/apolloRentalscape';
import {useRegionDetails, useRegionHouses} from '../services/hooks';

loadApolloErrors();

describe('Testing custom hooks used in <Rentalscape />', () => {
  afterEach(() => cleanup());

  it('should execute correctly the useRegionDetails() hook', async () => {
    const wrapper = ({children}: React.PropsWithChildren) => (
      <MockedProvider mocks={successRegionDetailsMock} addTypename={false}>
        {children}
      </MockedProvider>
    );

    /**
     * @see https://react-hooks-testing-library.com/reference/api
     */
    const {result} = renderHook(() => useRegionDetails(), {wrapper});
    // do not destructure the result object, the ".current" property is modified by reference

    await waitFor(() => {
      expect(result.current.data).not.toBeUndefined();
    });

    const response = result.current.data?.region;
    expect(response?.items).toHaveLength(1);
  });

  it('should execute correctly the useRegionHouses() hook', async () => {
    const wrapper = ({children}: React.PropsWithChildren) => (
      <MockedProvider mocks={successRegionHousesMock} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const {result} = renderHook(() => useRegionHouses(), {wrapper});
    // do not destructure the result object, the ".current" property is modified by reference

    await waitFor(() => {
      expect(result.current.data).not.toBeUndefined();
    });

    const response = result.current.data?.region;
    expect(response?.properties.items).toHaveLength(3);
  });
});
