import { db } from '@/lib/db'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { Lucia, TimeSpan } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

import type { Session, User } from "lucia";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
    getUserAttributes: (attributes) => {
        return {
            user: attributes.user,
        };
    },
    sessionExpiresIn: new TimeSpan(30, "d"), // no more active/idle
    sessionCookie: {
        expires: false, // session cookies have very long lifespan (2 years)
        attributes: {
            secure: process.env.NODE_ENV === 'production',
        }
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    user: string;
}

export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
		return result;
	}
);
