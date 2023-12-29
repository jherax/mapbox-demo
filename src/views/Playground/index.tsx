import {ApolloSandbox} from '@apollo/sandbox/react';
import {type EmbeddableSandboxOptions} from '@apollo/sandbox/src/EmbeddedSandbox';
import {useParams} from 'react-router-dom';

import config from '../../config/app.cfg';

type UrlParams = {
  gqlConn: 'cities' | 'rentalscape';
};

export function Playground() {
  const params = useParams<UrlParams>();
  const endpoint =
    params.gqlConn === 'rentalscape'
      ? config.api.urlRentalScape
      : config.api.urlCities;

  const initialState: EmbeddableSandboxOptions['initialState'] = {
    sharedHeaders: {
      authorization: `Bearer ${config.api.tokenRentalScape}`,
    },
  };

  /**
   * @see https://www.apollographql.com/docs/graphos/explorer/embed-explorer
   */
  return (
    <ApolloSandbox
      runTelemetry={false}
      className='apollo_playground'
      initialEndpoint={endpoint}
      initialState={initialState}
    />
  );
}
