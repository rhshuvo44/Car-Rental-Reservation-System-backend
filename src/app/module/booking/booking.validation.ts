import { z } from 'zod'
// const timeSchema = z.string().refine(
//   (time) => {
//     const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
//     return regex.test(time);
//   },
//   {
//     message: 'Invalid time format , expected "HH:MM" in 24 hours format',
//   },
// );
export const BookingSchemaZod = z.object({
  body: z
    .object({
      // date: z.date(),
      // date: z.string(),
      // user: z.string(),
      // car: z.string(),
      // startTime: z
      //   .string()
      //   .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid start time format'),
      // endTime: z
      //   .string().optional()
      // ,
      // totalCost: z.number().default(0),
      carId: z.string(),
      date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD.'),
      startTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid start time format'),
      endTime: z.string().optional(),
      totalCost: z.number().optional().default(0),
    })
    .refine((data) => !data.endTime || data.endTime > data.startTime, {
      message: 'End time must be after start time',
      path: ['endTime'],
    }),
})
