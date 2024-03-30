"use client";

import { toast } from "sonner";

import { deleteComment } from "@/actions/deleteComment";
import { Button } from "@components/ui/button";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

interface DeleteCommentButtonProps {
  id: string;
  token?: string;
  removeComment: (id: string) => void;
}

export default function DeleteCommentButton({
  id,
  token,
  removeComment,
}: DeleteCommentButtonProps) {
  return (
    <Button
      variant="link"
      className="hover:text-red-400"
      onClick={async () => {
        await deleteComment({ id, token }).then((status) => {
          if (status === 204) {
            toast("成功刪除評論", {
              icon: <CheckCircledIcon color="green" />,
            });
            removeComment(id);
          } else {
            toast("刪除評論失敗", {
              description: "錯誤碼：" + status,
              icon: <CrossCircledIcon color="red" />,
            });
          }
        });
      }}
    >
      <TrashIcon height="20" width="20" />
    </Button>
  );
}
