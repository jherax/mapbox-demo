import type {BaseQueryOptions, QueryOptions} from '@apollo/client';
import type {BaseContext} from '@apollo/server';

declare global {
  interface ApolloServerContext extends BaseContext {
    token?: string;
  }

  type ApolloClientNames = 'RENTALSCAPE' | 'CITIES';

  type ApolloClientQueryOptions = {
    query: QueryOptions['query'];
    options: BaseQueryOptions & {context: {clientName: ApolloClientNames}};
  };
}

export {};
