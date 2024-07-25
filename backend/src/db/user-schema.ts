import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, unique: true },
});

export const User = model<IUser>('User', UserSchema);
