import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestCustomException extends HttpException {
  constructor(message: string = 'Bad Request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
