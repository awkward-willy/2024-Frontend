import { redirect } from "next/navigation";

import BackToAuthButton from "@components/BackToAuthButton";
import PostTab from "@components/Post/PostTab";
import { auth } from "@lib/auth";

export default async function CreatePage() {
  const session = await auth();
  const admin = process.env.ADMIN_NAME;

  if (!session || session.user.accountName !== admin) {
    redirect("/");
  }

  return (
    <div className="m-4 sm:m-10">
      <BackToAuthButton />
      <PostTab type="create" />
    </div>
  );
}
