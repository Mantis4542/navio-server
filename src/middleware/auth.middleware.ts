import { createMiddleware } from 'hono/factory';

import type { AppBindings } from '@/config/types.config';
import { auth } from '@/utils/auth.utils';
import { AuthException } from '@/exceptions';

export const authMiddleware = createMiddleware<AppBindings>(async (c, next) => {
  try {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      throw new AuthException();
    }

    c.set('user', session?.session);
    c.set('session', session?.session);

    return next();
  } catch {
    throw new AuthException();
  }
});
