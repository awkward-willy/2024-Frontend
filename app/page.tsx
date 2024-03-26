import Link from "next/link";

import { fetchPosts } from "@/actions/fetchPosts";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/Post/PostCard";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/Post";

export const dynamic = "force-static";

// This is for users who are not logged in
export default async function HomePage() {
  const data = await fetchPosts();

  return (
    <main>
      <Navbar />
      <p>請先登入</p>
      <Button variant="outline" asChild>
        <Link href="/api/auth/signin">登入</Link>
      </Button>
      <div>
        {data.map((data: Post) => {
          return <PostCard key={data.id} post={data} />;
        })}
      </div>
    </main>
  );
}
