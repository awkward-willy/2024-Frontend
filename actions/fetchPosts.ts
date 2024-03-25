import { Post } from "@/types/Post";

interface fetchPostsProps {
  page?: number;
  limit?: number;
  token?: string;
  revalidate?: number;
}

export async function fetchPosts(props?: fetchPostsProps) {
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
    `https://api.github.com/repos/awkward-willy/test/issues?page=${page}&per_page=${limit}&state=open`,
    {
      method: "GET",
      headers: header,
      next: { revalidate: revalidate },
    }
  ).then((res) => res.json());

  const data: Post[] = response.map((data: Post) => {
    return {
      id: data.id,
      number: data.number,
      title: data.title,
      body: data.body,
      comments: data.comments,
      labels: data.labels,
      state: data.state,
      created_at: new Date(data.created_at).toLocaleString(),
      user: data.user,
    };
  });

  return data;
}
