import {json, urlencoded} from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {type Express} from 'express';
import {createServer, type Server} from 'http';

import config from './config/app';
import logger from './config/logger';
import registerRoutes from './routes/registerRoutes';

let app: Express;
let server: Server;
const appPort = config.app.port;
const appHost = config.app.host;

export const initServer = async () => {
  app = express();
  app.use(cors());
  app.use(json());
  app.use(urlencoded({extended: false}));
  app.use(cookieParser());

  registerRoutes(app);
  server = createServer(app);
  return server;
};

/**
 * This method is decoupled form the `initServer` method,
 * in order to make it easier to create isolated unit tests.
 */
export const initDb = async () => {
  server.on('ready', startServer);
  // emmit after db initialization
  return new Promise(resolve => {
    setTimeout(() => {
      server.emit('ready');
      resolve(server);
    }, 100);
  });
};

/**
 * This method is decoupled form the `initServer` method,
 * in order to make it easier to create isolated unit tests.
 */
const startServer = async () => {
  server.listen(appPort, () => {
    logger.info(`⚡️ Express running at http://${appHost}:${appPort}`);
  });

  return server;
};

process.on('unhandledRejection', err => {
  logger.error(err);
  process.exit(1);
});
