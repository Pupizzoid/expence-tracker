import { Response } from 'express';
import { logger } from '../loggers/logger';
import { HttpStatusCode } from '../../enums/http-status-codes';
import { BaseError } from '../errors/base-error';

export const successResponse = <T>(res: Response, data: T) => {
  const statusCode = HttpStatusCode.OK;
  res.status(statusCode).json({
    status: 'success',
    data,
  });
};

export const errorResponse = (res: Response, error: BaseError) => {
  const { httpCode, message } = error;
  const code = httpCode || HttpStatusCode.INTERNAL_SERVER;
  const messageValue = message || 'Server error';

  logger.error(messageValue, { err: error.stack });
  res.status(code).json({
    status: 'error',
    httpCode,
    messageValue,
  });
};
