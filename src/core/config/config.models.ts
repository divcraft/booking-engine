import z from 'zod';

const logLevelSchema = z.union([z.literal('debug'), z.literal('info'), z.literal('warn'), z.literal('error')]);

export type LogLevelType = z.infer<typeof logLevelSchema>;

const appConfigSchema = z.object({
  appName: z.string().min(1),
  port: z.coerce.number().int().positive(),
  appUrl: z.url().refine((url) => url.startsWith('http://') || url.startsWith('https://'), {
    message: 'must start with http:// or https://',
  }),
  logLevel: logLevelSchema,
});

const dbConfigSchema = z.object({
  databaseUrl: z.string().startsWith('postgresql://'),
});

const authConfigSchema = z.object({
  jwtSecret: z.string().min(1),
});

export const configSchema = z.object({
  app: appConfigSchema,
  db: dbConfigSchema,
  auth: authConfigSchema,
});

export type ConfigType = z.infer<typeof configSchema>;
