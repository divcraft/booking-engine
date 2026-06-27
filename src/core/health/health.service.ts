import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseService } from '#core/database';
import { HealthLiveResType, HealthReadyResType } from './health.schema';

@Injectable()
export class HealthService {
  constructor(private readonly db: DatabaseService) {}

  live(): HealthLiveResType {
    return {
      status: 'ok',
      service: 'booking-engine',
      timestamp: new Date().toISOString(),
    };
  }

  async ready(): Promise<HealthReadyResType> {
    try {
      await this.db.$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        dependencies: {
          database: 'ok',
        },
        timestamp: new Date().toISOString(),
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        dependencies: {
          database: 'error',
        },
        timestamp: new Date().toISOString(),
      });
    }
  }
}
