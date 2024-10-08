import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Question | DevFlow ",
};

const AskQuestion = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className=" h1-bold text-dark100_light900  "> Ask a Question </h1>
      <div className="mt-9">
        <Question mongouserId={JSON.stringify(mongoUser?._id)} type="create" />
      </div>
    </div>
  );
};

export default AskQuestion;
