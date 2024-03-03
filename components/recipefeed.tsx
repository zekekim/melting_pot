import { Recipe } from "@/lib/types";
import RecipePost from "@/components/recipepost";
import { twMerge } from "tailwind-merge";

interface RecipeFeedProps {
  className?: string;
  recipes: Array<Recipe>;
}

const RecipeFeed = ({ className = "", recipes }: RecipeFeedProps) => {
  return (
    <div className={twMerge("flex flex-col gap-8", className)}>
      {recipes.map((recipe, index) => (
        <RecipePost key={index} recipe={recipe} useIngredientPopover={false} />
      ))}
    </div>
  );
};

export default RecipeFeed;
