"use client";
import { useCallback, useEffect, useState } from "react";
import PostCard from "./PostCard";
import { fetchPosts } from "@/actions/fetchPosts";
import { useInView } from "react-intersection-observer";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Post } from "@/types/Post";

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
          setPosts((prev: any) => {
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
      <div className="flex flex-col gap-4">
        {posts.map((data: any) => {
          return <PostCard key={data.id} post={data} userName={userName} />;
        })}
      </div>
      {end ? (
        <p>End of posts</p>
      ) : (
        <div ref={ref} className="w-full flex items-center justify-center">
          <ReloadIcon className="w-6 h-6 animate-spin" />
        </div>
      )}
    </>
  );
};

export default InfiniteScrollPost;
