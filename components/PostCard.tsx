import { Label, Post } from "@/types/Post";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { DotFilledIcon } from "@radix-ui/react-icons";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border rounded-md p-4">
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
      <p>{post.title}</p>
      <p>{post.body}</p>
      <p>{post.created_at}</p>
      {post.labels.map((label: Label) => {
        return (
          <div
            key={label.id}
            className="flex border rounded-sm w-fit px-2 items-center"
          >
            <DotFilledIcon color={`#${label.color}`} height="30" width="30" />
            <span>{label.name}</span>
          </div>
        );
      })}
    </div>
  );
}
