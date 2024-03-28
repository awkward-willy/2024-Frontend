"use client";

import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

import PostCard from "@/components/Post/PostCard";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { mockCoverData } from "@/mock/mockCoverData";

// this page shows when an error occurs
// expectially when rate limit is reached
// (usually happens in dev mode when keep hard refreshing the page)
// (in production, due to caching, rate limit is less likely to be reached)
export default function Error(error: { error: { message: string } }) {
  const mockData = mockCoverData;
  console.log(error.error.message);
  useEffect(() => {
    toast("發生錯誤", { description: error.error.message });
  }, [error.error.message]);
  return (
    <section className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
      <div className="py-8" />
      <div className="rounded-md bg-white text-black">
        {mockData.map((data) => {
          return (
            <div key={data.id} className="">
              <PostCard post={data} />
            </div>
          );
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
      <Toaster />
    </section>
  );
}
