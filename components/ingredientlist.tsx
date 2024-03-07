"use client";

import { useOptimistic, useState } from "react";
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
import { FcComments, FcLike, FcLikePlaceholder } from "react-icons/fc";
import { LuPanelTopOpen } from "react-icons/lu";
import { addLike, removeLike } from "@/lib/helpers/addlike";
import { likeSchema } from "@/lib/validations/createlike";
import { Ingredient, Recipe } from "@prisma/client";
import { PostWithRecipe } from "@/lib/types";

export const IngredientPopover = ({
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

export const IngredientList = ({
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


