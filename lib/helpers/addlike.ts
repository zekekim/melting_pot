'use server'
import { db } from '@/lib/db'
import { z } from 'zod'
import { postFormSchema } from '@/lib/validations/createpost'
import { validateRequest } from '@/lib/auth'
import { likeSchema } from '@/lib/validations/createlike'

export async function addLike(values: z.infer<typeof likeSchema>) {
    try {
        const {user} = await validateRequest()
        if (!user) {
            throw Error("no user")
        }
        await db.like.create({
            data: {
                userId: user.id,
                postId: values.postId,
            }
        })
    } catch (e) {
        console.log(e)
    }
}

export async function removeLike(values: z.infer<typeof likeSchema>) {
    try {
        const {user} = await validateRequest()
        if (!user) {
            throw Error("no user")
        }
        await db.like.delete({
            where: {
                userId_postId: {
                    userId: user.id,
                    postId: values.postId
                }
            }
        })
    } catch (e) {
        console.log(e)
    }
}
