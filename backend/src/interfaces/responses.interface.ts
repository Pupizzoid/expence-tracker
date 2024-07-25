import { IUser } from './user.interface';

export interface IAuthResponse {
  user: IUser;
  jwt_token: string;
}
