import { DrizzleQueryError } from 'drizzle-orm';

import { DatabaseException } from '@/exceptions';

export async function dbWrapper<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof DrizzleQueryError) {
      const pgError = err.cause as { code?: string; detail?: string };

      throw new DatabaseException(pgError.detail, pgError.code);
    }

    throw new DatabaseException('Unhandled database exception', 'unknown');
  }
}
