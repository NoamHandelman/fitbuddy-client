'use client';

import PostsList from '@/components/posts/PostsList';
import AddNewPost from '@/components/posts/new-post/AddNewPost';
import Spinner from '@/components/ui/Spinner';
import usePost from '@/hooks/posts/usePost';
import { useSession } from 'next-auth/react';

const HomePage = () => {
  const { data: session } = useSession();

  const {
    posts,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = usePost();

  if (!session?.accessToken) {
    return <Spinner />;
  }

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
