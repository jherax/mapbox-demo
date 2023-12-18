const {ApolloServer} = require('@apollo/server');
const {addMocksToSchema} = require('@graphql-tools/mock');
const {makeExecutableSchema} = require('@graphql-tools/schema');

/**
 * Jest-Timers
 * @see https://jestjs.io/docs/timer-mocks
 *
 * You can call jest.useFakeTimers() or jest.useRealTimers() from anywhere
 * (top level, inside an it block, etc.), but it is a global operation and
 * will affect other tests within the same file.
 *
 * Additionally, you need to call jest.useFakeTimers() to reset internal
 * counters before each test. By default jest uses "modern" timers, then
 * if you want to inspect setTimeout or setInterval you will need to call
 * spyOn() upon those methods. If you use "legacy", that won't be required.
 *
 * @example
 *
 * beforeEach(() => jest.useFakeTimers('legacy'|'modern'))
 * afterEach(() => jest.useRealTimers())
 */

// ---------------------------------
// Jest mock is hoisted before any module import

jest.mock('../server/config', () => {
  return {
    app: {
      host: 'localhost',
      port: 8888,
    },
  };
});

jest.mock('../utils/logger', function () {
  const originalModule = jest.requireActual('../utils/logger');
  // this env var is set in VS Code launch file, for debugging
  if (process.env.SHOW_LOGGER) {
    return originalModule;
  }
  return {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  };
});

/** @see https://www.apollographql.com/docs/apollo-server/testing/mocking/ */
jest.mock('../server/apollo', () => {
  const typeDefs = `#graphql
  type Cities {
    name: String!
    lat: String!
    lng: String!
    country: String!
    admin1: String!
    admin2: String
  }

  type Query {
    getCitiesByName(name: String!): [Cities]!
  }
  `;

  const resolvers = {
    Query: {
      getCitiesByName: () => [
        {
          name: 'Boston',
          lat: '42.35843',
          lng: '-71.05977',
          country: 'US',
          admin1: 'MA', // Massachusetts
          admin2: '025',
        },
      ],
    },
  };

  const apolloServer = new ApolloServer({
    // addMocksToSchema accepts a schema instance and provides
    // mocked data for each field in the schema
    schema: addMocksToSchema({
      schema: makeExecutableSchema({typeDefs, resolvers}),
    }),
  });

  return {
    __esModule: true,
    default: jest.fn(async () => {
      await apolloServer.start();
      return apolloServer;
    }),
  };
});
