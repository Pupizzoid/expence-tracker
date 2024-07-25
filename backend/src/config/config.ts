import dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
export const SERVER_PORT = process.env.SERVER_PORT || 3000;
export const MONGO_DB_URL = 'mongodb://localhost:27017/tracker';
export const JWT_SECRET = process.env.JWT_SECRET;

export const SERVER = {
  SERVER_HOSTNAME,
  SERVER_PORT,
  MONGO_DB_URL,
  JWT_SECRET,
};
