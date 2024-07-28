import {NodeServer} from './server';
import initApollo from './server/apollo';
import logger from './utils/logger';

initApollo()
  .then(apollo => new NodeServer(apollo))
  .then(nodeServer => nodeServer.start());

// Catch unhandling rejected promises
process.on('unhandledRejection', reason => {
  logger.error('UNHANDLED_REJECTION 👇');
  logger.error(reason);
  process.exit(1);
});

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error(`UNCAUGHT_EXCEPTION 👉 ${error.message}`);
  process.exit(1);
});
