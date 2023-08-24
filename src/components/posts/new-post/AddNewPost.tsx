'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import defaultImage from '../../../../public/images/user-photo.png';
const NewPost = dynamic(() => import('@/components/posts/new-post/NewPost'));
import { useAppContext } from '@/context/app.context';

const AddNewPost: FC = () => {
  const { user, showNewPostContainer, setShowNewPostContainer } =
    useAppContext();

  return (
    <>
      {showNewPostContainer && (
        <NewPost setShowNewPostContainer={setShowNewPostContainer} />
      )}
      <div className="flex items-center justify-center mt-6 mb-2 shadow-md p-6 rounded-lg bg-white">
        <div className="inline-flex items-center justify-center gap-7">
          <Image
            className="w-10 h-10 rounded-full"
            src={user?.imageUrl || defaultImage}
            width={38}
            height={38}
            alt={user?.username || 'User image'}
          />
          <div
            className="p-4 bg-gray-200 opacity-60 rounded-3xl cursor-pointer hover:opacity-80"
            onClick={() => setShowNewPostContainer(true)}
          >
            <p>{`What do you want to share today, ${user?.username}?`}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewPost;
