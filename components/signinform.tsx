'use client'
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
import { signIn } from '@/lib/helpers/signin'
import { useRouter } from 'next/navigation'

export function SignInForm() {
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    const router = useRouter()

    async function onSubmit(values: z.infer<typeof signInFormSchema>) {
        const message = await signIn(values);
        console.log(message);
        if (message === "Success") {
            router.push('/')
        } else {
            form.setError('username', { type: 'custom', message: '' })
            form.setError('password', { type: 'custom', message: 'invalid credentials' })
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
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                A secure password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='w-full flex items-center justify-center'>
                    <Button type="submit">Sign In</Button>
                </div>
            </form>
        </Form>
    )
}

