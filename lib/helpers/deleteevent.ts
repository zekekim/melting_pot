'use server'
import { db } from '@/lib/db'
import { validateRequest } from '@/lib/auth'
import { deleteEventSchema } from '../validations/deletepost'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function deleteEvent({eventId, userId}: z.infer<typeof deleteEventSchema>) {
    try {
        const user = await validateRequest()
        if (!user) {
            throw Error("no user")
        }
        if (user.user?.id !== userId){
            throw Error("not user's event")
        }
        await db.event.delete({
            where: {
                id: eventId,
                userId: userId
            }
        })
    } catch (e) {
        throw Error("ERROR Deleting event: " + e)
        console.log(e)
    }
    revalidatePath('/')
    revalidatePath('/myevents')
}