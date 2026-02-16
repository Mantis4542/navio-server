import { betterAuth } from 'better-auth';
import { openAPI } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { env } from '@/config/env.config';
import db from '@/db';
import * as schemas from '@/db/schemas';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schemas,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [env.CLIENT_URL],
  plugins: [openAPI()],
});
