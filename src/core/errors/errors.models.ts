import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { HttpException, Type } from '@nestjs/common';

// BAD_REQUEST

export const badRequestErrorSchema = z.object({
  status: z.literal(400),
  code: z.literal('BAD_REQUEST'),
  message: z.string(),
});

export class BadRequestErrorDto extends createZodDto(badRequestErrorSchema) {}

// NOT_ACCEPTABLE

export const notAcceptableSchema = z.object({
  status: z.literal(406),
  code: z.literal('NOT_ACCEPTABLE'),
  message: z.string(),
  details: z.array(
    z.object({
      path: z.string(),
      message: z.string(),
    }),
  ),
});

export class NotAcceptableDto extends createZodDto(notAcceptableSchema) {}

// UNAUTHORIZED

export const unauthorizedErrorSchema = z.object({
  status: z.literal(401),
  code: z.literal('UNAUTHORIZED'),
  message: z.string(),
});

export class UnauthorizedErrorDto extends createZodDto(unauthorizedErrorSchema) {}

// FORBIDDEN

export const forbiddenErrorSchema = z.object({
  status: z.literal(403),
  code: z.literal('FORBIDDEN'),
  message: z.string(),
});

export class ForbiddenErrorDto extends createZodDto(forbiddenErrorSchema) {}

// NOT_FOUND

export const notFoundErrorSchema = z.object({
  status: z.literal(404),
  code: z.literal('NOT_FOUND'),
  message: z.string(),
});

export class NotFoundErrorDto extends createZodDto(notFoundErrorSchema) {}

// CONFLICT

export const conflictErrorSchema = z.object({
  status: z.literal(409),
  code: z.literal('CONFLICT'),
  message: z.string(),
});

export class ConflictErrorDto extends createZodDto(conflictErrorSchema) {}

// INTERNAL_SERVER_ERROR

export const internalServerErrorSchema = z.object({
  status: z.literal(500),
  code: z.literal('INTERNAL_SERVER_ERROR'),
  message: z.string(),
});

export type InternalServerErrorType = z.infer<typeof internalServerErrorSchema>;

export class InternalServerErrorDto extends createZodDto(internalServerErrorSchema) {}

// APPLICATION_NOT_READY

export const applicationNotReadyErrorSchema = z.object({
  status: z.literal(503),
  code: z.literal('APPLICATION_NOT_READY'),
  message: z.string(),
  dependencies: z.object({
    database: z.enum(['ok', 'error']),
  }),
  timestamp: z.iso.datetime(),
});

export class ApplicationNotReadyErrorDto extends createZodDto(applicationNotReadyErrorSchema) {}

// Error codes and definitions

export type ErrorResponseDto =
  | BadRequestErrorDto
  | NotAcceptableDto
  | UnauthorizedErrorDto
  | ForbiddenErrorDto
  | NotFoundErrorDto
  | ConflictErrorDto
  | InternalServerErrorDto
  | ApplicationNotReadyErrorDto;

export const responseCodeSchema = z.enum([
  'BAD_REQUEST',
  'NOT_ACCEPTABLE',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'NOT_FOUND',
  'CONFLICT',
  'INTERNAL_SERVER_ERROR',
  'APPLICATION_NOT_READY',
]);

export type ResponseCodeType = z.infer<typeof responseCodeSchema>;

export type ErrorDefinitionMapType = Record<ResponseCodeType, ErrorDefinitionType>;

export interface ErrorDefinitionType {
  status: number;
  description: string;
  code: ResponseCodeType;
  dto: Type<ErrorResponseDto>;
  schema: z.ZodType;
  default: (message?: string) => ErrorResponseDto;
  exception: Type<HttpException>;
}
