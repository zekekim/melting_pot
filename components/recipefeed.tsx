import RecipePost from "@/components/recipepost";
import { twMerge } from "tailwind-merge";

import { PostWithRecipe } from "@/lib/types";
import { validateRequest } from "@/lib/auth";

interface RecipeFeedProps {
    className?: string;
    posts: PostWithRecipe[];
    userId: string;
}

const RecipeFeed = ({ className = "", posts, userId }: RecipeFeedProps) =>
{
    return (
        <div className={twMerge("flex flex-col gap-8", className)}>
            {posts.map((post, index) => (
                <RecipePost key={index} post={post} userId={userId} useIngredientPopover={false} />
            ))}
        </div>
    );
};

export default RecipeFeed;
