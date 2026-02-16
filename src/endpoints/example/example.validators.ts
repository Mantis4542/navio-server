import { z } from '@hono/zod-openapi';

export const Example = z
  .strictObject({
    id: z.uuid().openapi({
      example: '123',
    }),
    name: z.string().min(3).openapi({
      example: 'Chris',
    }),
  })
  .openapi('Example');

export const ExampleRequest = Example.omit({ id: true });
export const ExampleResponse = Example;

export const GetExampleResponse = ExampleResponse;

export const ListExampleResponse = z.object({
  examples: z.array(ExampleResponse),
});

export const CreateExampleRequest = ExampleRequest;

export const UpdateExampleRequest = ExampleRequest;
export const UpdateExampleResponse = ExampleResponse;
