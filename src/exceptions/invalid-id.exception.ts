import { BaseHttpException } from './base-http.exception';
import { ErrorCodes } from './error-codes.enum';
import { HttpStatus } from '@nestjs/common';

export class InvalidIdException extends BaseHttpException {
  constructor(id: string) {
    super(
      ErrorCodes.INVALID_OBJECT_ID,
      `Invalid ID format: ${id}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
