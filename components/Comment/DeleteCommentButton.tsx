"use client";

import { toast } from "sonner";

import { deleteComment } from "@/actions/deleteComment";
import { Button } from "@components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";

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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">
          <TrashIcon height="20" width="20" className="hover:text-red-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col items-center justify-center gap-2 bg-white">
        <p className="text-black">確定要刪除嗎？</p>
        <Button
          variant="link"
          className="text-red-400"
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
          確定
        </Button>
        <PopoverClose className="text-black" asChild>
          <Button variant="link">取消</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
