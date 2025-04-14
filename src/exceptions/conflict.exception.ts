import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor(message: string = 'Conflict occurred') {
    super(message, HttpStatus.CONFLICT);
  }
}
