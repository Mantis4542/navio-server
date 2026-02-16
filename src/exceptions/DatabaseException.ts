import { HTTPException } from 'hono/http-exception';

export class DatabaseException extends HTTPException {
  code?: string;

  constructor(message = 'DatabaseError', code: string | undefined) {
    super(undefined, { message });

    this.code = code;
  }
}
