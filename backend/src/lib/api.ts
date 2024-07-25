import { NextFunction, Request, Response } from 'express';
import { logger } from './loggers/logger';
import { errorResponse } from './helpers/response-helper';
import { HTTP400Error } from './errors/http-400-error';
import { Validation } from '../enums/validation';
import { Schema } from 'joi';

export const requestHandler = (
  name: string,
  schema: Schema,
  typeOfValidation: Validation,
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[typeOfValidation]);

    if (error?.isJoi) {
      const errorValue = error.details.map(err => err.message);
      logger.error('Joi validation error', { errorValue });
      errorResponse(res, new HTTP400Error(JSON.stringify(error.details)));
    }
    logger.info(name, req[typeOfValidation]);
    handler(req, res, next).catch(next);
  };
};
