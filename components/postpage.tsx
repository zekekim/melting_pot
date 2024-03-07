import { getPost } from "@/lib/helpers/getpost";
import RecipePost from "./recipepost";
import { validateRequest } from "@/lib/auth";
import { CommentSection } from "./comments";
import { PostWithRecipe, PostWithRecipeAndComments } from "@/lib/types";

export default async function PostPage({ postId }: { postId: string }) {
    const { user } = await validateRequest()
    if (!user) {
        return <div></div>
    }
    const post: PostWithRecipeAndComments | null = await getPost(postId)
    if (!post) {
        return <div></div>
    }

    return (<div className='flex flex-row gap-4 w-full justify-center items-center'>
        <RecipePost userId={user.id} post={post!} />
        <CommentSection userId={user.id} user={user} post={post!} />
    </div>)

}
