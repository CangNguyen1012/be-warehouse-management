import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(
    message: string = 'You do not have permission to perform this action',
  ) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
