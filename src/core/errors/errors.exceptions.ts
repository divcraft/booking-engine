import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  ServiceUnavailableException,
  HttpException,
} from '@nestjs/common';
import {
  BadRequestErrorDto,
  NotAcceptableDto,
  UnauthorizedErrorDto,
  ForbiddenErrorDto,
  NotFoundErrorDto,
  ConflictErrorDto,
  InternalServerErrorDto,
  ApplicationNotReadyErrorDto,
} from './errors.models';

interface DefaultApiResponse<T> {
  body: T;
}

export class BadRequestApiException extends BadRequestException implements DefaultApiResponse<BadRequestErrorDto> {
  constructor(message = 'Bad request') {
    super({
      status: 400,
      code: 'BAD_REQUEST',
      message,
    } satisfies BadRequestErrorDto);
  }
  get body(): BadRequestErrorDto {
    return this.getResponse() as BadRequestErrorDto;
  }
}

export class NotAcceptableApiException extends HttpException implements DefaultApiResponse<NotAcceptableDto> {
  constructor(details: NotAcceptableDto['details']) {
    super(
      {
        status: 406,
        code: 'NOT_ACCEPTABLE',
        message: 'Request validation failed',
        details,
      } satisfies NotAcceptableDto,
      406,
    );
  }
  get body(): NotAcceptableDto {
    return this.getResponse() as NotAcceptableDto;
  }
}

export class UnauthorizedApiException
  extends UnauthorizedException
  implements DefaultApiResponse<UnauthorizedErrorDto>
{
  constructor(message = 'Authentication is required or invalid') {
    super({
      status: 401,
      code: 'UNAUTHORIZED',
      message,
    } satisfies UnauthorizedErrorDto);
  }
  get body(): UnauthorizedErrorDto {
    return this.getResponse() as UnauthorizedErrorDto;
  }
}

export class ForbiddenApiException extends ForbiddenException implements DefaultApiResponse<ForbiddenErrorDto> {
  constructor(message = 'Authenticated user has no permission to access this resource') {
    super({
      status: 403,
      code: 'FORBIDDEN',
      message,
    } satisfies ForbiddenErrorDto);
  }
  get body(): ForbiddenErrorDto {
    return this.getResponse() as ForbiddenErrorDto;
  }
}

export class NotFoundApiException extends NotFoundException implements DefaultApiResponse<NotFoundErrorDto> {
  constructor(message = 'Requested resource was not found') {
    super({
      status: 404,
      code: 'NOT_FOUND',
      message,
    } satisfies NotFoundErrorDto);
  }
  get body(): NotFoundErrorDto {
    return this.getResponse() as NotFoundErrorDto;
  }
}

export class ConflictApiException extends ConflictException implements DefaultApiResponse<ConflictErrorDto> {
  constructor(message = 'Request conflicts with current resource state') {
    super({
      status: 409,
      code: 'CONFLICT',
      message,
    } satisfies ConflictErrorDto);
  }
  get body(): ConflictErrorDto {
    return this.getResponse() as ConflictErrorDto;
  }
}

export class InternalServerErrorApiException
  extends InternalServerErrorException
  implements DefaultApiResponse<InternalServerErrorDto>
{
  constructor(message = 'Unexpected server error') {
    super({
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message,
    } satisfies InternalServerErrorDto);
  }
  get body(): InternalServerErrorDto {
    return this.getResponse() as InternalServerErrorDto;
  }
}

export class ApplicationNotReadyApiException
  extends ServiceUnavailableException
  implements DefaultApiResponse<ApplicationNotReadyErrorDto>
{
  constructor(dependencies: ApplicationNotReadyErrorDto['dependencies']) {
    super({
      status: 503,
      code: 'APPLICATION_NOT_READY',
      message: 'Application is not ready to accept requests',
      dependencies,
      timestamp: new Date().toISOString(),
    } satisfies ApplicationNotReadyErrorDto);
  }
  get body(): ApplicationNotReadyErrorDto {
    return this.getResponse() as ApplicationNotReadyErrorDto;
  }
}
