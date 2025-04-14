import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundCustomException extends HttpException {
  constructor(resource: string = 'Resource', id?: string) {
    const msg = id
      ? `${resource} not found with ID: ${id}`
      : `${resource} not found`;
    super(msg, HttpStatus.NOT_FOUND);
  }
}
