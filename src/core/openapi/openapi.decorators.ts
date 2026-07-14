import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { ERRORS } from '#core/errors';

interface PropsType {
  type?: Type<unknown>;
  description?: string;
}

// success

export const OpenApiOkResponse = (props?: PropsType) =>
  applyDecorators(
    ApiOkResponse({
      description: props?.description ?? 'Request processed successfully',
      type: props?.type,
    }),
  );

export const OpenApiCreatedResponse = (props?: PropsType) =>
  applyDecorators(
    ApiCreatedResponse({
      description: props?.description ?? 'Created successfully',
      type: props?.type,
    }),
  );

// errors

export const OpenApiUnauthorizedResponse = () => {
  const { UNAUTHORIZED } = ERRORS;
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: UNAUTHORIZED.description,
      type: UNAUTHORIZED.dto,
    }),
    ApiBearerAuth(),
  );
};

export const OpenApiForbiddenResponse = () => {
  const { FORBIDDEN } = ERRORS;
  return applyDecorators(
    ApiForbiddenResponse({
      description: FORBIDDEN.description,
      type: FORBIDDEN.dto,
    }),
    ApiBearerAuth(),
  );
};

export const OpenApiNotFoundResponse = () => {
  const { NOT_FOUND } = ERRORS;
  return applyDecorators(
    ApiNotFoundResponse({
      description: NOT_FOUND.description,
      type: NOT_FOUND.dto,
    }),
  );
};

export const OpenApiConflictResponse = () => {
  const { CONFLICT } = ERRORS;
  return applyDecorators(
    ApiConflictResponse({
      description: CONFLICT.description,
      type: CONFLICT.dto,
    }),
  );
};

export const OpenApiApplicationNotReady = () => {
  const { APPLICATION_NOT_READY } = ERRORS;
  return applyDecorators(
    ApiServiceUnavailableResponse({
      description: APPLICATION_NOT_READY.description,
      type: APPLICATION_NOT_READY.dto,
    }),
  );
};
