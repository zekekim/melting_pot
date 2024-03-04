import { twMerge } from "tailwind-merge";
import RecipePost from "./recipepost";
import { Recipe } from "@/lib/types";

interface UserPostsProps {
  className?: string;
}

const UserPosts = ({ className = "" }: UserPostsProps) => {
  const userPosts: Array<Recipe> = [
    {
      name: "Chicken Soup",
      description: "it is chicken soup from de neve",
      ingredients: ["Chicken", "Soup", "Carrots", "Salt", "Pepper"],
      likesCount: 21,
      imgUrl: "/static/images/chicken-soup.jpeg",
    },
    {
      name: "Chicken Alfredo",
      description: "it is chicken alfredo from epicuria at ackerman",
      ingredients: [
        "Chicken",
        "Cream",
        "Carrots",
        "Salt",
        "Pepper",
        "Will's love",
      ],
      likesCount: 7,
      imgUrl: "/static/images/chicken-alfredo.jpeg",
    },
    {
      name: "Chicken Alfredo",
      description: "it is chicken alfredo from epicuria at ackerman",
      ingredients: [
        "Chicken",
        "Cream",
        "Carrots",
        "Salt",
        "Pepper",
        "Will's love",
      ],
      likesCount: 7,
      imgUrl: "/static/images/chicken-alfredo.jpeg",
    },
    {
      name: "Chicken Alfredo",
      description: "it is chicken alfredo from epicuria at ackerman",
      ingredients: [
        "Chicken",
        "Cream",
        "Carrots",
        "Salt",
        "Pepper",
        "Will's love",
      ],
      likesCount: 7,
      imgUrl: "/static/images/chicken-alfredo.jpeg",
    },
    {
      name: "Chicken Alfredo",
      description: "it is chicken alfredo from epicuria at ackerman",
      ingredients: [
        "Chicken",
        "Cream",
        "Carrots",
        "Salt",
        "Pepper",
        "Will's love",
      ],
      likesCount: 7,
      imgUrl: "/static/images/chicken-alfredo.jpeg",
    },
    {
      name: "Chicken Alfredo",
      description: "it is chicken alfredo from epicuria at ackerman",
      ingredients: [
        "Chicken",
        "Cream",
        "Carrots",
        "Salt",
        "Pepper",
        "Will's love",
      ],
      likesCount: 7,
      imgUrl: "/static/images/chicken-alfredo.jpeg",
    },
    {
      name: "Chicken Alfredo",
      description: "it is chicken alfredo from epicuria at ackerman",
      ingredients: [
        "Chicken",
        "Cream",
        "Carrots",
        "Salt",
        "Pepper",
        "Will's love",
      ],
      likesCount: 7,
      imgUrl: "/static/images/chicken-alfredo.jpeg",
    },
    {
      name: "Chicken Alfredo",
      description: "it is chicken alfredo from epicuria at ackerman",
      ingredients: [
        "Chicken",
        "Cream",
        "Carrots",
        "Salt",
        "Pepper",
        "Will's love",
      ],
      likesCount: 7,
      imgUrl: "/static/images/chicken-alfredo.jpeg",
    },
    {
      name: "Chicken Alfredo",
      description: "it is chicken alfredo from epicuria at ackerman",
      ingredients: [
        "Chicken",
        "Cream",
        "Carrots",
        "Salt",
        "Pepper",
        "Will's love",
      ],
      likesCount: 7,
      imgUrl: "/static/images/chicken-alfredo.jpeg",
    },
  ];

  return (
    <div className={twMerge("grid grid-cols-3 gap-6", className)}>
      {userPosts.map((post, index) => (
        <div className="p-1" key={index}>
          <RecipePost recipe={post} />
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
