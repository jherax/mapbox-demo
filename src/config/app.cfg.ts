// require('dotenv').config()

const config = {
  /**
   * REACT_APP_* variables must be in the .env file
   * @see https://create-react-app.dev/docs/adding-custom-environment-variables/
   */
  api: {
    urlRentalScape: validateKey('REACT_APP_GRAPHQL_RENTALSCAPE'),
    urlCities: validateKey('REACT_APP_GRAPHQL_CITIES'),

    /**
     * Get the token from XHR: "graphql", using Request Header: "Authorization"
     * Inspect the Network: https://placer-ca-str-public-portal.deckard.com/
     */
    tokenRentalScape: validateKey('REACT_APP_AUTH_RENTALSCAPE'),

    /**
     * Get the token from XHR: "streets-v11", using the query-parameter: "access_token"
     * Inspect the Network: https://placer-ca-str-public-portal.deckard.com/
     */
    mapboxAccessToken: validateKey('REACT_APP_MAPBOX_ACCESS_TOKEN'),
  },
};

function validateKey(key: string): string {
  const keyValue = process.env[key];
  if (keyValue == null || keyValue === '') {
    throw TypeError(`Wrong value for ${key} = ${keyValue}`);
  }
  return String(keyValue);
}

export default config;
