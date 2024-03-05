'use server'
import { db } from '@/lib/db'
import { z } from 'zod'
import { postFormSchema } from '@/lib/validations/createpost'
import { validateRequest } from '@/lib/auth'
import { commentSchema } from '@/lib/validations/createcomment'

export async function createComment(values: z.infer<typeof commentSchema>) {
    try {
        const user = await validateRequest()
        if (!user) {
            throw Error("no user")
        }
        await db.reply.create({
            data: {
                userId: user.user!.id,
                postId: values.postId,
                body: values.body
            }
        })
    } catch (e) {
        console.log(e)
    }
}

