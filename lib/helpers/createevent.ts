'use server'
import { db } from '@/lib/db'
import { z } from 'zod'
import { eventFormSchema } from '@/lib/validations/createevent'
import { validateRequest } from '@/lib/auth'
import { revalidatePath } from 'next/cache'


export async function createEvent(values: z.infer<typeof eventFormSchema>) {
    try {
        const dateTimeString = `${values.date}T${values.time}:00Z`;
        const date = new Date(dateTimeString);
        const { user } = await validateRequest()
        if (!user) {
            throw Error("no user")
        }
        await db.event.create({
            data:
            {
                userId: user.id,
                title: values.title,
                body: values.description,
                date: date

            }
        })
    } catch (e) {
        console.log(e)
        throw Error("ERROR Creating event: " + e)
    }
}




