import { z } from 'zod'

export const deletePostSchema = z.object({
    postId: z.string(),
    userId: z.string()
})

export const deleteEventSchema = z.object({
    eventId: z.string(),
    userId: z.string()
})
