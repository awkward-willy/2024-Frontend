import { fetchPosts } from "@/actions/fetchPosts";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import PostList from "@/components/PostList";
import { Post } from "@/types/Post";
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
        <Suspense fallback={<p>Loading...</p>}>
          <PostList />
        </Suspense>
        {data.map((data: Post) => {
          return <PostCard key={data.id} post={data} />;
        })}
      </>
    );
  }
  redirect("/");
};

export default AuthPage;
