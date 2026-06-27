import { config } from './config.factory';

const ORIGINAL_ENV = process.env;

const validEnv = {
  APP_NAME: 'booking-engine',
  PORT: '4000',
  APP_URL: 'http://localhost:4000',
  LOG_LEVEL: 'info',
  DATABASE_URL: 'postgresql://localhost/test',
  JWT_SECRET: 'secret',
};

describe('config factory', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV, ...validEnv };
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  it('returns validated application config from environment variables', () => {
    expect(config()).toEqual({
      app: {
        appName: 'booking-engine',
        port: 4000,
        appUrl: 'http://localhost:4000',
        logLevel: 'info',
      },
      db: {
        databaseUrl: 'postgresql://localhost/test',
      },
      auth: {
        jwtSecret: 'secret',
      },
    });
  });

  it('uses defaults for optional environment variables', () => {
    delete process.env.PORT;
    delete process.env.LOG_LEVEL;

    expect(config()).toMatchObject({
      app: {
        port: 3000,
        logLevel: 'debug',
      },
    });
  });

  it('throws a formatted error when environment variables are invalid', () => {
    process.env.APP_URL = 'localhost:4000';
    process.env.DATABASE_URL = 'mysql://localhost/test';
    process.env.LOG_LEVEL = 'trace';
    delete process.env.JWT_SECRET;

    expect(() => config()).toThrow(
      [
        'Invalid application configuration.',
        '',
        'Fix the following environment variables:',
        '- app.appUrl: must start with http:// or https://',
        '- app.logLevel: Invalid input',
        '- db.databaseUrl: Invalid string: must start with "postgresql://"',
        '- auth.jwtSecret: Invalid input: expected string, received undefined',
      ].join('\n'),
    );
  });
});
