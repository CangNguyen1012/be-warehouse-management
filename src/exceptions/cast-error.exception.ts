import { HttpException, HttpStatus } from '@nestjs/common';

export class CastErrorException extends HttpException {
  constructor(path: string, value: string) {
    super(`Invalid value for ${path}: ${value}`, HttpStatus.BAD_REQUEST);
  }
}
