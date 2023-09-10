'use client';

import PostsList from '@/components/posts/PostsList';
import AddNewPost from '@/components/posts/new-post/AddNewPost';
import usePost from '@/hooks/posts/usePost';

const HomePage = () => {
  const {
    posts,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = usePost();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <AddNewPost />
      <PostsList
        posts={posts}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isError={isError}
        error={error}
      />
    </main>
  );
};

export default HomePage;
