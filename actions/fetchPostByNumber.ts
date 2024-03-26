import { Post } from "@/types/Post";

interface fetchPostByNumberProps {
  number: string;
  token?: string;
}

export async function fetchPostByNumber(props: fetchPostByNumberProps) {
  const token = props?.token ?? "";

  let header;
  if (token) {
    header = {
      Authorization: `token ${token}`,
    };
  } else {
    header = {};
  }

  const response = await fetch(
    `https://api.github.com/repos/awkward-willy/test/issues/${props.number}`,
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
