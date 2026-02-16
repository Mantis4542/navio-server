import { drizzle } from 'drizzle-orm/node-postgres';

import { env } from '@/config/env.config';

export default drizzle(env.DATABASE_URL, {
  casing: 'snake_case',
});
