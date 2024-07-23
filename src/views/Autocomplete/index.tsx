import {useEffect, useRef, useState} from 'react';

import Countries from '../../components/Countries';
import buildKey from '../../utils/buildKey';
import ResolveView from '../ResolveView';
import {useLazyCitiesByCountry} from './services/hooks';
import {
  MainWrapper,
  ResultsContainer,
  ResultsItem,
  TagsContainer,
  TagsItem,
} from './styled';

const ucase = (text: string) => text.toUpperCase();
const removeSpace = (text: string) => text.toLowerCase().replaceAll(' ', '-');
const restoreSpace = (text: string) => text.replaceAll('-', ' ');
const ALL_CITIES: Record<string, CityResults[]> = Object.create(null);

type CityResults = City & {
  hidden?: boolean;
};

export type AutocompleteProps = Readonly<{
  maxWidth: string;
}>;

export default function Autocomplete(props: AutocompleteProps) {
  const [disabledInput, setDisabledInput] = useState(true);
  const {getCities, error, data} = useLazyCitiesByCountry();

  const onChangeCountry = (country: string) => {
    setDisabledInput(!country);
    cleanInputText(inputRef);
    setShowResults(false);
    if (country) {
      getCities({variables: {country}});
    }
  };

  useEffect(() => {
    setDisabledInput(!data);
    const cities = data?.getCitiesByCountry?.result;
    if (cities != null) {
      const {country} = cities[0];
      if (ALL_CITIES[country] == null) {
        ALL_CITIES[country] = getUniqueCities(cities);
      }
      ALL_CITIES['current'] = ALL_CITIES[country];
    }
  }, [data]);

  const [tags, setTags] = useState<string[]>([]);
  const [results, setResults] = useState<CityResults[]>([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = e => {
    const currentText = (e.target as HTMLInputElement).value;
    if (e.code === 'Escape') {
      cleanInputText(inputRef);
      setShowResults(false);
    } else if (e.code === 'Enter') {
      onClickSuggestion(currentText);
    } else if (currentText) {
      const prefix = ucase(currentText);
      // search criteria: match cities starting with ...
      const matchedCities = ALL_CITIES['current'].filter(city => {
        return !city.hidden && ucase(city.name).startsWith(prefix);
      });
      setResults(matchedCities);
      if (matchedCities.length && !showResults) {
        setShowResults(true);
      }
    }
  };

  const onClickSuggestion = (suggestion: string) => {
    const tag = removeSpace(suggestion);
    if (tag && tags.indexOf(tag) === -1) {
      setTags([...tags, tag]);
    }
    const selectedCity = ALL_CITIES['current'].find(
      city => ucase(city.name) === ucase(suggestion),
    );
    if (selectedCity != null) {
      selectedCity.hidden = true;
    }
    cleanInputText(inputRef);
    setShowResults(false);
  };

  const onClickTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
    const cityTag = restoreSpace(ucase(tag));
    const selectedCity = ALL_CITIES['current'].find(
      city => ucase(city.name) === cityTag,
    );
    if (selectedCity != null) {
      selectedCity.hidden = false;
    }
    setShowResults(false);
  };

  // logger.info({loading, data, showResults, disabledInput})
  return (
    <MainWrapper $maxWidth={props.maxWidth}>
      <fieldset>
        <legend>Cities around the world</legend>
        <Countries onChangeCountry={onChangeCountry}></Countries>
        <ResolveView error={error}>
          <TagsContainer className='autocomplete_container'>
            {tags.map((tag, i) => {
              const key = `tag-${buildKey()}-${i}`;
              return (
                <TagsItem
                  key={key}
                  value={tag}
                  onClick={onClickTag}
                  className='autocomplete_tags_item'
                ></TagsItem>
              );
            })}
            <input
              type='text'
              name='cities_searchbox'
              className='autocomplete_input'
              placeholder='Cities...'
              ref={inputRef}
              disabled={disabledInput}
              onKeyUp={handleKeyUp}
            />
          </TagsContainer>
          <ResultsContainer
            $show={+showResults}
            className='autocomplete_results'
          >
            {results.map((result, i) => {
              const key = `result-${buildKey()}-${i}`;
              return (
                <ResultsItem
                  key={key}
                  value={result.name}
                  onClick={onClickSuggestion}
                  className='autocomplete_results_item'
                ></ResultsItem>
              );
            })}
          </ResultsContainer>
        </ResolveView>
      </fieldset>
    </MainWrapper>
  );
}

// ---------------------------------

function getUniqueCities(cities: CityResults[]): CityResults[] {
  const uniqueCities: CityResults[] = [];
  const total = cities.length;
  for (let i = 0; i < total; i += 1) {
    const city = cities[i];
    if (!uniqueCities.some(c => c.name === city.name)) {
      // this fixes the error: object is not extensible
      uniqueCities.push({...city});
    }
  }
  return uniqueCities;
}

function cleanInputText(ref: React.RefObject<HTMLInputElement>) {
  if (ref.current != null) {
    ref.current.value = '';
  }
}
