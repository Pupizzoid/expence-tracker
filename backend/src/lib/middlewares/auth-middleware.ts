import { verify } from 'jsonwebtoken';
import { SERVER } from '../../config/config';
import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../helpers/response-helper';
import { BaseError } from '../errors/base-error';
import { HttpStatusCode } from '../../enums/http-status-codes';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    errorResponse(
      res,
      new BaseError(HttpStatusCode.UNAUTHORIZED, 'Unauthorized')
    );
  }
  const [, jwtToken] = authHeader.split(' ');
  try {
    req.user = verify(jwtToken, SERVER.JWT_SECRET);
    next();
  } catch (e) {
    errorResponse(
      res,
      new BaseError(HttpStatusCode.UNAUTHORIZED, 'Invalid JWT')
    );
  }
};
