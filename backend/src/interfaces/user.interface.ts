import { ObjectId } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  username: string;
  _id: ObjectId;
}
