'use client';

import { FC } from 'react';
import PostsList from '@/components/posts/PostsList';
import AddNewPost from '@/components/posts/new-post/AddNewPost';
import useGetUserPosts from '@/hooks/posts/useGetUserPosts';
import { Post } from '@/lib/types/post';
import { useSession } from 'next-auth/react';

interface ProfilePostsPageProps {
  params: {
    userId: string;
  };
}

const ProfilePostsPage: FC<ProfilePostsPageProps> = ({ params }) => {
  const { data: session } = useSession();

  const { data, isLoading, fetchNextPage, isFetchingNextPage, isError, error } =
    useGetUserPosts(params.userId);

  const posts = data?.pages.flatMap((page) => page) as Post[];

  return (
    <div className="flex flex-col justify-center items-center">
      {session?.user._id === params.userId && <AddNewPost />}
      <PostsList
        posts={posts}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isError={isError}
        error={error}
      />
    </div>
  );
};

export default ProfilePostsPage;
