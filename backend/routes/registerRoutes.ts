import express, {type Express, type Request, type Response} from 'express';

import config from '../config/app';
import logger from '../config/logger';
import messages from '../config/messages';
import Applicant from '../models/applicant';

export default function registerRoutes(server: Express) {
  const router = express.Router();

  server.route('/').get((req: Request, res: Response) => {
    res.send('Default Server');
  });

  router.post(`/applicant`, (req: Request, res: Response) => {
    const params = req.body;

    const applicant = new Applicant({
      fullname: params.fullname,
      address: params.address,
      email: params.email,
    });

    applicant
      .save()
      .then(createdApplicant => {
        const serverData: ServerResponse<IApplicant> = {
          ...messages.SUCCESSFUL_ADDED,
          data: createdApplicant,
        };
        if (!applicant.email) {
          throw Error('Missing email');
        }
        logger.info('DATA:', serverData);
        res.status(serverData.statusCode).json(serverData);
      })
      .catch(err => {
        const errorCode = err.code ?? 500;
        const msgKey = Object.keys(messages).find(key => {
          return messages[key].statusCode === errorCode;
        });
        const serverMsg: ServerResponse = messages[msgKey];
        serverMsg.error = {
          message: err.message,
          stack: err.stack,
        };
        res.status(errorCode).json(serverMsg);
      });
  });

  server.use(config.app.apiPrefix, router);
  return server;
}
