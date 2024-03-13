import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import { getEvents, getUserEvents } from "@/lib/helpers/getevent";
import EventsFeed from "@/components/eventsfeed";
import { Event } from "@prisma/client";

export default async function Home() {
    const { user } = await validateRequest();
    if (!user) {
        return redirect("/signup");
    }
    
    const events: Array<Event> = await getUserEvents();
    const allEvents: Array<Event> = await getEvents();
    
    return (
        <div className="flex flex-col gap-8">
        <h1 className="text-xl font-light">
            Hi, {user.user}! Welcome to your melting pot, today's events are...
        </h1>
        <EventsFeed events={events} className="w-5/6 self-center" userId={""} />
        <h1 className="text-xl font-medium text-center">All Events</h1>
        <EventsFeed events={allEvents} userId={""} />
        </div>
    );
    }
