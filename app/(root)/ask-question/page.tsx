import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";

import console from "console";
import { redirect } from "next/navigation";

const AskQuestion = async () => {
  // const { userId } = auth();
  const userId = "CL123";

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });
  console.log(mongoUser);

  return (
    <div>
      <h1 className=" h1-bold text-dark100_light900  "> Ask a Question </h1>
      <div className="mt-9">
        <Question mongouserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
