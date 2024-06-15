import {ApolloServer, type BaseContext} from '@apollo/server';
import {ApolloServerErrorCode} from '@apollo/server/errors';

import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/schemas';

export interface ServerContext extends BaseContext {
  token?: string;
}

/**
 * @see https://www.apollographql.com/docs/apollo-server/data/errors/#setting-http-status-code-and-headers
 */
export const setHttpPlugin = {
  async requestDidStart() {
    return {
      async willSendResponse({response}) {
        // response.http.headers.set('custom-header', 'some-value')
        const {BAD_USER_INPUT, INTERNAL_SERVER_ERROR} = ApolloServerErrorCode;
        const {kind, singleResult} = response.body;
        const [error] = singleResult.errors ?? [];

        if (kind === 'single' && error) {
          const errorCode = error.extensions?.code;

          if (errorCode === BAD_USER_INPUT) {
            response.http.status = 400;
          } else if (errorCode === 'UNAUTHENTICATED') {
            response.http.status = 401;
          } else if (errorCode === INTERNAL_SERVER_ERROR) {
            response.http.status = 500;
          }
        }
      },
    };
  },
};

/**
 * @see https://www.apollographql.com/docs/apollo-server/getting-started/
 */
export default async function initApollo() {
  const apolloServer = new ApolloServer<ServerContext>({
    typeDefs,
    resolvers,
    introspection: true,
    includeStacktraceInErrorResponses: true,
    plugins: [setHttpPlugin],
    /** @see https://www.apollographql.com/docs/apollo-server/data/errors/#for-client-responses */
    // formatError: (formattedError, error) => { /* use logger and return formattedError */ }
  });

  await apolloServer.start();
  return apolloServer;
}
