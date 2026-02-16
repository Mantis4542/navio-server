import { HTTPException } from 'hono/http-exception';

export class MaxRequestBodySizeException extends HTTPException {
  constructor(message: 'ContentToLarge', size: number) {
    super(413, { message: `${message}: ${size}` });
  }
}
