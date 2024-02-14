'use server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { lucia } from '@/lib/auth'
import { z } from 'zod'
import { signInFormSchema } from '@/lib/validations/signin'

export async function signIn(values: z.infer<typeof signInFormSchema>) {
    try {
        const existingUser = await db.user.findUnique({
            where: {
                user: values.username
            }
        })
        if (!existingUser) {
            throw Error('invalid credentials')
        }
        const validPassword = await Bun.password.verify(values.password, existingUser.hashed_password);
        if (!validPassword) {
            throw Error('invalid credentials')
        }
        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies()
            .set(sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes);
        return "Success"
    } catch (e) {
        if (typeof e === "string") {
            return e.toUpperCase() // works, `e` narrowed to string
        } else if (e instanceof Error) {
            return e.message // works, `e` narrowed to Error
        }
    }
}
