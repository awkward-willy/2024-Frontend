import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { Label, Post } from "@/types/Post";
import { Button } from "@components/ui/button";
import { DotFilledIcon } from "@radix-ui/react-icons";

import DeletePostButton from "./DeletePostButton";

function PostCard({ post, userName }: { post: Post; userName?: string }) {
  return (
    <div className="flex flex-col items-start rounded-md border p-4">
      <Button variant="link" asChild>
        <Link href={post.user.html_url} target="_blank">
          <Image
            src={post.user.avatar_url}
            alt={post.title}
            width={50}
            height={50}
            className="rounded-full"
          />
          {post.user.login}
        </Link>
      </Button>
      <Button variant="link" asChild>
        <Link href={`/auth/post/${post.number}`} className="text-xl font-bold">
          {post.title}
        </Link>
      </Button>
      <p>{post.created_at}</p>
      {post.labels.map((label: Label) => {
        return (
          <div
            key={label.id}
            className="flex w-fit items-center rounded-sm border px-2"
          >
            <DotFilledIcon color={`#${label.color}`} height="30" width="30" />
            <span>{label.name}</span>
          </div>
        );
      })}
      {post.user.login === userName && (
        <>
          <Button variant="link" asChild>
            <Link href={`/auth/post/${post.number}/edit`}>Edit</Link>
          </Button>
          <DeletePostButton postNumber={post.number.toString()} />
        </>
      )}
    </div>
  );
}

export default memo(PostCard, (prev, next) => {
  return prev.post.id === next.post.id;
});
