import type {} from 'drizzle-orm';
import { OpenAPIHono } from '@hono/zod-openapi';

import type { AppBindings } from '@/config/types.config';
import { errorHandler } from '@/errorHandler';
import { auth } from '@/utils/auth.utils';
import { example } from '@/endpoints/example/example.handlers';

export const routes = new OpenAPIHono<AppBindings>();

routes.route('/example', example);

// Better Auth endpoints
routes.on(['POST', 'GET'], '/auth/**', (c) => auth.handler(c.req.raw));

routes.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

routes.onError(errorHandler);
