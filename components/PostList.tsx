import { fetchPosts } from "@/actions/fetchPosts";
import { auth } from "@/lib/auth";
import InfiniteScrollPost from "@components/InfiniteScrollPost";

const PostList = async () => {
  const session = await auth();
  const data = await fetchPosts({ token: session?.access_token });

  return (
    <>
      <InfiniteScrollPost
        initialPosts={data}
        token={session?.access_token}
        endofPosts={data.length < 10}
        userName={session?.user.accountName}
      />
    </>
  );
};

export default PostList;
