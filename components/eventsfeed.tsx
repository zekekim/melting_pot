import EventPost from "@/components/eventpost";
import { twMerge } from "tailwind-merge";
import { Event } from "@prisma/client";
import { validateRequest } from "@/lib/auth";
import { dbEvents } from "@/lib/helpers/getevent";

interface EventsFeedProps {
    className?: string;
    events: Event[];
    userId: string;
}

const EventsFeed = ({ className = "", events, userId }: EventsFeedProps) => {
    return (
        <div className={twMerge("flex flex-col gap-8", className)}>
            {events.map((event, index) => (
                <EventPost key={index} event={event} userId={userId} />
            ))}
        </div>
    );
}

export default EventsFeed;

