import {MockedProvider} from '@apollo/client/testing';
import {
  cleanup,
  fireEvent,
  queryByAttribute,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import loadApolloErrors from '../../../utils/loadApolloErrors';
import trim from '../../../utils/trim';
import Autocomplete from '..';
import {
  emptyCitiesByCountryMock,
  errorCitiesByCountryMock,
  successCitiesByCountryMock,
  variablesMock,
} from '../__mocks__/apolloAutocomplete';

loadApolloErrors();
const getByName = queryByAttribute.bind(null, 'name');
const getBySelector = (parent: HTMLElement, selector: string) =>
  // eslint-disable-next-line testing-library/no-node-access
  parent.querySelector(selector);

/**
 * @see https://jestjs.io/docs/snapshot-testing
 * @see https://testing-library.com/docs/react-testing-library/setup
 */
describe('Testing <Autocomplete />', () => {
  afterEach(() => cleanup());

  it('should get cities by country, trigger the autocomplete and select the first suggestion', async () => {
    const {asFragment, container} = render(
      <MockedProvider mocks={successCitiesByCountryMock} addTypename={false}>
        <Autocomplete maxWidth='500px' />
      </MockedProvider>,
    );

    // Initial state.
    const dropdown = getByName(container, 'countries') as HTMLSelectElement;
    const input = getByName(container, 'cities_searchbox') as HTMLInputElement;
    const results = getBySelector(container, '.autocomplete_results');
    expect(results?.childNodes).toHaveLength(0);
    expect(input).toBeDisabled();

    fireEvent.change(dropdown, {target: {value: variablesMock.country}});
    // Wait to get cities by selected country.
    expect(dropdown.value).toBe('Colombia');
    await waitFor(async () => {
      expect(input).not.toBeDisabled();
    });

    // Set the value of the searchbox input.
    fireEvent.change(input, {target: {value: 'a'}});
    fireEvent.keyUp(input, {code: 'KeyA', key: 'a', keyCode: 65});

    // Wait for search results for cities starting with "A".
    // Each suggestion item has the "listitem" role.
    const suggestions = await screen.findAllByRole('listitem');
    expect(suggestions).toHaveLength(2);
    expect(results?.childNodes).toHaveLength(2);

    // Adds the first suggested City to the Tags list.
    const firstSuggestion = suggestions[0];
    fireEvent.click(firstSuggestion);
    await waitFor(() => {
      const tag = getBySelector(container, '.autocomplete_tags_item');
      expect(tag).toBeInTheDocument();
    });

    const firstTag = getBySelector(container, '.autocomplete_tags_item');
    const selectedText = trim(firstSuggestion.textContent).toLowerCase();
    expect(firstTag?.textContent).toMatch(selectedText);
    expect(asFragment()).toMatchSnapshot();
  });

  // ---------------------------------

  it('should add a tag when pressing ENTER', async () => {
    const {asFragment, container} = render(
      <MockedProvider mocks={successCitiesByCountryMock} addTypename={false}>
        <Autocomplete maxWidth='500px' />
      </MockedProvider>,
    );

    // Initial state.
    const dropdown = getByName(container, 'countries') as HTMLSelectElement;
    const input = getByName(container, 'cities_searchbox') as HTMLInputElement;
    expect(input).toBeDisabled();

    // Selects a country to enable the searchbox input
    fireEvent.change(dropdown, {target: {value: variablesMock.country}});
    await waitFor(async () => {
      expect(input).not.toBeDisabled();
    });

    // Set the value in the searchbox input and press ENTER.
    fireEvent.change(input, {target: {value: 'Svalbard'}});
    fireEvent.keyUp(input, {code: 'Enter', key: 'Enter', keyCode: 13});
    // Wait for the tag to be added
    await waitFor(() => {
      const tag = getBySelector(container, '.autocomplete_tags_item');
      expect(tag).toBeInTheDocument();
    });

    const tag = getBySelector(container, '.autocomplete_tags_item');
    expect(tag?.textContent).toMatch('svalbard');
    expect(asFragment()).toMatchSnapshot();
  });

  // ---------------------------------

  it('should render correctly when there are no fetched data', async () => {
    const {asFragment, container} = render(
      <MockedProvider mocks={emptyCitiesByCountryMock} addTypename={false}>
        <Autocomplete maxWidth='500px' />
      </MockedProvider>,
    );

    expect(getByName(container, 'cities_searchbox')).toBeDisabled();
    expect(asFragment()).toMatchSnapshot();
  });

  // ---------------------------------

  it('should render the error view', async () => {
    const {asFragment, container} = render(
      <MockedProvider mocks={errorCitiesByCountryMock} addTypename={false}>
        <Autocomplete maxWidth='500px' />
      </MockedProvider>,
    );

    // triggers the getCities() lazy-query
    const dropdown = getByName(container, 'countries') as HTMLSelectElement;
    fireEvent.change(dropdown, {target: {value: variablesMock.country}});

    const errorMessage = 'Unknown server error when fetching data';
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
