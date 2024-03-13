'use server'
import { db } from '@/lib/db'
import { validateRequest } from '@/lib/auth'
import { PostWithRecipe } from '@/lib/types'
import { Event } from '@prisma/client'


export async function getEvents(): Promise<Event[]> {
    try {
        const user = await validateRequest()
        if (!user) {
            throw Error("no user")
        }
        const events: Event[] = await db.event.findMany(
            {
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ],
            })
        return events

    } catch (e) {
    }
    return []
}

export async function getUserEvents(): Promise<Event[]> {
    try {
        const user = await validateRequest()
        if (!user || user.user === null) {
            throw Error("no user")
        }
        const events: Event[] = await db.event.findMany(
            {
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ],
                where: {
                    user: user.user,
                }
            })
        return events

    } catch (e) {
    }
    return []
}

export async function dbEvents(): Promise<Event[]> {
    try {
        const events: Event[] = await db.event.findMany(
            {
                orderBy: [
                    {
                        createdAt: 'desc'
                    }
                ],
            })
        return events

    } catch (e) {
    }
    return []
}

export async function getEvent(id: string): Promise<Event | null> {
    const event: Event | null = await db.event.findUnique({
        where:
        {
            id: id
        }
    })
    return event
}

