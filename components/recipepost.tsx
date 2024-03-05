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
import { Ingredient, Like, Recipe } from "@prisma/client";
import { PostWithRecipe } from "@/lib/types";
import { randomUUID } from "crypto";
import { addLike, removeLike } from "@/lib/helpers/addlike";
import { likeSchema } from "@/lib/validations/createlike";

const IngredientPopover = ({ ingredients }: { ingredients: Array<Ingredient> }) => {
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

const IngredientList = ({ ingredients }: { ingredients: Array<Ingredient> }) => {
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
    userId: String
}

const RecipePost = ({
    post,
    useIngredientPopover = true,
    userId
}: RecipePostProps) => {

    const [optimisticPost, changeOptimisticPost] = useOptimistic(
        post,
        (state, addOptimistic: boolean) => {
            if (addOptimistic) {
                return {
                    id: state.id,
                    recipe: state.recipe,
                    userId: state.userId,
                    likes: [...state.likes, { userId: userId, postId: post.id } as Like],
                    replies: state.replies,
                    createdAt: state.createdAt,
                    updatedAt: state.updatedAt

                }
            }
            return {
                id: state.id,
                recipe: state.recipe,
                userId: state.userId,
                likes: state.likes.filter((like) => like.userId !== userId),
                replies: state.replies,
                createdAt: state.createdAt,
                updatedAt: state.updatedAt

            }
        }
    );

    async function addOptimisticLike() {
        if (optimisticPost.likes.some((like) => like.userId === userId)) {
            changeOptimisticPost(false)
            const values = { postId: post.id }
            await addLike(values);
        }
        else {
            changeOptimisticPost(true)
            const values = { postId: post.id }
            await removeLike(values);
        }
    }



    return (
        <Card className="h-full flex flex-col justify-between">
            <CardHeader>
                <CardTitle>{post.recipe!.title}</CardTitle>
                <CardDescription>{post.recipe!.body}</CardDescription>
            </CardHeader>
            <div>
                <CardContent className="flex justify-evenly items-center gap-4">
                    {/**
          <Image
            src={}
            width={150}
            height={150}
            alt="Recipe image"
            className="rounded-lg"
          />
e                   **/}
                    {!useIngredientPopover && (
                        <IngredientList ingredients={post.recipe!.ingredients} />
                    )}
                </CardContent>
            </div>
            <CardFooter className="flex flex-row justify-start gap-7">
                <button className="flex gap-2 items-center" onClick={() => { addOptimisticLike() }}>
                    {optimisticPost.likes.some((like) => like.userId === userId) ?
                        <FcLike />
                        :
                        <FcLikePlaceholder />
                    }
                    <h3 className="font-light text-sm">{optimisticPost.likes.length}</h3>
                </button>
                <button className="flex gap-2 items-center">
                    <FcComments />
                    <h3 className="font-light text-sm">{post.replies.length}</h3>
                </button>

                {useIngredientPopover && (
                    <IngredientPopover ingredients={post.recipe!.ingredients} />
                )}
            </CardFooter>
        </Card>
    );
};

export default RecipePost;
