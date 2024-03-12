import { Prisma } from "@prisma/client";

export interface Recipe {
    name: string;
    description: string;
    imgUrl: string;
    ingredients: Array<string>;
    likesCount: number;
}
export type PostWithRecipe = Prisma.PostGetPayload<{
    include: { recipe: { include: { ingredients: true } }, likes: true, replies: true }
}>
export type PostWithRecipeAndComments = Prisma.PostGetPayload<{
    include: { recipe: { include: { ingredients: true } }, likes: true, replies: { include: { user: true } } }
}>
export type RecipeWithIngredients = Prisma.RecipeGetPayload<{
    include: { ingredients: true }
}>

export type ReplyWithUser = Prisma.ReplyGetPayload<{
    include: { user: true }
}>

export interface Event {
    name: string;
    description: string;
    imgUrl: string;
    date: Date;
    likesCount: number;
}