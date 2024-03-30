import { fetchComments } from "@/actions/fetchComments";
import InfiniteScrollComment from "@/components/Comment/InfiniteScrollComment";
import { auth } from "@/lib/auth";

export default async function CommentSection({
  postNumber,
}: {
  postNumber: string;
}) {
  const session = await auth();
  const data = await fetchComments({
    number: postNumber,
    token: session?.access_token,
  });

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
