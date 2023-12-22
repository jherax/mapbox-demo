import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import config from './config/app.cfg';

const CITIES: ApolloClientNames = 'CITIES';
const RENTALSCAPE: ApolloClientNames = 'RENTALSCAPE';

const datasources: Record<ApolloClientNames, HttpLink> = {
  [RENTALSCAPE]: new HttpLink({
    uri: config.api.urlRentalScape,
    headers: {
      Authorization: `Bearer ${config.api.tokenRentalScape}`,
    },
  }),

  [CITIES]: new HttpLink({
    uri: config.api.urlCities,
  }),
};

/** @see https://www.apollographql.com/docs/react/get-started */
const AppApolloClient = new ApolloClient({
  link: ApolloLink.split(
    op => op.getContext().clientName === RENTALSCAPE,
    datasources[RENTALSCAPE],
    datasources[CITIES],
  ),
  cache: new InMemoryCache(),
});

export default AppApolloClient;
