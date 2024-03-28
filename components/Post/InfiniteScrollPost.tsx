"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { fetchPosts } from "@/actions/fetchPosts";
import { Post } from "@/types/Post";
import { ReloadIcon } from "@radix-ui/react-icons";

import PostCard from "./PostCard";

const InfiniteScrollPost = ({
  initialPosts,
  token,
  endofPosts,
  userName,
}: {
  initialPosts: Post[];
  token: string | undefined;
  endofPosts: boolean;
  userName: string;
}) => {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(endofPosts);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && !end) {
      const fetchMore = async () => {
        const next = page + 1;
        const data = await fetchPosts({ page: next, token: token || "" });
        if (data?.length) {
          if (data.length < 10) {
            setEnd(true);
          }
          setPage(next);
          setPosts((prev: Post[]) => {
            return [...(prev?.length ? prev : []), ...data];
          });
        } else {
          setEnd(true);
        }
      };
      fetchMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      {posts.map((data: Post) => {
        return <PostCard key={data.id} post={data} userName={userName} />;
      })}
      {end ? (
        <p className="p-4">沒有更多貼文了...</p>
      ) : (
        <div ref={ref} className="flex w-full items-center justify-center">
          <ReloadIcon className="h-6 w-6 animate-spin" />
        </div>
      )}
    </>
  );
};

export default InfiniteScrollPost;
