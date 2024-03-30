import { notFound } from "next/navigation";

import { fetchComments } from "@/actions/fetchComments";
import InfiniteScrollComment from "@/components/Comment/InfiniteScrollComment";
import { auth } from "@/lib/auth";

export default async function CommentSection({
  postNumber,
}: {
  postNumber: string;
}) {
  const session = await auth();

  let data = [];

  try {
    data = await fetchComments({
      number: postNumber,
      token: session?.access_token,
    });
  } catch (e) {
    notFound();
  }

  return (
    <>
      <InfiniteScrollComment
        initialComments={data}
        token={session?.access_token}
        endofComments={data.length < 10}
        postNumber={postNumber}
        userName={session?.user?.accountName}
      />
    </>
  );
}
