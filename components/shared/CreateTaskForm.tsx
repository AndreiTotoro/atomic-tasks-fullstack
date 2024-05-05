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
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

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
  setOpen,
  hasUserCompletedTaskOfTheDay,
}: {
  userId: string;
  type: "create" | "update";
  setOpen: (value: boolean) => void;
  hasUserCompletedTaskOfTheDay: boolean;
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
    setOpen(false);
    router.refresh();
    toast.success("Task created successfully.");
  }

  return (
    <div className="w-full rounded-md">
      <h1 className="text-white text-center font-bold text-xl">
        Create new task
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pt-5 "
        >
          <FormField
            control={form.control}
            name="taskName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-neutral-800"
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
                  <Textarea
                    className="text-neutral-800"
                    type=""
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
                <FormControl>
                  <div className="flex items-center gap-2 space-x-2">
                    {!hasUserCompletedTaskOfTheDay && (
                      <Checkbox
                        id="isTaskOfTheDay"
                        checked={field.value}
                        className="mr-2 h-5 w-5 border-2 border-primary-500"
                        onCheckedChange={field.onChange}
                      />
                    )}

                    {hasUserCompletedTaskOfTheDay ? (
                      <h1>You have already completed the task of the day!</h1>
                    ) : (
                      <h1>Make this task the task of the day</h1>
                    )}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full mx-auto">
            <Button
              className="w-full"
              disabled={form.formState.isSubmitting}
              type="submit"
              variant={"secondary"}
            >
              {form.formState.isSubmitting ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
