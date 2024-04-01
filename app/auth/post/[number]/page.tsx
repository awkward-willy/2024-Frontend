import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { fetchPostByNumber } from "@/actions/fetchPostByNumber";
import BackToAuthButton from "@/components/BackToAuthButton";
import CommentSection from "@/components/Comment/CommentSection";
import CommentTab from "@/components/Comment/CommentTab";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import DeletePostButton from "@/components/Post/DeletePostButton";
import PostTitle from "@/components/Post/PostTitle";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Post } from "@/types/Post";
import { Pencil2Icon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "Post",
};

export const revalidate = 60;

export default async function PostNumberPage({
  params,
}: {
  params: { number: string };
}) {
  const session = await auth();
  const postData: Post = await fetchPostByNumber({
    number: params.number,
    token: session?.access_token,
  });

  if (postData.state === "closed") {
    notFound();
  }

  if (session) {
    return (
      <>
        <BackToAuthButton />
        {postData.user.login === session.user.accountName && (
          <>
            <Button
              variant="link"
              asChild
              className="px-0 text-white hover:text-accent"
            >
              <Link
                href={`/auth/post/${postData.number}/edit`}
                aria-label="edit post"
              >
                <Pencil2Icon height="20" width="20" />
              </Link>
            </Button>
            <DeletePostButton
              postNumber={postData.number.toString()}
              className="text-white"
            />
          </>
        )}
        <div className="rounded-md bg-white p-8 pb-4 text-black">
          <PostTitle title={postData.title} />
          <MarkdownRenderer body={postData.body} />
          <h2 className="my-4 border-t pt-4 font-bold">新增留言</h2>
          <CommentTab type="create" issueNum={postData.number} />
          <h2 className="mt-4 border-t pt-4 font-bold">留言</h2>
          <Suspense fallback={<div>Loading comments...</div>}>
            <CommentSection postNumber={params.number} />
          </Suspense>
        </div>
      </>
    );
  }

  return <div>Unauthorized</div>;
}
