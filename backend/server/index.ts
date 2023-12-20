import path from 'node:path';

import {expressMiddleware} from '@apollo/server/express4';
import cors from 'cors';
import express, {type Express} from 'express';
import http, {type Server} from 'http';

import logger from '../utils/logger';
import initApollo from './apollo';
import config, {isProd} from './config';

const {host: appHost, port: appPort} = config.app;
const appPublic = config.app.public;
let server: Server;
let app: Express;

/**
 * Do not call, initServer() and startServer(). This will allow you to initialize and start
 * the server from different files. The initServer() function will initialize the
 * server (starts the caches, finalizes plugin registration) but does not start
 * the server. This is what you will use in your tests. The startServer() function
 * will actually start the server. This is what you will use in our main
 * entry-point for the server.
 */
export const initServer = async () => {
  app = express();
  server = http.createServer(app);
  const apollo = await initApollo();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    /**
     * expressMiddleware accepts the same arguments:
     * an Apollo Server instance and optional configuration options.
     * @see https://www.apollographql.com/docs/apollo-server/api/express-middleware
     */
    expressMiddleware(apollo, {
      context: async ({req}) => {
        // we remove the word Bearer that specifies the strategy used,
        // and then pass the token to the context object in the resolvers.
        const auth: string = req.headers.authorization ?? '';
        const token: string = auth.replace('Bearer ', '');
        return {token} as ApolloServerContext;
      },
    }),
  );

  // app.use(express.static(appPublic))

  if (!isProd) {
    /**
     * @see https://www.apollographql.com/docs/graphos/explorer/sandbox/
     */
    app.get('/sandbox', function (req, res) {
      res.sendFile(path.join(appPublic, 'sandbox', 'index.html'), {
        root: process.cwd(),
      });
    });
  }

  return server;
};

export const startServer = async () => {
  await new Promise<void>(resolve => server.listen({port: appPort}, resolve));
  logger.info(`🚀 Server ready at http://${appHost}:${appPort}`);
  return server;
};
