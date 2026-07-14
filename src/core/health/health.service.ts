import { Injectable } from '@nestjs/common';
import { DatabaseService } from '#core/database';
import { HealthLiveOutputDto, HealthReadyOutputDto } from './health.models';
import { ERRORS } from '#core/errors';

@Injectable()
export class HealthService {
  constructor(private readonly db: DatabaseService) {}

  live(): HealthLiveOutputDto {
    return {
      status: 'ok',
      service: 'booking-engine',
      timestamp: new Date().toISOString(),
    };
  }

  async ready(): Promise<HealthReadyOutputDto> {
    try {
      await this.db.$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
      };
    } catch {
      throw new ERRORS.APPLICATION_NOT_READY.exception({
        database: 'error',
      });
    }
  }
}
