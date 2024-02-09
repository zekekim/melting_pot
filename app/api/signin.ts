import type { NextApiRequest, NextApiResponse } from 'next'
import { signInFormSchema } from '@/lib/validations/signin'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { lucia } from '@/lib/auth'
import { generateId } from 'lucia'

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const data = signInFormSchema.parse(req.body)
        const hashedPassword: string = await Bun.password.hash(data.password)
        const userId = generateId(15);
        const existingUser = await db.user.findUnique({
            where: {
                user: data.username
            }
        })
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);


    } catch (e) {
        return res.status(400).send({
            message: `this is doo doo fart payload`
        });
    }



}
