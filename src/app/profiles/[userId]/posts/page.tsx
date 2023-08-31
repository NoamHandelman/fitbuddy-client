'use client';

import { FC } from 'react';
import PostsList from '@/components/posts/PostsList';
import AddNewPost from '@/components/posts/new-post/AddNewPost';
import { useAppContext } from '@/context/app.context';
import useGetUserPosts from '@/hooks/posts/useGetUserPosts';
import { Post } from '@/types/post';

interface ProfilePostsPageProps {
  params: {
    userId: string;
  };
}

const ProfilePostsPage: FC<ProfilePostsPageProps> = ({ params }) => {
  const { user } = useAppContext();
  const { data, isLoading, fetchNextPage, isFetchingNextPage, isError, error } =
    useGetUserPosts(params.userId);

  const posts = data?.pages.flatMap((page) => page) as Post[];

  return (
    <div className="flex flex-col justify-center items-center">
      {user?._id === params.userId && <AddNewPost />}
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
