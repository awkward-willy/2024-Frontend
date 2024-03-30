import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { fetchPostByNumber } from "@/actions/fetchPostByNumber";
import { auth } from "@/lib/auth";
import env from "@/lib/env";
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
  const adminName = env.GITHUB_ADMIN_NAME;
  const session = await auth();
  const postData: Post = await fetchPostByNumber({
    number: params.number,
    token: session?.access_token,
  });

  if (!session) {
    redirect("/");
  }

  if (postData.state === "closed" || session.user.accountName !== adminName) {
    notFound();
  }

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
