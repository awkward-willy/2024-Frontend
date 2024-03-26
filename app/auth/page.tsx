import { redirect } from "next/navigation";
import { Suspense } from "react";

import Navbar from "@/components/Navbar";
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
        <Navbar />
        <p>Auth Page</p>
        <Suspense fallback={<PostCardSkeleton />}>
          <PostList />
        </Suspense>
      </>
    );
  }
  redirect("/");
};

export default AuthPage;
