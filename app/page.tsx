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
    <section className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
      <div className="py-7" />
      <div className="rounded-md bg-white text-black">
        {data.map((data: Post) => {
          return <PostCard key={data.id} post={data} />;
        })}
      </div>
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-background/50">
        <div className="absolute bottom-[10%] left-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-4">
          <h1 className="whitespace-nowrap text-center text-3xl font-extrabold text-background backdrop-blur-sm md:text-5xl">
            更多精彩內容
            <br />
            請先登入以繼續
          </h1>
          <Button className="w-fit text-3xl" variant="outline" asChild>
            <Link href="/api/auth/signin">登入</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
