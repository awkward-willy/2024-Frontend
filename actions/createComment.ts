"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import env from "@/lib/env";

interface createCommentProps {
  number: string;
  body: string;
  token?: string;
}

export async function createComment(props: createCommentProps) {
  const adminName = env.GITHUB_ADMIN_NAME;
  const repoName = env.GITHUB_REPO_NAME;

  const session = await auth();
  if (session) {
    const token = session.access_token;
    let header;
    if (token) {
      header = {
        Authorization: `token ${token}`,
      };
    } else {
      header = {};
    }

    const response = await fetch(
      `https://api.github.com/repos/${adminName}/${repoName}/issues/${props.number}/comments`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify({ body: props.body }),
      },
    ).then((res) => res.json());

    const data = {
      id: response.id,
      body: response.body,
      created_at: new Date(response.created_at).toLocaleString('zh-TW', { timeZone: "Asia/Taipei" }),
      user: response.user,
    };

    revalidatePath("/auth");
    revalidatePath(`/auth/post/${props.number}`);

    return data;
  }
}
