import Profile from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    return "User not found";
  }
  const mongoUser = await getUserById({ userId });
  return (
    <>
      <h1 className=" h1-bold text-dark100_light900  "> Edit Profile </h1>
      <div className="mt-9">
        <Profile user={JSON.stringify(mongoUser)} clerkId={userId} />
      </div>
    </>
  );
};
export default Page;
