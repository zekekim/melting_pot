'use client'

import { logout } from '@/lib/helpers/signout'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
    const router = useRouter()
    async function onClick() {
        logout()
        router.push('/')
    }

	return (
			<Button onClick={onClick}>Sign out</Button>
	);
}

