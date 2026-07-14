import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

// live

export const liveHealthOutputSchema = z.object({
  status: z.literal('ok'),
  service: z.literal('booking-engine'),
  timestamp: z.iso.datetime(),
});

export class HealthLiveOutputDto extends createZodDto(liveHealthOutputSchema) {}

// ready

export const readyHealthOutputSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.iso.datetime(),
});

export class HealthReadyOutputDto extends createZodDto(readyHealthOutputSchema) {}
