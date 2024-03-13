"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    FcComments,
    FcEmptyTrash,
} from "react-icons/fc";
import { LuPanelTopOpen } from "react-icons/lu";
import { Event } from "@prisma/client";
import LikeButton from "./likebutton";
import { deleteEvent } from "@/lib/helpers/deleteevent";
import { getEvent } from "@/lib/helpers/getevent";
import { useRouter } from "next/router";
import { NotFoundError } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";

interface EventPostProps {
    event: Event;
    userId: string;
}

const EventPost = ({ event, userId }: EventPostProps) => {

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{event.body}</CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <LikeButton postId={event.id} likes={[]} userId={userId} />
                    <Link href={`/events/${event.id}`}>
                        <Button variant="ghost">
                            <FcComments />
                        </Button>
                    </Link>
                </div>
                {userId === event.userId && (
                    <Popover open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost">
                                <FcEmptyTrash />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="space-y-1">
                            <Button
                                onClick={() => {
                                    setIsDeleteOpen(false);
                                    deleteEvent({ eventId: event.id, userId: event.userId });
                                }}
                            >
                                Delete
                            </Button>
                        </PopoverContent>
                    </Popover>
                )}
            </CardFooter>
        </Card>
    );
};

export default EventPost;
