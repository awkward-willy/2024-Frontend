import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-2">
      <h1>很抱歉，無法找到該貼文。</h1>
      <Button variant="outline" className="max-w-40" asChild>
        <Link href="/">返回貼文列</Link>
      </Button>
    </div>
  );
}
