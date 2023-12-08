"use client";

import { ProfileSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  user: string;
  clerkId: string;
}
const Page = ({ user, clerkId }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || "",
      username: parsedUser.username || "",
      portfolioLink: parsedUser.portfolioWebsite || "",
      location: parsedUser.location || "",
      bio: parsedUser.bio || "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ProfileSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmitting(true);
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Full Name<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border background-light700_dark300 text-dark300_light700 "
                  required
                  placeholder="name"
                  {...field}
                  value={parsedUser.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border background-light700_dark300 text-dark300_light700 "
                  required
                  placeholder="username"
                  {...field}
                  value={parsedUser.username}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolioLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>portfolioLink</FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border background-light700_dark300 text-dark300_light700 "
                  placeholder="portfolioLink"
                  {...field}
                  value={parsedUser.portfolioLink}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Location<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border background-light700_dark300 text-dark300_light700 "
                  placeholder="location"
                  {...field}
                  value={parsedUser.location}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Bio<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <textarea
                  className="no-focus paragraph-regular light-border background-light700_dark300 text-dark300_light700 "
                  placeholder="What's special about you?..."
                  {...field}
                  value={parsedUser.bio}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="primary-gradient !text-light-900 w-fit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
          Edit
        </Button>
      </form>
    </Form>
  );
};

export default Page;
