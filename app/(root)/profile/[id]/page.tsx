import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import { SignedIn } from "@clerk/nextjs";

import Image from "next/image";
import React from "react";

const page = async ({ params, searchParams }: URLProps) => {
  const userInfo = await getUserInfo({ userId: params.id });
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row ">
          <Image
            src={userInfo?.user.picture}
            alt="user profile pic"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            {userInfo.user.name}
            <p>@{userInfo.user.username}</p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5 ">
              {userInfo.user.location && <>location</>}
              {userInfo.user.joinedAt.toString()}
            </div>
            {userInfo.user.bio && <p>{userInfo.user.bio}</p>}
          </div>
        </div>
        <div>
          <SignedIn>
            <Button className="primary-gradient !text-light-900 min-h-[46px] px-4 py-3">
              Edit Profile
            </Button>
          </SignedIn>
        </div>
      </div>
    </>
  );
};
export default page;
