import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { PostWithRecipe } from "@/lib/types";
import RecipePost from "./recipepost";

interface TopRecipesProps {
  className?: string;
  userId: string;
  top_five: PostWithRecipe[];
}

const TopRecipes = ({ className, top_five, userId }: TopRecipesProps) => {
  // const topRecipes: Array<PostWithRecipe> = await getTopPosts(); // TODO - Test array to be filled with top recipes
  

  return (
    <Carousel className={className}>
      <CarouselContent>
        {top_five.map((post, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <RecipePost post={post} userId={userId} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default TopRecipes;
