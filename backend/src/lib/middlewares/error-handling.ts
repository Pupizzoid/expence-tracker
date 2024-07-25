import { errorResponse } from '../helpers/response-helper';
import { BaseError } from '../errors/base-error';
import { NextFunction, Request, Response } from 'express';

export const handleError = (
  error: BaseError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  errorResponse(res, error);
  _next();
};
