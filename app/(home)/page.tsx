import { PostWithRecipe } from "@/lib/types";
import RecipeFeed from "@/components/recipefeed";
import { getPosts } from "@/lib/helpers/getposts";

export default async function Home() {
  const recipes: Array<PostWithRecipe> = await getPosts();

  return (
    <div className="grid grid-cols-4 gap-20">
      <div className="flex flex-col col-span-3 ">
        <RecipeFeed posts={recipes} />
      </div>
      <div>
        {/* For recommmended events */}
        <h1>Recommended Events</h1>
      </div>
    </div>
  );
}
