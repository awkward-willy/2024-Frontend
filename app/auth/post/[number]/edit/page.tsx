import { Metadata } from "next";

import { fetchPostByNumber } from "@/actions/fetchPostByNumber";
import { auth } from "@/lib/auth";
import { Post } from "@/types/Post";
import BackToAuthButton from "@components/BackToAuthButton";
import PostTab from "@components/Post/PostTab";

export const metadata: Metadata = {
  title: "EditPost",
};

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
        <BackToAuthButton />
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
