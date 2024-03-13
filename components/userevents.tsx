import EventPost from "@/components/eventpost";
import { twMerge } from "tailwind-merge";

interface EventsProps {
    className?: string;
    userId: string;
    events: Event[];
}

interface Event {
    id: string;
    userId: string;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

const userEvents = ({ className = "", events, userId }: EventsProps) => {
    return (
        <div className={twMerge("flex flex-col gap-8", className)}>
            {events.map((event, index) => (
                <EventPost key={index} event={event} userId={userId} />
            ))}
        </div>
    );
}


export default userEvents