"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postFormSchema } from "@/lib/validations/createpost";
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
import { createPost } from "@/lib/helpers/createpost";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function RecipeForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      ingredients: [],
      body: "",
    },
  });


  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  function onSubmit(data: z.infer<typeof postFormSchema>) {
    createPost(data)
      .then(() => {
        toast({
          title: "Your recipe has been created!",
          description: "View your recipe in your account.",
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormDescription>Title of your post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((field, index) => (
          <div className="flex flex-row justify-start gap-5">
            <FormField
              control={form.control}
              key={field.id}
              name={`ingredients.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormDescription />
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              key={field.id}
              name={`ingredients.${index}.quantity`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormDescription />
                  <FormControl>
                    <Input placeholder="quantity" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              key={field.id}
              name={`ingredients.${index}.unit`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormDescription />
                  <FormControl>
                    <Input placeholder="unit" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => append({ name: "", quantity: 1, unit: "" })}
        >
          Add Ingredient
        </Button>

        <div>
          <FormField
            control={form.control}
            name={"body"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormDescription />
                <FormControl>
                  <Textarea placeholder="Enter a description..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
