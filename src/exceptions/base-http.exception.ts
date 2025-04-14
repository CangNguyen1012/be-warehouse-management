import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  constructor(
    errorCode: string,
    message: string | string[],
    status: HttpStatus,
  ) {
    super(
      {
        errorCode,
        message,
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }
}
