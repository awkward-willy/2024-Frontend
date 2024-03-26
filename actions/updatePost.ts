"use server";
import { auth } from "@/lib/auth";

export async function updatePost(formdata: FormData, id: number) {
  const session = await auth();
  if (session) {
    const title = formdata.get("title");
    const body = formdata.get("body");
    const response = await fetch(
      `https://api.github.com/repos/awkward-willy/test/issues/${id}`,
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
