# Apollo GraphQL and React Map GL

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

Used [styled-components](https://styled-components.com/) and
[React Map GL](https://visgl.github.io/react-map-gl/) as wrapper for
[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/).

## Environment

This application depends on some environment variables. Once you have cloned the
repository
[github.com/jherax/mapbox-demo](https://github.com/jherax/mapbox-demo), go to
the root directory and create a `.env` file with the following keys:

### Server

```bash
EXPRESS_PORT=9000

# dev | prod | qa
NODE_ENV=dev
```

### Client

```bash
# Graphql resource location
REACT_APP_GRAPHQL_RENTALSCAPE=https://fxjney46mbeijjyti3ysri6afi.appsync-api.us-west-2.amazonaws.com/graphql
REACT_APP_GRAPHQL_CITIES=http://localhost:9000/graphql

# Authorization Header
REACT_APP_AUTH_RENTALSCAPE=___Authorization_Key___
REACT_APP_MAPBOX_ACCESS_TOKEN=___React_Mapbox_Access_Token___
```

Whitout those values, the app can't start properly.

## Running the server

Just run the command

```bash
npm install
npm run dev:server
```

## Applications

The Express backend is started by running `npm run dev:server`. The server is
listening by default in [http://localhost:9000](http://localhost:9000). You can
change the default port by setting the key `EXPRESS_PORT` in the `.env` file.

> **The following paths are part of the Express router:**

- [`/graphql`](http://localhost:9000/graphql) Apollo GraphQL server.
- [`/sandbox`](http://localhost:9000/sandbox) Apollo GraphQL sandbox.

The front-end application is started by running `npm run start`, then the
browser opens [http://localhost:3000](http://localhost:3000) with the default
view.

> **The following paths are part of the React router:**

- [`/`](http://localhost:3000) Cities Autocomplete (default)
- [`/mapbox`](http://localhost:3000/mapbox) React Map GL demo.
- [`/playground/:source`](http://localhost:3000/playground) Apollo GraphQL
  sandbox.
  - `:source` GraphQL datasource: `rentalscape | cities`

## Apollo GraphQL

The path that resolves Apollo queries is: `/graphql`.

> 💡 When running in non-production environment, the `/graphql` and `/sandbox`
> paths are enabled to run an
> [Apollo Sandbox](https://www.apollographql.com/docs/graphos/explorer/sandbox/)
> environment where we can now execute GraphQL our queries on our own server.

- Default path: [localhost:9000/sandbox](http://localhost:9000/graphql)
- Online Sandbox:
  [studio.apollographql.com/sandbox](https://studio.apollographql.com/sandbox/)

## VS Code REST

This App suggest installing some VS Code extensions to ease the development
experience. One of those extensions is the
[REST Client](https://github.com/Huachao/vscode-restclient#making-graphql-request)
which allows you to send HTTP request and view the response in Visual Studio
Code directly. This extension comes with a build-in support for making GraphQL
requests.

You can find the file containing the graphql queries here:

- [getCities.http](backend/graphql/__tests__/getCities.http)
- [getCitiesByName.http](backend/graphql/__tests__/getCitiesByName.http)
- [getCitiesByCountry.http](backend/graphql/__tests__/getCitiesByCountry.http)
- [getCitiesByLanguage.http](backend/graphql/__tests__/getCitiesByLanguage.http)
- [getRegionDetails.http](src/views/Rentalscape/__tests__/getRegionDetails.http)
- [getRegionHouses.http](src/views/Rentalscape/__tests__/getRegionHouses.http)
- [getRegionNames.http](src/views/Rentalscape/__tests__/getRegionNames.http)

## Scripts

In the root directory, the following scripts are available:

### Server scripts

- `npm run dev:server` Runs the Express server at
  [http://localhost:9000](http://localhost:9000).

- `npm run test:be` Start the test suite for the code in the `/backend`
  directory.

- `npm run build:server` Builds the app for production to the `backend/dist`
  folder.

- `npm run gendocs` Generates the public `README.html` file from markdown.

### Client scripts

- `npm start` Runs the app in the development mode. Open
  [http://localhost:3000](http://localhost:3000) to view it in the browser. The
  page will reload if you make edits. You will also see any lint errors in the
  console.

- `npm test` Launches the test runner in the interactive watch mode. See the
  section about
  [running tests](https://facebook.github.io/create-react-app/docs/running-tests)
  for more information.

- `npm run build` Builds the app for production to the `build` folder. It
  correctly bundles React in production mode and optimizes the build for best
  performance. The build is minified and the filenames include the hashes and
  _Your app is ready to be deployed!_ (See the
  [deployment](https://facebook.github.io/create-react-app/docs/deployment)
  section for more information).

- `npm run eject`

  **Note: this is a one-way operation. Once you `eject`, you can’t go back!**

  If you aren’t satisfied with the build tool and configuration choices, you can
  `eject` at any time. This command will remove the single build dependency from
  your project.

  Instead, it will copy all the configuration files and the transitive
  dependencies (webpack, Babel, ESLint, etc) right into your project so you have
  full control over them. All of the commands except `eject` will still work,
  but they will point to the copied scripts so you can tweak them. At this point
  you’re on your own.

  You don’t have to ever use `eject`. The curated feature set is suitable for
  small and middle deployments, and you shouldn’t feel obligated to use this
  feature. However we understand that this tool wouldn’t be useful if you
  couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
