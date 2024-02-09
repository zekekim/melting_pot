import { z } from "zod"

export const signInFormSchema = z.object({
    username: z.string().min(2).max(10),
    password: z.string().min(2).max(50)
})

