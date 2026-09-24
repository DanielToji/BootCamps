import winston from 'winston';
import morgan from 'morgan';
import { mkdirSync } from 'fs';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const isProd = process.env.NODE_ENV === 'production';
const level = isProd ? 'warn' : 'http';

const devFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ timestamp, level, message, stack }) => `${timestamp} ${level}: ${stack || message}`)
);

const prodFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json()
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: isProd ? prodFormat : devFormat,
  }),
];

if (isProd) {
  mkdirSync('logs', { recursive: true });
  transports.push(
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
  );
}

export const logger = winston.createLogger({
  level,
  levels,
  transports,
});

export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message: string) => {
        logger.log('http', message.trim());
      },
    },
  }
);