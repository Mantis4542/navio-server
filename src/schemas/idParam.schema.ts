import { z } from '@hono/zod-openapi';

export const IdParamSchema = z.object({
  id: z
    .uuid()
    .min(1)
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '123',
    }),
});
