'use server'
import { db } from '@/lib/db'
import { validateRequest } from '@/lib/auth'
import { PostWithRecipe } from '@/lib/types'

export async function getPosts(): Promise<PostWithRecipe[]> {
    try {
        const user = await validateRequest()
        if (!user) {
            throw Error("no user")
        }
        const posts: PostWithRecipe[] = await db.post.findMany(
            {
                include: {
                    recipe: {
                        include:
                            { ingredients: true }
                    },
                    likes: true,
                    replies: true
                }
            })
        return posts

    } catch (e) {
    }
    return []
}

export async function getUserPosts(): Promise<PostWithRecipe[]> {
    try {
        const user = await validateRequest()
        if (!user || user.user === null) {
            throw Error("no user")
        }
        const posts: PostWithRecipe[] = await db.post.findMany(
            {
                where: {
                    user: user.user,
                },
                include: {
                    recipe: {
                        include:
                            { ingredients: true }
                    },
                    likes: true,
                    replies: true
                }
            })
        return posts

    } catch (e) {
    }
    return []
}

