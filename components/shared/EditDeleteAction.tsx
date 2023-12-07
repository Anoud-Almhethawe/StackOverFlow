"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const route = useRouter();
  const handleEdit = () => {
    route.push(`/question/edit/${JSON.parse(itemId)}`);
  };
  const handleDelete = async () => {
    if (type === "Question") {
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname });
    } else if (type === "Answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });
    }
  };
  return (
    <>
      <div className="max-xs:w-full flex items-center justify-end gap-3">
        {type === "Question" && (
          <Image
            src="/assets/icons/edit.svg"
            alt="edit icon"
            width={16}
            height={16}
            className="cursor-pointer object-contain"
            onClick={handleEdit}
          />
        )}
        <Image
          src="/assets/icons/trash.svg"
          alt="delete icon"
          width={16}
          height={16}
          className="cursor-pointer object-contain"
          onClick={handleDelete}
        />
      </div>
    </>
  );
};

export default EditDeleteAction;
