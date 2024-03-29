import { Suspense } from "react";

import { fetchPostByNumber } from "@/actions/fetchPostByNumber";
import BackToAuthButton from "@/components/BackToAuthButton";
import CommentSection from "@/components/CommentSection";
import CommentTab from "@/components/CommentTab";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import PostTitle from "@/components/Post/PostTitle";
import { auth } from "@/lib/auth";
import { Post } from "@/types/Post";

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

  if (session) {
    return (
      <>
        <BackToAuthButton />
        <div className="rounded-md bg-white p-8 pb-4 text-black">
          <PostTitle title={postData.title} />
          <MarkdownRenderer body={postData.body} />
          <h2 className="mt-4 font-bold">新增留言</h2>
          <CommentTab type="create" issueNum={postData.number} />
          <h2 className="mt-4 font-bold">留言</h2>
          <Suspense fallback={<div>Loading comments...</div>}>
            <CommentSection postNumber={params.number} />
          </Suspense>
        </div>
      </>
    );
  }

  return <div>Unauthorized</div>;
}
