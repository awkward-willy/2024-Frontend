import Link from "next/link";

import { Button } from "@components/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";

export default function BackToAuthButton() {
  return (
    <Button asChild variant="link" className="pl-0 text-white">
      <Link href="/" className="gap-2">
        <ResetIcon className="h-4 w-4" />
        返回貼文列表
      </Link>
    </Button>
  );
}
