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

  it('should respond with a list of cities matching the same name', async () => {
    const queryData = {
      query: `#graphql
      query GetCitiesByName($name: String!) {
        getCitiesByName(name: $name) {
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
        name: 'san antonio',
      },
    };

    const reply = await request(server).post('/graphql').send(queryData);
    const response: CitiesResponse = reply.body.data.getCitiesByName;

    expect(reply.status).toBe(200);
    expect(response.message).toBe('Listing 45 cities');
    expect(response.result).toHaveLength(45);
  });

  it('should respond with an empty list when no matching cities by name', async () => {
    const queryData = {
      query: `#graphql
      query GetCitiesByName($name: String!) {
        getCitiesByName(name: $name) {
          success
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
        name: 'non existent',
      },
    };

    const reply = await request(server).post('/graphql').send(queryData);
    const response: CitiesResponse = reply.body.data.getCitiesByName;

    expect(reply.status).toBe(200);
    expect(response.success).toBe(true);
    expect(response.message).toBe('Listing 0 cities');
    expect(response.result).toHaveLength(0);
  });

  it('should respond with a list of cities of the same country', async () => {
    const queryData = {
      query: `#graphql
      query GetCitiesByCountry($country: String!) {
        getCitiesByCountry(country: $country) {
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
        country: ' 香港 ', // Hong Kong
      },
    };

    const reply = await request(server).post('/graphql').send(queryData);
    const response: CitiesResponse = reply.body.data.getCitiesByCountry;
    const countryInfo = response.result[0].countryInfo;

    expect(reply.status).toBe(200);
    expect(response.message).toBe('Listing 50 cities');
    expect(response.result).toHaveLength(50);
    expect(countryInfo.name).toBe('Hong Kong');
  });

  it('should respond with a list of cities with a specific spoken language', async () => {
    const queryData = {
      query: `#graphql
      query GetCitiesByLanguage($lang: String!) {
        getCitiesByLanguage(lang: $lang) {
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
        lang: 'Uzbek', // O'zbekcha
      },
    };

    const reply = await request(server).post('/graphql').send(queryData);
    const response: CitiesResponse = reply.body.data.getCitiesByLanguage;

    expect(reply.status).toBe(200);
    expect(response.message).toBe('Listing 526 cities');
    expect(response.result).toHaveLength(526);
  });
});
