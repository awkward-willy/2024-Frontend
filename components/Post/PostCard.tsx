import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { Label, Post } from "@/types/Post";
import { Button } from "@components/ui/button";
import { DotFilledIcon, Pencil2Icon } from "@radix-ui/react-icons";

import DeletePostButton from "./DeletePostButton";

function PostCard({ post, userName }: { post: Post; userName?: string }) {
  return (
    <article className="flex flex-col items-start justify-start rounded-md border border-b border-gray-200 bg-white px-2 py-4">
      <div className="flex w-full flex-wrap items-center">
        <Button variant="link" asChild>
          <Link href={post.user.html_url} target="_blank" className="gap-2">
            <Image
              src={post.user.avatar_url}
              alt={post.title}
              width={30}
              height={30}
              className="rounded-full"
            />
            {post.user.login}
          </Link>
        </Button>
        <p className="mx-4">{post.created_at}</p>
        <div className="flex-grow"></div>
        {post.user.login === userName && (
          <div className="ml-4">
            <Button
              variant="link"
              asChild
              className="px-0 hover:text-background/90"
            >
              <Link href={`/auth/post/${post.number}/edit`}>
                <Pencil2Icon height="20" width="20" />
              </Link>
            </Button>
            <DeletePostButton postNumber={post.number.toString()} />
          </div>
        )}
      </div>
      <Button variant="link" asChild>
        <Link href={`/auth/post/${post.number}`} className="text-xl font-bold">
          {post.title}
        </Link>
      </Button>
      <div className="flex flex-wrap gap-2">
        {post.labels.map((label: Label) => {
          return (
            <div key={label.id} className="flex w-fit items-center">
              <DotFilledIcon color={`#${label.color}`} height="30" width="30" />
              <span>{label.name}</span>
            </div>
          );
        })}
      </div>

      <p className="mx-4">{post.comments}&nbsp;則留言</p>
    </article>
  );
}

export default memo(PostCard, (prev, next) => {
  return prev.post.id === next.post.id;
});
