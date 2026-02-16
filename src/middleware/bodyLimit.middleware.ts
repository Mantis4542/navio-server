import { bodyLimit } from 'hono/body-limit';

import { MaxRequestBodySizeException } from '@/exceptions';

const size = 100 * 1024; // 100kb

export const maxRequestBodySize = bodyLimit({
  maxSize: size,
  onError: () => {
    throw new MaxRequestBodySizeException('ContentToLarge', size);
  },
});
