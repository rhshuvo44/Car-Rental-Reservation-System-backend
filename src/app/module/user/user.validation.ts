import { z } from 'zod';

// Define the Zod schema for user validation
export const UserSchemaZod = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    email: z.string().email("Invalid email address"),
    role: z.enum(['user', 'admin']),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string({
        required_error: "Phone number is required",
    }),
    address: z.string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string",
    }),
});