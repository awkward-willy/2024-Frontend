"use client";

import { useRouter } from "next/navigation";

import { Button } from "@components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <h1>發生錯誤...</h1>
      <p>錯誤原因：{error.message}</p>
      <Button
        variant="outline"
        className="max-w-80"
        onClick={() => {
          router.push("/");
          return;
        }}
      >
        嘗試返回貼文列
      </Button>
      <Button className="max-w-80" variant="outline" onClick={() => reset()}>
        重新讀取
      </Button>
    </div>
  );
}
