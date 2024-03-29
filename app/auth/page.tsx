import { redirect } from "next/navigation";
import { Suspense } from "react";

import PostCardSkeleton from "@/components/Post/PostCardSkeleton";
import PostList from "@/components/Post/PostList";
import { auth } from "@lib/auth";

export const revalidate = 60;

// This is for users who are logged in
const AuthPage = async () => {
  const session = await auth();
  if (session) {
    return (
      <>
        <p className="mb-2 text-2xl font-extrabold">貼文</p>
        <Suspense fallback={<PostCardSkeleton />}>
          <div className="rounded-md bg-white text-black">
            <PostList />
          </div>
        </Suspense>
      </>
    );
  }
  redirect("/");
};

export default AuthPage;
