import { PostWithRecipe } from "@/lib/types";
import RecipeFeed from "@/components/recipefeed";
import { getPosts } from "@/lib/helpers/getposts";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import EventsFeed from "@/components/eventsfeed";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/signup");
  }
  const recipes: Array<PostWithRecipe> = await getPosts();

  return (
    <div className="grid grid-cols-4 gap-20">
      <div className="flex flex-col col-span-3 ">
        <RecipeFeed posts={recipes} userId={user.id} />
      </div>
      <div>
        {/* For recommmended events */}
        <h1>Recommended Events</h1>
        <div className="flex flex-col col-span-4">
          <EventsFeed events={[]} userId={user.id} />
        </div>
      </div>
    </div>
  );
}
