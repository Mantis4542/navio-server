import { createRoute } from '@hono/zod-openapi';

import { IdParamSchema } from '@/schemas/idParam.schema';
import {
  ListExampleResponse,
  GetExampleResponse,
  CreateExampleRequest,
  UpdateExampleRequest,
  UpdateExampleResponse,
} from '@/endpoints/example/example.validators';

const TAGS = ['example'];

export const listRoute = createRoute({
  method: 'get',
  path: '/',
  tags: TAGS,
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ListExampleResponse,
        },
      },
      description: 'list of examples',
    },
  },
});

export const getRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: TAGS,
  request: {
    params: IdParamSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetExampleResponse,
        },
      },
      description: 'get example',
    },
  },
});

export const postRoute = createRoute({
  method: 'post',
  path: '/',
  tags: TAGS,
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateExampleRequest,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'create example',
    },
  },
});

export const updateRoute = createRoute({
  method: 'put',
  path: '/{id}',
  tags: TAGS,
  request: {
    params: IdParamSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateExampleRequest,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UpdateExampleResponse,
        },
      },
      description: 'update example',
    },
  },
});

export const deleteRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  tags: TAGS,
  request: {
    params: IdParamSchema,
  },
  responses: {
    204: {
      description: 'delete example',
    },
  },
});
