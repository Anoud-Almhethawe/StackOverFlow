"use client";

import { ProfileSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
import { updateUser } from "@/lib/actions/user.action";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

interface Props {
  user: string;
  clerkId: string;
}
const Page = ({ user, clerkId }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const route = useRouter();

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
  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setIsSubmitting(true);
    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioLink,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });
      toast({
        title: "Profile Updated",
        description: "The profile has successfully Updated.",
      });
      route.back();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-9 flex w-full flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-dark100_light900 ">
                Full Name<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border background-light700_dark300 text-dark300_light700 "
                  required
                  placeholder="your name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark100_light900 ">
                Username<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 "
                  required
                  placeholder="your username"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolioLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark100_light900 ">
                portfolio Link
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  className="no-focus paragraph-regular light-border background-light700_dark300 text-dark300_light700 "
                  placeholder="your portfolio url"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark100_light900 ">
                Location<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border background-light700_dark300 text-dark300_light700 "
                  placeholder="where are you from? "
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark100_light900 ">
                Bio<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="no-focus paragraph-regular light-border background-light700_dark300 text-dark300_light700 min-h-[56px] border "
                  placeholder="What's special about you?..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="mt-7 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
            Edit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Page;
