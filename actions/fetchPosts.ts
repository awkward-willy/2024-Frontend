"use server";

import env from "@/lib/env";
import { Post } from "@/types/Post";

interface fetchPostsProps {
  page?: number;
  limit?: number;
  token?: string;
  revalidate?: number;
}

export async function fetchPosts(props?: fetchPostsProps) {
  const adminName = env.GITHUB_ADMIN_NAME;
  const repoName = env.GITHUB_REPO_NAME;

  // default page is 1, limit is 10, token is empty string
  const page = props?.page ?? 1;
  const limit = props?.limit ?? 10;
  const token = props?.token ?? "";
  // default revalidate time is 300 seconds(5 minutes)
  const revalidate = props?.revalidate ?? 300;

  let header;
  if (token) {
    header = {
      Authorization: `token ${token}`,
    };
  } else {
    header = {};
  }

  const response = await fetch(
    `https://api.github.com/repos/${adminName}/${repoName}/issues?page=${page}&per_page=${limit}&state=open`,
    {
      method: "GET",
      headers: header,
      next: { revalidate: revalidate },
    },
  ).then((res) => res.json());

  const data: Post[] = response.map((data: Post) => {
    return {
      id: data.id,
      number: data.number,
      title: data.title,
      body: data.body,
      comments: data.comments,
      state: data.state,
      created_at: new Date(data.created_at).toLocaleString(),
      updated_at: new Date(data.updated_at ?? new Date()),
      user: data.user,
    };
  });

  return data;
}
