import {MockedProvider} from '@apollo/client/testing';
import {cleanup, renderHook, waitFor} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

import loadApolloErrors from '../../../utils/loadApolloErrors';
import {
  successCitiesByCountryMock,
  variablesMock,
} from '../__mocks__/apolloAutocomplete';
import {useLazyCitiesByCountry} from '../services/hooks';

loadApolloErrors();

describe('Testing custom hooks used in <Autocomplete />', () => {
  afterEach(() => cleanup());

  it('should execute correctly the useLazyCitiesByCountry() hook', async () => {
    const wrapper = ({children}: React.PropsWithChildren) => (
      <MockedProvider mocks={successCitiesByCountryMock} addTypename={false}>
        {children}
      </MockedProvider>
    );

    /**
     * @see https://react-hooks-testing-library.com/reference/api
     */
    const {result} = renderHook(() => useLazyCitiesByCountry(), {wrapper});
    // do not destructure the result object, the ".current" property is modified by reference

    await act(async () => {
      result.current.getCities({
        variables: {country: variablesMock.country},
      });
    });

    await waitFor(() => {
      expect(result.current.data).not.toBeUndefined();
    });

    const response = result.current.data?.getCitiesByCountry;
    expect(response?.message).toBeDefined();
    expect(response?.result).toHaveLength(9);
  });
});
