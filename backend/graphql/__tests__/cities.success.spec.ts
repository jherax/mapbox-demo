import '../../__mocks__/apollo';

import {type Server} from 'http';
import {agent as request} from 'supertest';

import {initServer} from '../../server';
import {type CitiesResponse} from '../resolvers';

let server: Server;

beforeAll(async () => {
  server = await initServer();
});

afterAll(() => {
  server.close();
});

describe('E2E: Testing successful City Queries from "/graphql"', () => {
  it('should respond with the first 30 cities of the 3rd page', async () => {
    const queryData = {
      query: `#graphql
      query GetCitiesLimit($limit: Int!, $page: Int) {
        getCities(limit: $limit, page: $page) {
          message
          result {
            name
            lat
            lng
            countryInfo {
              name
              phone
              currency
            }
          }
        }
      }`,
      variables: {
        limit: 30,
        page: 3,
      },
    };

    const reply = await request(server).post('/graphql').send(queryData);
    const response: CitiesResponse = reply.body.data.getCities;

    expect(reply.status).toBe(200);
    expect(response.message).toBe('Listing 30 cities. Page 3/4725');
    expect(response.result).toHaveLength(30);
  });
});
