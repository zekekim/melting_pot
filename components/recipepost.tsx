"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FcLike } from "react-icons/fc";
import { LuPanelTopOpen } from "react-icons/lu";
import { Recipe } from "@/lib/types";

const IngredientPopover = ({ ingredients }: { ingredients: Array<string> }) => {
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
  return (
    <Popover open={isIngredientsOpen} onOpenChange={setIsIngredientsOpen}>
      <div className="flex items-center gap-2">
        <h1 className="font-medium">Ingredients</h1>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            <LuPanelTopOpen />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="space-y-1 w-40">
        {/* Ordered list not displaying numbers so I used this for now */}
        {ingredients.map((ingredient, index) => (
          <h3 key={index} className="text-sm">
            {index + 1}. {ingredient}
          </h3>
        ))}
      </PopoverContent>
    </Popover>
  );
};

const IngredientList = ({ ingredients }: { ingredients: Array<string> }) => {
  return (
    <div className="w-40 flex flex-col gap-4">
      <h2 className="font-semibold text-lg">Ingredients</h2>
      <hr />
      <div className="flex flex-col gap-2">
        {ingredients.map((ingredient, index) => (
          <h3 key={index} className="text-sm">
            {index + 1}. {ingredient}
          </h3>
        ))}
      </div>
    </div>
  );
};

interface RecipePostProps {
  recipe: Recipe;
  useIngredientPopover?: boolean;
}

const RecipePost = ({
  recipe,
  useIngredientPopover = true,
}: RecipePostProps) => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{recipe.name}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <div>
        <CardContent className="flex justify-evenly items-center gap-4">
          <Image
            src={recipe.imgUrl}
            width={150}
            height={150}
            alt="Recipe image"
            className="rounded-lg"
          />
          {!useIngredientPopover && (
            <IngredientList ingredients={recipe.ingredients} />
          )}
        </CardContent>
      </div>
      <CardFooter className="justify-between">
        <div className="flex gap-2 items-center">
          <FcLike />
          <h3 className="font-light text-sm">{recipe.likesCount}</h3>
        </div>
        {useIngredientPopover && (
          <IngredientPopover ingredients={recipe.ingredients} />
        )}
      </CardFooter>
    </Card>
  );
};

export default RecipePost;
