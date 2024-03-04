'use client'

import { signUp } from '@/lib/helpers/signup'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signUpFormSchema } from '@/lib/validations/signup'

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
import { useRouter } from 'next/navigation'

export function SignUpForm() {
    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    const router = useRouter()

    async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
        const message = await signUp(values)
        if (message === 'Success') {
            router.push('/')
        }
        else {
            form.setError('username', { type: 'custom', message: 'Username is not unique!' })
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Your password must meet the following criteria:
                                <ul className="list-disc list-inside">
                                    <li>Minimum 8 characters</li>
                                    <li>Maximum 50 characters</li>
                                    <li>At least one special character (!@#$&*)</li>
                                    <li>At least one uppercase letter</li>
                                    <li>At least one digit</li>
                                </ul>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
    
                <div className='flex w-full items-center justify-center'>
                    <Button type="submit">Sign Up</Button>
                </div>
            </form>
        </Form>
    )
    
}

