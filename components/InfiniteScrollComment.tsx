"use client";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Comment } from "@/types/Comment";
import { fetchComments } from "@/actions/fetchComments";
import CommentCard from "./CommentCard";

const InfiniteScrollComment = ({
  initialComments,
  token,
  endofComments,
  postNumber,
  userName,
}: {
  initialComments: Comment[];
  token: string | undefined;
  endofComments: boolean;
  postNumber: string;
  userName: string;
}) => {
  const [comments, setComments] = useState(initialComments);
  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(endofComments);
  const [ref, inView] = useInView();

  const removeComment = (id: string) => {
    setComments((prev: any) => {
      return prev.filter((comment: Comment) => comment.id !== id);
    });
  };

  const memorizedCallback = useCallback(
    async function fetchMore() {
      const next = page + 1;
      const data = await fetchComments({
        page: next,
        token: token || "",
        number: postNumber,
      });
      if (data?.length) {
        if (data.length < 10) {
          setEnd(true);
        }
        setPage(next);
        setComments((prev: any) => {
          return [...(prev?.length ? prev : []), ...data];
        });
      } else {
        setEnd(true);
      }
    },
    [page, token, postNumber]
  );

  useEffect(() => {
    if (inView) {
      memorizedCallback();
    }
  }, [inView, memorizedCallback]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {comments.map((data: Comment) => {
          return (
            <CommentCard
              key={data.id}
              comment={data}
              userName={userName}
              token={token}
              removeComment={removeComment}
            />
          );
        })}
      </div>
      {end ? (
        <p>End of comments</p>
      ) : (
        <div ref={ref} className="w-full flex items-center justify-center">
          <ReloadIcon className="w-6 h-6 animate-spin" />
        </div>
      )}
    </>
  );
};

export default InfiniteScrollComment;
