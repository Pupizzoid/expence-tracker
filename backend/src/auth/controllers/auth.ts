import { requestHandler } from '../../lib/api';
import {
  LoginRequestSchema,
  LoginSchema,
  RegisterRequestSchema,
  RegisterSchema,
} from '../validation/validation-schema';
import { Validation } from '../../enums/validation';
import { ValidatedRequest } from 'express-joi-validation';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { SERVER } from '../../config/config';
import { loginUser, registerUser } from '../services/auth-service';
import { successResponse } from '../../lib/helpers/response-helper';
import { IAuthResponse } from '../../interfaces/responses.interface';
import { IUser } from '../../interfaces/user.interface';

const registerHandler = requestHandler(
  'Register - User API',
  RegisterSchema,
  Validation.BODY,
  async (req: ValidatedRequest<RegisterRequestSchema>, res: Response) => {
    const user: IUser = await registerUser(req, res);
    successResponse<IAuthResponse>(res, {
      jwt_token: sign({ id: user._id }, SERVER.JWT_SECRET, {
        expiresIn: '1800s',
      }),
      user,
    });
  }
);

const loginHandler = requestHandler(
  'Login - User API',
  LoginSchema,
  Validation.BODY,
  async (req: ValidatedRequest<LoginRequestSchema>, res: Response) => {
    const user: IUser = await loginUser(req, res);
    successResponse<IAuthResponse>(res, {
      jwt_token: sign({ id: user._id }, SERVER.JWT_SECRET, {
        expiresIn: '1800s',
      }),
      user,
    });
  }
);
export { loginHandler, registerHandler };
