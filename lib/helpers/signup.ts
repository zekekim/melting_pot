'use server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { lucia } from '@/lib/auth'
import { generateId } from 'lucia'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { signUpFormSchema } from '@/lib/validations/signup'

export async function signUp(values: z.infer<typeof signUpFormSchema>) {
    try {
        const hashedPassword: string = await Bun.password.hash(values.password)
        const userId = generateId(15);
        await db.user.create({
            data: {
                id: userId,
                user: values.username,
                hashed_password: hashedPassword
            }
        })
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        redirectUser()
    } catch (e) {
        // TODO: handle errors especially associated to prisma uniqueness
    }
}

function redirectUser() {
    return redirect('/')
}

