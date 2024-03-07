'use server'
import { db } from '@/lib/db'
import { z } from 'zod'
import { eventFormSchema } from '@/lib/validations/createevent'
import { validateRequest } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export async function createEvent(values: z.infer<typeof eventFormSchema>) {
    try {
        const user = await validateRequest()
        if (!user) {
            throw Error("no user")
        }
        await db.event.create({
            data:
            {
                userId: user.user!.id,
                event: {
                    create: {
                        title: values.title,
                        date: values.date,
                        body: values.body
                    }
                },
            }
        })
    } catch (e) {
        throw Error("ERROR Creating event: " + e)
        console.log(e)
    }
    revalidatePath('/')
}



