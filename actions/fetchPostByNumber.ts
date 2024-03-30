"use server";

import env from "@/lib/env";
import { Post } from "@/types/Post";

interface fetchPostByNumberProps {
  number: string;
  token?: string;
}

export async function fetchPostByNumber(props: fetchPostByNumberProps) {
  const token = props?.token ?? "";
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
    `https://api.github.com/repos/${adminName}/${repoName}/issues/${props.number}`,
    {
      method: "GET",
      headers: header,
    },
  ).then((res) => res.json());

  const data: Post = {
    id: response.id,
    number: response.number,
    title: response.title,
    body: response.body,
    comments: response.comments,
    labels: response.labels,
    state: response.state,
    created_at: new Date(response.created_at).toLocaleString(),
    user: response.user,
  };

  return data;
}
