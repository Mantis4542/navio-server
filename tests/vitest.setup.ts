import { vi, beforeEach } from 'vitest';

vi.mock('@/utils/auth.utils', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.resetAllMocks();
});
