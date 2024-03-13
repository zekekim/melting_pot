import { PostWithRecipe } from "@/lib/types";
import { Event } from '@prisma/client';
import RecipeFeed from "@/components/recipefeed";
import { getPosts } from "@/lib/helpers/getposts";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import EventsFeed from "@/components/eventsfeed";
import { getEvents } from "@/lib/helpers/getevent";

export default async function Home() {
    const { user } = await validateRequest();
    if (!user) {
        return redirect("/signup");
    }
    const recipes: Array<PostWithRecipe> = await getPosts();
    const events: Array<Event> = await getEvents();

    return (
        <div className="grid grid-cols-4 gap-20">
            <div className="flex flex-col col-span-3 ">
                <RecipeFeed posts={recipes} userId={user.id} />
            </div>
            <div>
                {/* For recommmended events */}
                <h1>Recommended Events</h1>
                <div className="flex flex-col col-span-4">
                    <EventsFeed events={events} userId={user.id} />
                </div>
            </div>
        </div>
    );
}
