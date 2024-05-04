"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { createTask } from "@/lib/actions/task.actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  taskName: z
    .string()
    .min(2, { message: "Task name must be at least 2 characters long." }),
  taskDescription: z.string().min(2, {
    message: "Task description must be at least 2 characters long.",
  }),
  isTaskOfTheDay: z.boolean(),
});

export function CreateTaskForm({
  userId,
  type,
}: {
  userId: string;
  type: "create" | "update";
}) {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
      taskDescription: "",
      isTaskOfTheDay: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await createTask(userId, values);
    await form.reset();
    router.refresh();
  }

  return (
    <div className="w-full h-[500px]  bg-neutral-500/20 p-5 rounded-md">
      <h1 className="text-white text-center font-bold text-xl">
        Create new task
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pt-5"
        >
          <FormField
            control={form.control}
            name="taskName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="task name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Give your task a description.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taskDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="task description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Give your task a name..</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isTaskOfTheDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is task of the day?</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isTaskOfTheDay"
                      checked={field.value}
                      className="mr-2 h-5 w-5 border-2 border-primary-500"
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
