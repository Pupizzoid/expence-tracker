import bcrypt from 'bcrypt';
import { User } from '../../db/user-schema';
import { HTTP404Error } from '../../lib/errors/http-404-error';
import { HTTP400Error } from '../../lib/errors/http-400-error';
import { errorResponse } from '../../lib/helpers/response-helper';
import { BaseError } from '../../lib/errors/base-error';
import { HttpStatusCode } from '../../enums/http-status-codes';
import { Request, Response } from 'express';
import { IUser } from '../../interfaces/user.interface';

export const registerUser = async (
  req: Request,
  res: Response
): Promise<IUser> => {
  try {
    const { email, username, password } = req.body;
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      errorResponse(res, new HTTP400Error('User Already Exist. Please Login'));
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    return newUser.save();
  } catch (error) {
    errorResponse(
      res,
      new BaseError(HttpStatusCode.SERVICE_UNAVAILABLE, 'Service unavailable')
    );
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<IUser> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      errorResponse(res, new HTTP404Error('User was not found'));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errorResponse(res, new HTTP404Error('Invalid password'));
    }
    return user;
  } catch (error) {
    errorResponse(
      res,
      new BaseError(HttpStatusCode.SERVICE_UNAVAILABLE, 'Service unavailable')
    );
  }
};
