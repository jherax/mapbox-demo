/* eslint-disable curly */
import http, {type Server} from 'node:http';
import path from 'node:path';

import {type ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import cors from 'cors';
import express, {type Express} from 'express';
import helmet from 'helmet';

import logger from '../utils/logger';
import config, {isProd} from './config';

export class NodeServer {
  private _apollo: ApolloServer<ApolloServerContext>;
  private _app: Express;
  private _server: Server;
  private _started = false;

  constructor(apolloServer: ApolloServer<ApolloServerContext>) {
    this._app = express();
    this._server = http.createServer(this._app);
    this._apollo = apolloServer;
    this.routerConfig();
  }

  private routerConfig() {
    const publicFolder = config.app.public;

    // app.use(express.static(publicFolder))
    this._app.get('/', function (req, res) {
      res.sendFile(path.resolve(publicFolder, 'docs', 'README.html'));
    });

    this._app.use(
      '/graphql',
      express.json(),
      cors<cors.CorsRequest>(),
      helmet({contentSecurityPolicy: isProd ? undefined : false}),

      /**
       * expressMiddleware accepts the same arguments:
       * an Apollo Server instance and optional configuration options.
       * @see https://www.apollographql.com/docs/apollo-server/api/express-middleware
       */
      expressMiddleware(this._apollo, {
        context: async ({req}) => {
          // we remove the word Bearer that specifies the strategy used,
          // and then pass the token to the context object in the resolvers.
          const auth: string = req.headers.authorization ?? '';
          const token: string = auth.replace('Bearer ', '');
          return {token} as ApolloServerContext;
        },
      }),
    );

    if (!isProd) {
      /**
       * @see https://www.apollographql.com/docs/graphos/explorer/sandbox/
       */
      this._app.get('/sandbox', function (req, res) {
        res.sendFile(path.resolve(publicFolder, 'sandbox', 'index.html'), {
          // root: process.cwd(),
        });
      });
    }
  }

  public get app(): Express {
    return this._app;
  }

  public get server(): Server {
    return this._server;
  }

  public async start(): Promise<void> {
    if (this._started) return Promise.resolve();
    const {host, port} = config.app;
    await new Promise<void>(resolve => this._server.listen({port}, resolve));
    logger.info(`⚡️ Express running at http://${host}:${port}`);
    this._started = true;
  }
}
