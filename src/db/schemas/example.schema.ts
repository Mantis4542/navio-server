import type { InferInsertModel } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const exampleSchema = pgTable('example', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
});
export type ExampleSchema = InferInsertModel<typeof exampleSchema>;
