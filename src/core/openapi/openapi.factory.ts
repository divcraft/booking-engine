import { INestApplication } from '@nestjs/common';
import { ApiResponseOptions, DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { getDefaultErrors } from '#core/errors';

export const setupOpenApi = (app: INestApplication): void => {
  const defaultErrors: Array<ApiResponseOptions> = getDefaultErrors().map((e) => ({
    status: e.status,
    description: e.description,
    type: e.dto,
  }));

  const documentConfig = new DocumentBuilder()
    .setTitle('Booking Engine')
    .setDescription('API for managing the booking operations')
    .setVersion('1.0')
    .addTag('Booking', 'Booking API specification')
    .addBearerAuth()
    .addGlobalResponse(...defaultErrors)
    .build();

  const documentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
  };

  const documentFactory = SwaggerModule.createDocument(app, documentConfig, documentOptions);
  SwaggerModule.setup('openapi', app, cleanupOpenApiDoc(documentFactory));
};
