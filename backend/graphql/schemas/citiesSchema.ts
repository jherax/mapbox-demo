const citiesSchema = `#graphql
  type City {
    name: String!
    lat: String!
    lng: String!
    country: String!
    admin1: String!
    admin2: String
    countryInfo: CountryInfo
  }

  type CountryInfo {
    name: String!
    native: String!
    phone: [Int]!
    continent: String!
    capital: String!
    currency: [String]!
    languages: [String]!
  }

  type CitiesResponse {
    success: Boolean!
    message: String!
    result: [City]!
  }

  type Query {
    getCities(limit: Int!, page: Int): CitiesResponse
    getCitiesByName(name: String!): CitiesResponse
    getCitiesByCountry(country: String!): CitiesResponse
    getCitiesByLanguage(lang: String!): CitiesResponse
  }
`;

export default citiesSchema;
