import { getUserById, getUserInfo } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not found");
  }
  const mongoUser = await getUserById({ userId });
  const result = await getUserInfo({ userId: mongoUser._id });
  console.log(result, "User info");

  return <div>page</div>;
};

export default Page;
