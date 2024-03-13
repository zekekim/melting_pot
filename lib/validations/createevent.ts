import { z } from 'zod'
import { replySchema } from '@/lib/validations/createpost'


export const eventSchema = z.object({
    name: z.string().min(1, "Event name is required"), // Event name must be at least 1 character
    date: z.string().min(1, "Event date is required"), // Event date must be at least 1 character
    description: z.string().optional(), // Description is optional
  })

export const eventFormSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    location: z.string().min(2).max(50),
    date: z.string().min(2).max(50),
    time: z.string().min(2).max(50),
})



