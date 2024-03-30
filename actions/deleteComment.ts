"use server";

import env from "@/lib/env";

interface deleteCommentProps {
  id: string;
  token?: string;
}

export async function deleteComment({ id, token }: deleteCommentProps) {
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
    `https://api.github.com/repos/${adminName}/${repoName}/issues/comments/${id}`,
    {
      method: "DELETE",
      headers: header,
    },
  );

  return response.status;
}
