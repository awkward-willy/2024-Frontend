"use client";

import { revalidatePath } from "next/cache";
import { toast } from "sonner";

import { deletePost } from "@/actions/deletePost";
import { Button } from "@components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { TrashIcon } from "@radix-ui/react-icons";
import { PopoverClose } from "@radix-ui/react-popover";

export default function DeletePostButton({
  postNumber,
  removePost,
}: {
  postNumber: string;
  removePost?: (id: number) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" aria-label="delete post">
          <TrashIcon height="20" width="20" className="hover:text-red-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col items-center justify-center gap-2 bg-white">
        <p className="text-black">確定要刪除嗎？</p>
        <Button
          variant="link"
          className="text-red-400"
          onClick={async () => {
            await deletePost(postNumber).then((res) => {
              if (res === 200) {
                toast("成功刪除文章");
                if (removePost) {
                  removePost(parseInt(postNumber));
                }
              } else {
                toast("刪除文章失敗", {
                  description: "Error code: " + res,
                });
              }
            });
          }}
        >
          確定
        </Button>
        <PopoverClose className="text-black">
          <Button variant="link">取消</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
