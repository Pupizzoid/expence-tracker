import winston, { Logform, Logger, transports } from 'winston';
import CircularJSON from 'circular-json';

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

const isDevelopment = (): boolean => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'development';
};

const level = (): string => {
  return isDevelopment() ? 'debug' : 'warn';
};

const formatter: Logform.Format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),

  winston.format.printf((info: Logform.TransformableInfo) => {
    const { timestamp, level, message, ...meta } = info;

    return `[${timestamp}][${level}]: ${message} ${
      Object.keys(meta).length ? CircularJSON.stringify(meta, null, 2) : ''
    }`;
  })
);

class WinstonLogger {
  private logger: Logger;

  constructor() {
    const devTransports: transports.ConsoleTransportInstance[] = [
      new winston.transports.Console({
        format: formatter,
      }),
    ];

    const prodTransports: transports.FileTransportInstance[] = [
      new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
      new winston.transports.File({
        filename: 'logs/debug.log',
        level: 'debug',
      }),
      new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: 'logs/all.log' }),
    ];
    this.logger = winston.createLogger({
      level: level(),
      levels: customLevels.levels,
      transports: isDevelopment() ? devTransports : prodTransports,
    });
    winston.addColors(customLevels.colors);
  }

  // setLevel(level: 'trace' | 'debug' | 'info' | 'warn' | 'report' | 'fatal') {
  //     this.logger.level = level;
  // }

  debug(msg: string, meta?: object) {
    this.logger.debug(msg, meta);
  }

  info(msg: string, meta?: object) {
    this.logger.info(msg, meta);
  }

  warn(msg: string, meta?: object) {
    this.logger.warn(msg, meta);
  }

  error(msg: string, meta?: object) {
    this.logger.error(msg, meta);
  }
}

export const logger: WinstonLogger = new WinstonLogger();
