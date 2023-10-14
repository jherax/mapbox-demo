const config = {
  /**
   * REACT_APP_* variables must be in the .env file
   * @see https://create-react-app.dev/docs/adding-custom-environment-variables/
   */
  api: {
    baseUrl: validateKey(
      'REACT_APP_API_BASE_URL',
      process.env.REACT_APP_API_BASE_URL,
    ),

    /**
     * Get the token from XHR: "graphql", using the value of Header: "Authorization"
     * Inspect the Network: https://placer-ca-str-public-portal.deckard.com/
     */
    authorizationToken: validateKey(
      'REACT_APP_AUTH_TOKEN',
      process.env.REACT_APP_AUTH_TOKEN,
    ),
  },
};

function validateKey(key: string, keyValue?: string): string {
  if (keyValue == null || keyValue === '') {
    throw TypeError(`Wrong value for ${key} = ${keyValue}`);
  }
  return String(keyValue);
}

export default config;
