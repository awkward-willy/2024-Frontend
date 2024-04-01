import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { Comment } from "@/types/Comment";
import { Button } from "@components/ui/button";

import DeleteCommentButton from "./DeleteCommentButton";

function CommentCard({
  comment,
  userName,
  token,
  removeComment,
}: {
  comment: Comment;
  userName: string;
  token?: string;
  removeComment: (id: string) => void;
}) {
  return (
    <div className="flex w-full flex-col items-start justify-start rounded-md border-b border-gray-200 bg-white px-2 py-4">
      <div className="flex w-full flex-wrap items-center">
        <Button variant="link" asChild className="pl-0">
          <Link href={comment.user.html_url} target="_blank" className="gap-2">
            <Image
              src={comment.user.avatar_url}
              alt={`${comment.user.login}'s avatar`}
              width={30}
              height={30}
              className="rounded-full"
            />
            <p>{comment.user.login}</p>
          </Link>
        </Button>
        <p>{comment.created_at}</p>
        <div className="flex-grow"></div>
        {comment.user.login === userName && (
          <DeleteCommentButton
            id={comment.id}
            token={token}
            removeComment={removeComment}
          />
        )}
      </div>
      <p>{comment.body}</p>
    </div>
  );
}

export default memo(CommentCard, (prev, next) => {
  return prev.comment.id === next.comment.id;
});
