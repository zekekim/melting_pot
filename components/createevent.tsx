"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { eventFormSchema } from "@/lib/validations/createevent";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createEvent } from "@/lib/helpers/createevent";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function EventForm()
{
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            date: "",
            time: "",
        },
    });

    function onSubmit(data: z.infer<typeof eventFormSchema>){
    createEvent(data)
        .then(() => {
            toast({
                title: "Your event has been created!",
                description: "View your event in your account.",
            });
        })
        .catch(() =>
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        );
        router.push('/')
    }

    return(
        <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="Event title" {...field} />
          </FormControl>
          <FormDescription>The name of your event.</FormDescription>
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Date</FormLabel>
          <FormControl>
            <Input type="date" placeholder="Event date" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time</FormLabel>
          <FormControl>
            <Input type="time" placeholder="Event time" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Location</FormLabel>
          <FormControl>
            <Input placeholder="Event location" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="body"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea placeholder="Details about the event..." {...field} />
          </FormControl>
        </FormItem>
      )}
    />
    <Button type="submit">Create Event</Button>
  </form>
</Form>
    );
}

