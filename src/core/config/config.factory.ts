import { ZodError } from 'zod';
import { configSchema, ConfigType, LogLevelType } from './config.schema';

export const config = (): ConfigType => {
  const rawConfig: ConfigType = {
    app: {
      appName: process.env.APP_NAME as string,
      port: Number(process.env.PORT) || 3000,
      appUrl: process.env.APP_URL as string,
      logLevel: (process.env.LOG_LEVEL as LogLevelType) || 'debug',
    },
    db: {
      databaseUrl: process.env.DATABASE_URL as string,
    },
    auth: {
      jwtSecret: process.env.JWT_SECRET as string,
    },
  };
  try {
    return configSchema.parse(rawConfig);
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues
        .map((issue) => {
          const path = issue.path.join('.');

          return `- ${path}: ${issue.message}`;
        })
        .join('\n');

      throw new Error(
        ['Invalid application configuration.', '', 'Fix the following environment variables:', formattedErrors].join(
          '\n',
        ),
      );
    }

    throw error;
  }
};
