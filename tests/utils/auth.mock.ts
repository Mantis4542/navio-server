import { vi } from 'vitest';
import { faker } from '@faker-js/faker';

import { auth } from '@/utils/auth.utils';

export function mockAuthSession() {
  const session = {
    user: {
      id: faker.string.uuid(),
      name: faker.internet.username(),
      email: faker.internet.email(),
      emailVerified: true,
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.anytime(),
    },
    session: {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      token: faker.string.uuid(),
      expiresAt: faker.date.anytime(),
      updatedAt: faker.date.anytime(),
      createdAt: faker.date.anytime(),
    },
  };

  vi.mocked(auth.api.getSession).mockResolvedValue(session);

  return session;
}
