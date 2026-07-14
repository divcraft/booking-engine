import { ArgumentsHost, Catch, ExceptionFilter, HttpException, INestApplication } from '@nestjs/common';
import { Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'zod';
import { InternalServerErrorType } from './errors.models';
import { ErrorValidator } from './errors.validator';
import { ERRORS } from './errors.factory';

@Catch()
class GlobalExceptionFilter implements ExceptionFilter {
  catch(error: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    if (error instanceof ZodValidationException) {
      const zodError = error.getZodError();

      const details =
        zodError instanceof ZodError
          ? zodError.issues.map((issue) => ({
              path: issue.path.join('.'),
              message: issue.message,
            }))
          : [];

      const { body } = new ERRORS.NOT_ACCEPTABLE.exception(details);
      response.status(body.status).json(body);

      console.error('validation error:', details);
      return;
    }

    if (error instanceof HttpException) {
      const rawStatus = error.getStatus();

      const body = ErrorValidator.validate(rawStatus, error.getResponse());
      response.status(body.status).json(body);

      console.error('http exception:', body);
      return;
    }

    const defaultResponse: InternalServerErrorType = {
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Cannot match any existing error',
    };

    response.status(defaultResponse.status).json(defaultResponse);

    console.error('default response:', defaultResponse);
  }
}

export const setupGlobalExceptionFilter = (app: INestApplication) => {
  app.useGlobalFilters(new GlobalExceptionFilter());
};
