import { z } from 'zod'

export const BookingSchemaZod = z.object({
  body: z.object({
    // date: z.date(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD.'),
    user: z.string(),
    car: z.string(),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Invalid start time format'),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Invalid end time format'),
    totalCost: z.number().default(0),
  }),
})
