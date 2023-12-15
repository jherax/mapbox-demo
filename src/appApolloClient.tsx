import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';

import config from './config/app.cfg';

const createApolloClient = (url: string, authToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: url,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

const AppApolloClient = createApolloClient(
  config.api.baseUrl,
  config.api.authorizationToken,
);

export default AppApolloClient;
