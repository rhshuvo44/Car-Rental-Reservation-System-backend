import { z } from 'zod'

export const CarSchemaZod = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    description: z.string().optional(),
    color: z.string({
      required_error: 'Color is required',
      invalid_type_error: 'Color must be a string',
    }),
    isElectric: z.boolean(),
    status: z.enum(['available', 'unavailable']).default('available'),
    features: z.array(z.string()).optional(),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number'),
    isDeleted: z.boolean().default(false),
  }),
})
export const CarUpdateSchemaZod = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be a string',
    }).optional(),
    description: z.string().optional(),
    color: z.string({
      invalid_type_error: 'Color must be a string',
    }).optional(),
    isElectric: z.boolean().optional(),
    status: z.enum(['available', 'unavailable']).default('available'),
    features: z.array(z.string()).optional(),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number').optional(),
    isDeleted: z.boolean().default(false),
  }),
})
