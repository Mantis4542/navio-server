import { HTTPException } from 'hono/http-exception';

export class NotFoundException extends HTTPException {
  constructor(message = 'item not found') {
    super(404, { message });
  }
}
