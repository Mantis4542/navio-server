import type { Context } from 'hono';
import type { HTTPResponseError } from 'hono/types';
import { logger } from '@/utils/logger.utils';

import { AuthException, NotFoundException, DatabaseException } from '@/exceptions';

export function errorHandler(err: Error | HTTPResponseError, c: Context) {
  if (err instanceof AuthException) {
    logger.warn(err);
    return c.json({ error: err.message }, err.status);
  }

  if (err instanceof NotFoundException) {
    return c.json({ error: err.message }, err.status);
  }

  if (err instanceof DatabaseException) {
    if (err.code === '23505') {
      return c.json({ error: err.message }, 400);
    }

    if (err.code === '3D000') {
      logger.error('Database does not exist');
      return c.json({ error: 'Database connection failed' }, 503);
    }

    if (err.code === '23502') {
      return c.json({ error: 'not null failed' });
    }

    if (err.code === 'ECONNREFUSED') {
      logger.error(`${err.message}`);
      return c.json({ error: 'Database connection failed' }, 503);
    }
  }

  logger.error(err);

  return c.json({ error: 'Internal Server Error' }, 500);
}
