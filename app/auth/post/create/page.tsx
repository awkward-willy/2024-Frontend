import { redirect } from "next/navigation";

import env from "@/lib/env";
import BackToAuthButton from "@components/BackToAuthButton";
import PostTab from "@components/Post/PostTab";
import { auth } from "@lib/auth";

export default async function CreatePage() {
  const session = await auth();
  const admin = env.GITHUB_ADMIN_NAME;

  if (!session || session.user.accountName !== admin) {
    redirect("/");
  }

  return (
    <>
      <BackToAuthButton />
      <PostTab type="create" />
    </>
  );
}
