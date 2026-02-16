import { HTTPException } from 'hono/http-exception';

export class AuthException extends HTTPException {
  constructor(message = 'Unauthorized') {
    super(401, { message });
  }
}
