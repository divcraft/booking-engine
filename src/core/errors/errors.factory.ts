import {
  ConflictErrorDto,
  ErrorDefinitionType,
  ErrorDefinitionMapType,
  ForbiddenErrorDto,
  InternalServerErrorDto,
  NotFoundErrorDto,
  UnauthorizedErrorDto,
  BadRequestErrorDto,
  NotAcceptableDto,
  ApplicationNotReadyErrorDto,
  badRequestErrorSchema,
  notAcceptableSchema,
  unauthorizedErrorSchema,
  forbiddenErrorSchema,
  notFoundErrorSchema,
  conflictErrorSchema,
  internalServerErrorSchema,
  applicationNotReadyErrorSchema,
} from './errors.models';
import {
  BadRequestApiException,
  NotAcceptableApiException,
  ConflictApiException,
  ForbiddenApiException,
  InternalServerErrorApiException,
  NotFoundApiException,
  UnauthorizedApiException,
  ApplicationNotReadyApiException,
} from './errors.exceptions';

export const ERRORS = {
  BAD_REQUEST: {
    status: 400,
    description: 'Bad request',
    code: 'BAD_REQUEST',
    dto: BadRequestErrorDto,
    exception: BadRequestApiException,
    schema: badRequestErrorSchema,
    default: (message?: string) => {
      return {
        status: 400,
        code: 'BAD_REQUEST',
        message: message ?? 'Bad request',
      };
    },
  },
  NOT_ACCEPTABLE: {
    status: 406,
    description: 'Request validation failed',
    code: 'NOT_ACCEPTABLE',
    dto: NotAcceptableDto,
    exception: NotAcceptableApiException,
    schema: notAcceptableSchema,
    default: (message?: string) => {
      return {
        status: 406,
        code: 'NOT_ACCEPTABLE',
        message: message ?? 'Request validation failed',
        details: [],
      };
    },
  },
  UNAUTHORIZED: {
    status: 401,
    description: 'Authentication is required or invalid',
    code: 'UNAUTHORIZED',
    dto: UnauthorizedErrorDto,
    exception: UnauthorizedApiException,
    schema: unauthorizedErrorSchema,
    default: (message?: string) => {
      return {
        status: 401,
        code: 'UNAUTHORIZED',
        message: message ?? 'Authentication is required or invalid',
      };
    },
  },
  FORBIDDEN: {
    status: 403,
    description: 'Authenticated user has no permission to access this resource',
    code: 'FORBIDDEN',
    dto: ForbiddenErrorDto,
    exception: ForbiddenApiException,
    schema: forbiddenErrorSchema,
    default: (message?: string) => {
      return {
        status: 403,
        code: 'FORBIDDEN',
        message: message ?? 'Authenticated user has no permission to access this resource',
      };
    },
  },
  NOT_FOUND: {
    status: 404,
    description: 'Requested resource was not found',
    code: 'NOT_FOUND',
    dto: NotFoundErrorDto,
    exception: NotFoundApiException,
    schema: notFoundErrorSchema,
    default: (message?: string) => {
      return {
        status: 404,
        code: 'NOT_FOUND',
        message: message ?? 'Requested resource was not found',
      };
    },
  },
  CONFLICT: {
    status: 409,
    description: 'Request conflicts with current resource state',
    code: 'CONFLICT',
    dto: ConflictErrorDto,
    exception: ConflictApiException,
    schema: conflictErrorSchema,
    default: (message?: string) => {
      return {
        status: 409,
        code: 'CONFLICT',
        message: message ?? 'Request conflicts with current resource state',
      };
    },
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    description: 'Unexpected server error',
    code: 'INTERNAL_SERVER_ERROR',
    dto: InternalServerErrorDto,
    exception: InternalServerErrorApiException,
    schema: internalServerErrorSchema,
    default: (message?: string) => {
      return {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR',
        message: message ?? 'Unexpected server error',
      };
    },
  },
  APPLICATION_NOT_READY: {
    status: 503,
    description: 'Application is not ready to accept requests',
    code: 'APPLICATION_NOT_READY',
    dto: ApplicationNotReadyErrorDto,
    exception: ApplicationNotReadyApiException,
    schema: applicationNotReadyErrorSchema,
    default: (message?: string) => {
      return {
        status: 503,
        code: 'APPLICATION_NOT_READY',
        message: message ?? 'Application is not ready to accept requests',
        dependencies: {
          database: 'error',
        },
        timestamp: new Date().toISOString(),
      };
    },
  },
} as const satisfies ErrorDefinitionMapType;

export const getDefaultErrors = (): Array<ErrorDefinitionType> => {
  const { BAD_REQUEST, NOT_ACCEPTABLE, INTERNAL_SERVER_ERROR } = ERRORS;
  return [BAD_REQUEST, NOT_ACCEPTABLE, INTERNAL_SERVER_ERROR];
};
