import path from 'node:path';

import env from 'dotenv';

env.config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  app: {
    host: process.env.EXPRESS_HOST || 'localhost',
    port: process.env.EXPRESS_PORT || 9000,
    public: path.join(process.cwd(), 'public'),
  },
};

export const isProd = ['prod', 'production'].includes(config.env);

export default config;
