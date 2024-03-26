import { Comment } from "@/types/Comment";

interface fetchCommentsProps {
  number: string;
  page?: number;
  limit?: number;
  token?: string;
}

export async function fetchComments(props: fetchCommentsProps) {
  const token = props?.token ?? "";
  const page = props?.page ?? 1;
  const limit = props?.limit ?? 10;
  const number = props.number;

  let header;
  if (token) {
    header = {
      Authorization: `token ${token}`,
    };
  } else {
    header = {};
  }

  const response = await fetch(
    `https://api.github.com/repos/awkward-willy/test/issues/${number}/comments?page=${page}&per_page=${limit}`,
    {
      method: "GET",
      headers: header,
    },
  ).then((res) => res.json());

  const data: Comment[] = response.map((data: Comment) => {
    return {
      id: data.id,
      body: data.body,
      created_at: new Date(data.created_at).toLocaleString(),
      user: data.user,
    };
  });

  return data;
}
