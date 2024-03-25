import PostTab from "@/components/PostTab";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const session = await auth();
  const admin = process.env.ADMIN_NAME;

  if (!session || session.user.accountName !== admin) {
    redirect("/");
  }

  return (
    <>
      <Link href="/">Back</Link>
      <PostTab type="create" />
    </>
  );
}
