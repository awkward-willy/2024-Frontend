import Link from "next/link";
import { redirect } from "next/navigation";

import PostTab from "@/components/Post/PostTab";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { ResetIcon } from "@radix-ui/react-icons";

export default async function CreatePage() {
  const session = await auth();
  const admin = process.env.ADMIN_NAME;

  if (!session || session.user.accountName !== admin) {
    redirect("/");
  }

  return (
    <div className="m-4 sm:m-10">
      <Button asChild variant="link" className="text-white">
        <Link href="/" className="gap-2">
          <ResetIcon className="h-4 w-4" />
          返回貼文列表
        </Link>
      </Button>
      <PostTab type="create" />
    </div>
  );
}
