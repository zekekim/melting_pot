import { validateRequest } from "@/lib/auth"
import { PostWithRecipeAndComments } from "@/lib/types"
import { db } from "@/lib/db"
export async function getPost(postId: string): Promise<PostWithRecipeAndComments|null> {
    try {
        const user = await validateRequest()
        if (!user || user.user === null) {
            throw Error("no user")
        }
        const posts: (PostWithRecipeAndComments | null) = await db.post.findUnique(
            {
                where: {
                    id: postId,
                },
                include: {
                    recipe: {
                        include:
                            { ingredients: true }
                    },
                    likes: true,
                    replies: {
                        include: {
                            user: true
                        }
                    }
                }
            })
        if (posts !== null) {
            return posts
        }

    } catch (e) {
    }
    return null
}

