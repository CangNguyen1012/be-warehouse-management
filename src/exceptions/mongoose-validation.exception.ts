/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BaseHttpException } from './base-http.exception';
import { ErrorCodes } from './error-codes.enum';
import { HttpStatus } from '@nestjs/common';

export class MongooseValidationException extends BaseHttpException {
  constructor(errors: any) {
    const messages = Object.values(errors).map((e: any) => e.message);
    super(ErrorCodes.VALIDATION_FAILED, messages, HttpStatus.BAD_REQUEST);
  }
}
