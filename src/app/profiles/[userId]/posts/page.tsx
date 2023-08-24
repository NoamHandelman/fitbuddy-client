'use client';

import { FC } from 'react';
import PostsList from '@/components/posts/PostsList';
import AddNewPost from '@/components/posts/new-post/AddNewPost';
import { useAppContext } from '@/context/app.context';

interface ProfilePostsPageProps {
  params: {
    userId: string;
  };
}

const ProfilePostsPage: FC<ProfilePostsPageProps> = ({ params }) => {
  const { user } = useAppContext();

  return (
    <div className="flex flex-col justify-center items-center">
      {user?._id === params.userId && <AddNewPost />}
      <PostsList userId={params.userId} />
    </div>
  );
};

export default ProfilePostsPage;
