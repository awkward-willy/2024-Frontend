"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { deletePost } from "@/actions/deletePost";
import { Button } from "@components/ui/button";

export default function DeletePostButton({
  postNumber,
}: {
  postNumber: string;
}) {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await deletePost(postNumber).then((res) => {
          if (res === 200) {
            toast("成功刪除文章");
          } else {
            toast("刪除文章失敗", {
              description: "Error code: " + res,
            });
          }
          router.refresh();
        });
      }}
    >
      Delete
    </Button>
  );
}
