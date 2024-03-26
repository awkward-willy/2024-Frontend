"use server";

import { auth } from "@/lib/auth";

export async function deletePost(postNumber: string) {
  const session = await auth();
  const token = session?.access_token;

  let header;
  if (token) {
    header = {
      Authorization: `token ${token}`,
    };
  } else {
    header = {};
  }
  const response = await fetch(
    `https://api.github.com/repos/awkward-willy/test/issues/${postNumber}`,
    {
      method: "PATCH",
      headers: header,
      body: JSON.stringify({ state: "closed" }),
    },
  );
  return response.status;
}
