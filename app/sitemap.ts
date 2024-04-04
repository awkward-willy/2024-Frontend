import { fetchPosts } from "@/actions/fetchPosts";
import env from "@/lib/env";

export default async function sitemap() {
  const posts = await fetchPosts({ page: 1, limit: 30 });

  const postsUrls = posts.map((post) => ({
    url: `${env.NEXT_PUBLIC_BASE_URL}/auth/post/${post.number}`,
    lastModified: new Date(post.updated_at ?? new Date()).toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/auth`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.9,
    },
    ...postsUrls,
  ];
}
