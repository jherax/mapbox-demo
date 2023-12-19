import '../../__mocks__/apollo';

import {type Server} from 'http';
import request from 'supertest';

import {initServer} from '../../server';

let server: Server;

const postGraphQL = (data: Parameters<request.Request['send']>[0]) =>
  Promise.resolve(process.nextTick(Boolean)).then(() =>
    request(server).post('/graphql').send(data),
  );

beforeAll(async () => {
  server = await initServer();
});

afterAll(() => {
  server.close();
});

describe('E2E: Testing failed City Queries from "/graphql"', () => {
  it('should throw BAD_USER_INPUT code when calling getCities', async () => {
    const queryData = {
      query: `#graphql
      query GetCitiesLimit($limit: Int!, $page: Int) {
        getCities(limit: $limit, page: $page) {
          message
        }
      }`,
    };

    const reply = await postGraphQL(queryData);
    const [error] = reply.body.errors;

    expect(reply.status).toBe(400);
    expect(error.extensions.code).toBe('BAD_USER_INPUT');
    expect(error.locations).toBeDefined();
    expect(error.message).toMatch(
      'Variable "$limit" of required type "Int!" was not provided',
    );
  });

  it('should throw BAD_USER_INPUT code when calling getCitiesByName', async () => {
    const queryData = {
      query: `#graphql
      query GetCitiesByName($name: String!) {
        getCitiesByName(name: $name) {
          message
        }
      }`,
    };

    const reply = await postGraphQL(queryData);
    const [error] = reply.body.errors;

    expect(reply.status).toBe(400);
    expect(error.extensions.code).toBe('BAD_USER_INPUT');
    expect(error.locations).toBeDefined();
    expect(error.message).toMatch(
      'Variable "$name" of required type "String!" was not provided',
    );
  });

  it('should throw BAD_USER_INPUT code when calling getCitiesByCountry', async () => {
    const queryData = {
      query: `#graphql
      query GetCitiesByCountry($country: String!) {
        getCitiesByCountry(country: $country) {
          message
        }
      }`,
    };

    const reply = await postGraphQL(queryData);
    const [error] = reply.body.errors;

    expect(reply.status).toBe(400);
    expect(error.extensions.code).toBe('BAD_USER_INPUT');
    expect(error.locations).toBeDefined();
    expect(error.message).toMatch(
      'Variable "$country" of required type "String!" was not provided',
    );
  });

  it('should throw GRAPHQL_VALIDATION_FAILED code when calling getCitiesByLanguage', async () => {
    const queryData = {
      query: `#graphql
      query GetCitiesByLanguage($lang: String!) {
        getCitiesByLanguage(lang: $lang) {
          message
          result
        }
      }`,
      variables: {
        lang: 'Tshivenḓa',
      },
    };

    const reply = await postGraphQL(queryData);
    const [error] = reply.body.errors;

    expect(reply.status).toBe(400);
    expect(error.extensions.code).toBe('GRAPHQL_VALIDATION_FAILED');
    expect(error.locations).toBeDefined();
    expect(error.message).toMatch(
      'Field "result" of type "[City]!" must have a selection of subfields',
    );
  });
});
