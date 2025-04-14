import { BaseHttpException } from './base-http.exception';
import { ErrorCodes } from './error-codes.enum';
import { HttpStatus } from '@nestjs/common';

export class DuplicateUserException extends BaseHttpException {
  constructor(email: string) {
    super(
      ErrorCodes.USER_ALREADY_EXISTS,
      `A user with email ${email} already exists`,
      HttpStatus.CONFLICT,
    );
  }
}
