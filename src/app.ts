import { OpenAPIHono } from '@hono/zod-openapi';
import { requestId } from 'hono/request-id';
import { Scalar } from '@scalar/hono-api-reference';

import type { AppBindings } from '@/config/types.config';
import { env } from '@/config/env.config';
import { loggingMiddleware } from '@/utils/logger.utils';
import { maxRequestBodySize } from '@/middleware/bodyLimit.middleware';
import { routes } from '@/routes';

export const app = new OpenAPIHono<AppBindings>();

if (env.NODE_ENV === 'development') {
  app.use(requestId());

  app.use(loggingMiddleware);
}

app.use(maxRequestBodySize);

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'iSchool API',
  },
});

app.get(
  '/scalar',
  Scalar({
    url: '/doc',
    theme: 'purple',
    sources: [
      { url: '/doc', title: 'API' },
      { url: '/api/auth/open-api/generate-schema', title: 'Auth' },
    ],
  }),
);

app.route('/api', routes);

export default app;
