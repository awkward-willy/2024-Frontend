"use server";

import { revalidatePath, revalidateTag } from "next/cache";

interface deleteCommentProps {
  id: string;
  token?: string;
}

export async function deleteComment({ id, token }: deleteCommentProps) {
  let header;
  if (token) {
    header = {
      Authorization: `token ${token}`,
    };
  } else {
    header = {};
  }
  const response = await fetch(
    `https://api.github.com/repos/awkward-willy/test/issues/comments/${id}`,
    {
      method: "DELETE",
      headers: header,
    }
  );

  return response.status;
}
