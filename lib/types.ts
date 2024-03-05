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
export type RecipeWithIngredients = Prisma.RecipeGetPayload<{
    include: { ingredients: true }
}>

