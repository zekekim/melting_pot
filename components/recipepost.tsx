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
import { Ingredient, Recipe } from "@prisma/client";
import { PostWithRecipe } from "@/lib/types";

const IngredientPopover = ({
  ingredients,
}: {
  ingredients: Array<Ingredient>;
}) => {
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
            {index + 1}. {ingredient.name}
          </h3>
        ))}
      </PopoverContent>
    </Popover>
  );
};

const IngredientList = ({
  ingredients,
}: {
  ingredients: Array<Ingredient>;
}) => {
  return (
    <div className="w-40 flex flex-col gap-4">
      <h2 className="font-semibold text-lg">Ingredients</h2>
      <hr />
      <div className="flex flex-col gap-2">
        {ingredients.map((ingredient, index) => (
          <h3 key={index} className="text-sm">
            {index + 1}. {ingredient.name}
          </h3>
        ))}
      </div>
    </div>
  );
};

interface RecipePostProps {
  post: PostWithRecipe;
  useIngredientPopover?: boolean;
}

const RecipePost = ({ post, useIngredientPopover = true }: RecipePostProps) => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{post.recipe!.title}</CardTitle>
        <CardDescription>{post.recipe!.body}</CardDescription>
      </CardHeader>
      <div>
        <CardContent className="flex items-center gap-4">
          {/**
          <Image
            src={}
            width={150}
            height={150}
            alt="Recipe image"
            className="rounded-lg"
          />
                    **/}
          {!useIngredientPopover && (
            <IngredientList ingredients={post.recipe!.ingredients} />
          )}
        </CardContent>
      </div>
      <CardFooter className="justify-between">
        <div className="flex gap-2 items-center">
          <FcLike />
          <h3 className="font-light text-sm">{post.likes.length}</h3>
        </div>
        {useIngredientPopover && (
          <IngredientPopover ingredients={post.recipe!.ingredients} />
        )}
      </CardFooter>
    </Card>
  );
};

export default RecipePost;
