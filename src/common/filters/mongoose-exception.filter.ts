/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { appLogger } from '../../logger/winston.logger';
import { ErrorCodes } from '../../exceptions/error-codes.enum';

@Catch()
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = ErrorCodes.INTERNAL_ERROR;
    let message: string | string[] = 'Something went wrong';

    // Mongoose Validation Error
    if (exception.name === 'ValidationError') {
      status = HttpStatus.BAD_REQUEST;
      errorCode = ErrorCodes.VALIDATION_FAILED;
      message = Object.values(exception.errors).map((e: any) => e.message);
    }

    // Mongoose Cast Error
    else if (exception.name === 'CastError') {
      status = HttpStatus.BAD_REQUEST;
      errorCode = ErrorCodes.INVALID_OBJECT_ID;
      message = `Invalid value for ${exception.path}: ${exception.value}`;
    }

    // Duplicate key
    else if (exception.code === 11000) {
      status = HttpStatus.CONFLICT;
      errorCode = ErrorCodes.USER_ALREADY_EXISTS;
      const field = Object.keys(exception.keyValue)[0];
      const value = exception.keyValue[field];
      message = `${field} already exists: ${value}`;
    }

    // NestJS HttpException
    else if (exception.getStatus && exception.getResponse) {
      status = exception.getStatus();
      const resBody = exception.getResponse();
      message = (resBody as any)?.message || exception.message;
      errorCode = (resBody as any)?.errorCode || errorCode;
    }

    // Log the error
    appLogger.error({
      message: typeof message === 'string' ? message : message.join(', '),
      stack: exception.stack,
      context: exception.name,
      timestamp: new Date().toISOString(),
    });

    // Respond
    res.status(status).json({
      statusCode: status,
      errorCode,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
