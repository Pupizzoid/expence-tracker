import { NextFunction, Request, Response } from 'express';
import { logger } from '../loggers/logger';

export const requestMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('Request started', { req });

  res.on('finish', () => {
    logger.info('Request was finished', { req, res });
  });
  next();
};
