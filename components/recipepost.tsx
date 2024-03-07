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
import Link from "next/link";
import {
  FcComments,
  FcEmptyTrash,
} from "react-icons/fc";
import { LuPanelTopOpen } from "react-icons/lu";
import { Ingredient } from "@prisma/client";
import { PostWithRecipe } from "@/lib/types";
import LikeButton from "./likebutton";
import { twMerge } from "tailwind-merge";
import { deletePost } from "@/lib/helpers/deletepost"

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
  userId: string;
  className?: string;
}

const RecipePost = ({
  post,
  useIngredientPopover = true,
  userId,
  className = "",
}: RecipePostProps) => {
  return (
    <Card className={twMerge("flex flex-col justify-between", className)}>
      <CardHeader>
        <CardTitle>{post.recipe!.title}</CardTitle>
        <CardDescription>{post.recipe!.body}</CardDescription>
      </CardHeader>
      <div>
        <CardContent className="flex justify-evenly items-center gap-4">
          {!useIngredientPopover && (
            <IngredientList ingredients={post.recipe!.ingredients} />
          )}
        </CardContent>
      </div>
      <CardFooter className="flex flex-row justify-start gap-7">
        <LikeButton userId={userId} postId={post.id} likes={post.likes} />
        <Link href={`/posts/${post.id}`}>
          <button className="flex gap-2 items-center">
            <FcComments />
            <h3 className="font-light text-sm">{post.replies.length}</h3>
          </button>
        </Link>

        {useIngredientPopover && (
          <IngredientPopover ingredients={post.recipe!.ingredients} />
        )}
        <button onClick={() => deletePost({
              postId: post.id,
              userId: userId
            })}>
          <FcEmptyTrash />
        </button>
      </CardFooter>
    </Card>
  );
};

export default RecipePost;
