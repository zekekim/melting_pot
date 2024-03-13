'use server'
import { db } from '@/lib/db'
import { z } from 'zod'
import { eventFormSchema } from '@/lib/validations/createevent'
import { validateRequest } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export async function createEvent(values: z.infer<typeof eventFormSchema>) {
    try {
      const user = await validateRequest();
      if (!user) {
        throw new Error("no user");
      }
  
      await db.event.create({
        data: {
          userId: user.user!.id,  
          title: values.title,
          createdAt: values.date,  
          body: values.body,
        }
      });
  
      revalidatePath('/');
    } catch (e) {
      console.error("ERROR Creating event: ", e);
      throw new Error("ERROR Creating event: " + e);
    }
  }
  



