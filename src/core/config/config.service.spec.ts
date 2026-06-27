import { ConfigService as NestConfigService } from '@nestjs/config';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  it('returns app, db, and auth config sections', () => {
    const app = {
      appName: 'booking-engine',
      port: 4000,
      appUrl: 'http://localhost:4000',
      logLevel: 'info',
    };
    const db = {
      databaseUrl: 'postgresql://localhost/test',
    };
    const auth = {
      jwtSecret: 'secret',
    };

    const getOrThrow = jest.fn((key: string) => {
      const values = {
        app,
        db,
        auth,
      };

      return values[key as keyof typeof values];
    });

    const service = new ConfigService({
      getOrThrow,
    } as unknown as NestConfigService);

    expect(service.get()).toEqual({
      app,
      db,
      auth,
    });
    expect(getOrThrow).toHaveBeenNthCalledWith(1, 'app');
    expect(getOrThrow).toHaveBeenNthCalledWith(2, 'db');
    expect(getOrThrow).toHaveBeenNthCalledWith(3, 'auth');
  });
});
