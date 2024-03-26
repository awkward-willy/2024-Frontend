import { fetchPostByNumber } from "@/actions/fetchPostByNumber";
import PostTab from "@/components/Post/PostTab";
import { auth } from "@/lib/auth";
import { Post } from "@/types/Post";
import Link from "next/link";

export default async function EditPostNumberPage({
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
        <PostTab
          initTitle={postData.title}
          initBody={postData.body}
          issueNum={postData.number}
          type="edit"
        />
      </>
    );
  }

  return <div>Unauthorized</div>;
}
