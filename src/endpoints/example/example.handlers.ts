import { OpenAPIHono } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';

import type { AppBindings } from '@/config/types.config';
import { authMiddleware } from '@/middleware/auth.middleware';
import { NotFoundException } from '@/exceptions';
import db from '@/db';
import { dbWrapper } from '@/db/dbWrapper';
import { exampleSchema } from '@/db/schemas/example.schema';
import {
  getRoute,
  listRoute,
  postRoute,
  updateRoute,
  deleteRoute,
} from '@/endpoints/example/example.routes';

export const example = new OpenAPIHono<AppBindings>();

example.use(authMiddleware);

example.openapi(listRoute, async (c) => {
  const result = await dbWrapper(() => db.select().from(exampleSchema));

  if (result.length === 0) {
    return c.json({ examples: [] });
  }

  return c.json({ examples: result });
});

example.openapi(getRoute, async (c) => {
  const { id } = c.req.valid('param');

  const result = await dbWrapper(() =>
    db.select().from(exampleSchema).where(eq(exampleSchema.id, id)),
  );

  if (result.length === 0) {
    throw new NotFoundException(`${id} not found`);
  }

  return c.json(result[0]);
});

example.openapi(postRoute, async (c) => {
  const body = c.req.valid('json');

  await dbWrapper(() => db.insert(exampleSchema).values(body));

  return c.body(null, 204);
});

example.openapi(updateRoute, async (c) => {
  const { id } = c.req.valid('param');
  const body = c.req.valid('json');

  const result = await dbWrapper(() =>
    db.update(exampleSchema).set({ name: body.name }).where(eq(exampleSchema.id, id)).returning(),
  );

  if (result.length === 0) {
    throw new NotFoundException(`${id} not found`);
  }

  return c.json(result[0]);
});

example.openapi(deleteRoute, async (c) => {
  const { id } = c.req.valid('param');
  const result = await dbWrapper(() =>
    db.delete(exampleSchema).where(eq(exampleSchema.id, id)).returning(),
  );

  if (result.length === 0) {
    throw new NotFoundException(`${id} not found`);
  }

  return c.body(null, 204);
});
