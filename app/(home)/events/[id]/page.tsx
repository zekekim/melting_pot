import EventPost from "@/components/eventpost"
import { validateRequest } from "@/lib/auth"
import { getEvent } from "@/lib/helpers/getevent";
import { redirect } from "next/navigation";
export default async function Page({ params }: { params: { id: string } }) {
    const { user } = await validateRequest();
    const event = await getEvent(params.id);

    if (!user || !event) {
        redirect('/')
    }

    return <EventPost event={event} userId={user.id} />
}
