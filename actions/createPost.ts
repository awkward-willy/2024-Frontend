"use server";

import { revalidatePath } from "next/cache";

import env from "@/lib/env";
import { auth } from "@lib/auth";

export async function createPosts(formData: FormData) {
  const adminName = env.GITHUB_ADMIN_NAME;
  const repoName = env.GITHUB_REPO_NAME;
  const session = await auth();
  if (session) {
    const rawFormData = {
      title: formData.get("title"),
      body: formData.get("body"),
    };
    const response = await fetch(
      `https://api.github.com/repos/${adminName}/${repoName}/issues`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${session.access_token}`,
        },
        body: JSON.stringify(rawFormData),
      },
    );

    if (response.ok) {
      revalidatePath("/auth");
      return { success: "Create post success" };
    }

    return { error: "Create post failed", status: response.status };
  }

  return { error: "Unauthorized", status: 401 };
}
