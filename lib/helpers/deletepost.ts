'use server'
import { db } from '@/lib/db'
import { z } from 'zod'
import { deletePostSchema } from '@/lib/validations/deletepost'
import { validateRequest } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function deletePost({postId, userId}: z.infer<typeof deletePostSchema>) {
    try {
        const user = await validateRequest()
        if (!user) {
            throw Error("no user")
        }
        if (user.user?.id !== userId){
            throw Error("not user's post")
        }
        await db.post.delete({
            where: {
                id: postId,
                userId: userId
            }
        })
    } catch (e) {
        throw Error("ERROR Deleting post: " + e)
        console.log(e)
    }
    revalidatePath('/')
    revalidatePath('/myrecipes')
}
