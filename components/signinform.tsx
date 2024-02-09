'use client'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { lucia } from '@/lib/auth'
import { generateId } from 'lucia'
import { redirect } from 'next/navigation'


import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signInFormSchema } from '@/lib/validations/signin'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'

export async function SignUpForm() {
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof signInFormSchema>) {
        'use server'
        try {
            const existingUser = await db.user.findUnique({
                where: {
                    user: values.username
                }
            })
            if (!existingUser) {
                throw Error('invalid credentials')
            }
            const validPassword = await Bun
                .password
                .verify(existingUser.hashed_password, values.password);
            if (!validPassword) {
                throw Error('invalid credentials')
            }
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies()
                .set(sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes);
            return redirect('/')
        } catch (e) {
            // TODO: handle errors especially associated to prisma uniqueness
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Sign Up </Button>
            </form>
        </Form>
    )
}

