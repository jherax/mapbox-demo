import {type ChangeEventHandler, useEffect, useId, useState} from 'react';

import buildKey from '../../utils/buildKey';

export type CountriesProps = Readonly<{
  onChangeCountry: (country: string) => void;
}>;

export default function Countries(props: CountriesProps) {
  const firstItem = {value: '', text: 'select...'};
  const [countries, setCountries] = useState([firstItem]);
  const [country, setCountry] = useState(firstItem.value);
  const selectId = useId();

  useEffect(() => {
    setCountries([
      firstItem,
      {value: 'Colombia', text: 'Colombia'},
      {value: 'United States', text: 'United States'},
    ]);
  }, []); // empty array: run during mount only

  const handleChange: ChangeEventHandler<HTMLSelectElement> = e => {
    const selected = e.target.value;
    setCountry(selected);
    props.onChangeCountry(selected);
  };

  return (
    <section className='countries_container'>
      <label htmlFor={selectId}>Search by country:</label>
      <select
        id={selectId}
        name='countries'
        className='countries_dropdown'
        onChange={handleChange}
        value={country}
      >
        {countries.map((country, i) => {
          const key = `country-${buildKey()}-${i}`;
          return (
            <option key={key} value={country.value}>
              {country.text}
            </option>
          );
        })}
      </select>
    </section>
  );
}
