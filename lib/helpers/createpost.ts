'use server'
import { db } from '@/lib/db'
import { z } from 'zod'
import { postFormSchema, postSchema } from '@/lib/validations/createpost'
import { validateRequest } from '../auth'

export async function createPost(values: z.infer<typeof postFormSchema>) {


    try {
        const user = await validateRequest()
        if (!user) {
            throw Error("no user")
        }
        await db.post.create({
            data:
            {
                userId: user.user!.id,
                recipe: {
                    create: {
                        title: values.title,
                        ingredients: {
                            createMany: {
                                data: values.ingredients
                            }
                        },
                        body: values.body
                    }
                },
            }
        })
    } catch (e) {
    }
}

