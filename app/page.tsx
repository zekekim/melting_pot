import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import SignOutButton from "@/components/signoutbutton";
import RecipeForm from "@/components/createpost";
import Header from "@/components/header";
import { Recipe } from "@/lib/types";
import RecipeFeed from "@/components/recipefeed";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/signup");
  }

  const recipes: Array<Recipe> = [
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
    <div className="h-dvh">
      <Header />
      <div className="px-32 py-8 grid grid-cols-4 gap-20">
        <div className="flex flex-col col-span-3 ">
          <RecipeFeed recipes={recipes} />
        </div>
        <div>
          {/* For recommmended events */}
          <h1>Recommended Events</h1>
        </div>
      </div>
    </div>
  );
}
