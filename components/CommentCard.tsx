import Image from "next/image";
import { Comment } from "@/types/Comment";
import DeleteCommentButton from "./DeleteCommentButton";
import { memo } from "react";

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
    <>
      <div>
        <Image
          src={comment.user.avatar_url}
          alt={comment.user.login}
          width={50}
          height={50}
          className="rounded-full"
        />
        <span>{comment.user.login}</span>
      </div>
      <div>{comment.body}</div>
      <div>{comment.created_at}</div>
      {comment.user.login === userName && (
        <DeleteCommentButton
          id={comment.id}
          token={token}
          removeComment={removeComment}
        />
      )}
    </>
  );
}

export default memo(CommentCard, (prev, next) => {
  return prev.comment.id === next.comment.id;
});
