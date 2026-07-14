import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupOpenApi } from '#core/openapi';
import { setupGlobalExceptionFilter } from '#core/errors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupOpenApi(app);
  setupGlobalExceptionFilter(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
