import RecipePost from "@/components/recipepost";
import { twMerge } from "tailwind-merge";

import { PostWithRecipe } from "@/lib/types";

interface RecipeFeedProps {
    className?: string;
    posts: PostWithRecipe[];
}

const RecipeFeed = ({ className = "", posts }: RecipeFeedProps) => {
    return (
        <div className={twMerge("flex flex-col gap-8", className)}>
            {posts.map((post, index) => (
                <RecipePost key={index} post={post} useIngredientPopover={false} />
            ))}
        </div>
    );
};

export default RecipeFeed;
