import { z } from 'zod';

const healthStatusSchema = z.enum(['ok', 'error']);

export const liveHealthResSchema = z.object({
  status: healthStatusSchema,
  service: z.literal('booking-engine'),
  timestamp: z.iso.datetime(),
});

export const readyHealthResSchema = z.object({
  status: healthStatusSchema,
  dependencies: z.object({
    database: healthStatusSchema,
  }),
  timestamp: z.iso.datetime(),
});

export type HealthLiveResType = z.infer<typeof liveHealthResSchema>;
export type HealthReadyResType = z.infer<typeof readyHealthResSchema>;
