import { Module } from '@nestjs/common';
import { ConfigModule } from '#core/config';
import { DatabaseModule } from '#core/database';
import { HealthModule } from '#core/health';

@Module({
  imports: [ConfigModule, DatabaseModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
