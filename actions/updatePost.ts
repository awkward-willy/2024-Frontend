"use server";

import { auth } from "@/lib/auth";
import env from "@/lib/env";

export async function updatePost(formdata: FormData, id: number) {
  const session = await auth();
  const adminName = env.GITHUB_ADMIN_NAME;
  const repoName = env.GITHUB_REPO_NAME;

  if (session) {
    const title = formdata.get("title");
    const body = formdata.get("body");
    const response = await fetch(
      `https://api.github.com/repos/${adminName}/${repoName}/issues/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `token ${session.access_token}`,
        },
        body: JSON.stringify({ title, body }),
      },
    );
    return response.status;
  }

  return { error: "Unauthorized", status: 401 };
}
