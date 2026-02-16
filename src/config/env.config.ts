import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const EnvSchema = z.object({
  NODE_ENV: z.string(),
  HONO_LOG: z.string(),
  CLIENT_URL: z.string(),
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  ADMIN_NAME: z.string(),
  ADMIN_EMAIL: z.string(),
  ADMIN_PASSWORD: z.string(),
  LOG_LEVEL: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;

export const env = EnvSchema.parse(process.env);
