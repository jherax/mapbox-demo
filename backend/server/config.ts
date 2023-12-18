import env from 'dotenv';

env.config();

const config = {
  app: {
    host: process.env.EXPRESS_HOST || 'localhost',
    port: process.env.EXPRESS_PORT || 9000,
  },
};

export default config;
