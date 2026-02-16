import pino, { type LoggerOptions } from 'pino';
import { pinoLogger } from 'hono-pino';

import { env } from '@/config/env.config';

// TODO: set target for production
const options: LoggerOptions = {
  level: env.LOG_LEVEL,
  transport:
    env.NODE_ENV === 'production'
      ? { target: '' }
      : {
          target: 'pino-pretty',
        },
};

export const logger = pino(options);

export const loggingMiddleware = pinoLogger({
  pino: pino(options),
});
