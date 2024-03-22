import { fetchPosts } from "@/actions/fetchPosts";
import Navbar from "@/components/Navbar";
import PostCardSkeleton from "@/components/PostCardSkeleton";
import PostList from "@/components/PostList";
import { auth } from "@lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

// This is for users who are logged in
const AuthPage = async () => {
  const session = await auth();
  const data = await fetchPosts();
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
