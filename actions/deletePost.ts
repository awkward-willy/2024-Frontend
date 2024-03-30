"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import env from "@/lib/env";

export async function deletePost(postNumber: string) {
  const session = await auth();
  const token = session?.access_token;
  const adminName = env.GITHUB_ADMIN_NAME;
  const repoName = env.GITHUB_REPO_NAME;

  let header;
  if (token) {
    header = {
      Authorization: `token ${token}`,
    };
  } else {
    header = {};
  }
  const response = await fetch(
    `https://api.github.com/repos/${adminName}/${repoName}/issues/${postNumber}`,
    {
      method: "PATCH",
      headers: header,
      body: JSON.stringify({ state: "closed" }),
    },
  );

  revalidatePath("/auth");

  return response.status;
}
