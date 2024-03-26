"use server";
import { auth } from "@lib/auth";
import { revalidatePath } from "next/cache";

export async function createPosts(formData: FormData) {
  const session = await auth();
  if (session) {
    const rawFormData = {
      title: formData.get("title"),
      body: formData.get("body"),
    };
    const response = await fetch(
      "https://api.github.com/repos/awkward-willy/test/issues",
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
