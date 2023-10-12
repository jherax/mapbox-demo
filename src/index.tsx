import './index.css';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';

import config from './config/app.cfg';
import reportWebVitals from './reportWebVitals';
import Applicant from './views/Applicant';
import Rentalscape from './views/Rentalscape';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Outlet />}>
      <Route path='' element={<Rentalscape />} />
      <Route path='applicant' element={<Applicant />} />
    </Route>,
  ),
);

const createApolloClient = (url: string, authToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: url,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

const client = createApolloClient(
  config.api.baseUrl,
  config.api.authorizationToken,
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

/**
 * Strict mode can’t automatically detect side effects for you,
 * but it can help you spot them by making them a little more deterministic.
 * This is done by intentionally double-invoking the following functions:
 * - Class component constructor, render, and shouldComponentUpdate methods.
 * - Functions passed to useState, useMemo, or useReducer
 */
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
