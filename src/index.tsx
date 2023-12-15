import './index.css';

import {ApolloProvider} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';

import AppApolloClient from './appApolloClient';
import AppRouter from './appRouter';
import reportWebVitals from './reportWebVitals';

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
    <ApolloProvider client={AppApolloClient}>
      <RouterProvider router={AppRouter} />
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
