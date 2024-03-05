import { z } from 'zod'

export const commentSchema = z.object({
    postId: z.string(),
    body: z.string()
})
