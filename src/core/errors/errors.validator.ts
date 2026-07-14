import { ERRORS } from './errors.factory';
import { ErrorResponseDto } from './errors.models';

export class ErrorValidator {
  static validate(status: number, body: unknown): ErrorResponseDto {
    const errorDef = Object.values(ERRORS).find((e) => e.status === status) ?? null;

    if (errorDef === null) {
      console.log('DTO not found, returning 500');
      return new ERRORS.INTERNAL_SERVER_ERROR.exception(`Internal server error - converted from status ${status}`).body;
    }

    const result = errorDef.schema.safeParse(body);

    if (result.success) {
      console.log('Body fitting DTO');
      return result.data;
    } else {
      console.log('Body not fitting DTO');
      const message =
        typeof body === 'object' && body !== null && 'message' in body && typeof body.message === 'string'
          ? body.message
          : undefined;
      return errorDef.default(message);
    }
  }
}
