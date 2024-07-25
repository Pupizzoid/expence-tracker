import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import { router } from './router';
import { SERVER } from './config/config';
import mongoose from 'mongoose';
import { logger } from './lib/loggers/logger';
import { requestMiddleWare } from './lib/middlewares/http-logger';
import { handleError } from './lib/middlewares/error-handling';

const expressInit = () => {
  const app: Express = express();

  app.use(compression());

  app.use(cors());

  app.use(bodyParser.json());

  app.use(requestMiddleWare);

  app.use('', router);

  app.use('*', (req: Request, res: Response): void => {
    res.status(404).json({ error: 'Not Found!' });
  });

  // app.use(handleError);

  app.listen(SERVER.SERVER_PORT, (): void => {
    logger.info(`Application started on port ${SERVER.SERVER_PORT} `);
  });
};

const catchUnhandledError = () => {
  process
    .on('unhandledRejection', (reason: any, promise: Promise<any>): void => {
      logger.error(`${reason} Unhandled Rejection at Promise: ${promise}`);
    })
    .on('uncaughtException', (err: Error, origin: string): void => {
      logger.error(`Caught exception: ${err} Exception origin: ${origin}`);
      process.exit(1);
    });
};

const connectDB = async () => {
  try {
    await mongoose.connect(SERVER.MONGO_DB_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

const initialize = async () => {
  // await db.sequelize.sync();
  connectDB();
  await catchUnhandledError();
  await expressInit();
};

initialize();
