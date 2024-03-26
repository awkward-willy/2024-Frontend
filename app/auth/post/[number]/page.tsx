import { fetchPostByNumber } from "@/actions/fetchPostByNumber";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { auth } from "@/lib/auth";
import { Post } from "@/types/Post";
import Link from "next/link";
import CommentSection from "@/components/CommentSection";
import { Suspense } from "react";
import CommentTab from "@/components/CommentTab";

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
        <Link href="/">Back</Link>
        <h1>{postData.title}</h1>
        <MarkdownRenderer body={postData.body} />
        <h2>Comments</h2>
        <CommentTab type="create" issueNum={postData.number} />
        <Suspense fallback={<div>Loading comments...</div>}>
          <CommentSection postNumber={params.number} />
        </Suspense>
      </>
    );
  }

  return <div>Unauthorized</div>;
}
