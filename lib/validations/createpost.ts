import { z } from 'zod'

export const ingredientSchema = z.object({
    name: z.string(),
    quantity: z.coerce.number(),
    unit: z.string()
})

export const postFormSchema = z.object({
    title: z.string().min(2).max(50),
    ingredients: z.array(ingredientSchema),
    body: z.string().min(2)
})

export const replySchema = z.object({
    owner: z.string(),
    body: z.string()
})

export const postSchema = z.object({
    post: postFormSchema,
    body: z.string(),
    likes: z.number(),
    replies: z.array(replySchema)
})




