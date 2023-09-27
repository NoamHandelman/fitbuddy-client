'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import defaultImage from '../../../../public/images/user-photo.png';
const NewPost = dynamic(() => import('@/components/posts/new-post/NewPost'));
import { useAppContext } from '@/context/appContext';
import { useSession } from 'next-auth/react';

const AddNewPost = () => {
  const { data: session } = useSession();
  const { showNewPostContainer, setShowNewPostContainer } = useAppContext();

  return (
    <div className="px-2">
      {showNewPostContainer && (
        <NewPost setShowNewPostContainer={setShowNewPostContainer} />
      )}
      <div className="flex items-center justify-center w-[min(100%,32rem)] p-3  mt-6 mb-2 shadow-md sm:p-6 rounded-lg bg-white">
        <div className="inline-flex items-center justify-center gap-7">
          <Image
            className="w-10 h-10 rounded-full"
            src={session?.user.imageUrl || defaultImage}
            width={38}
            height={38}
            alt={session?.user.username || 'User image'}
          />
          <div
            className="p-4 bg-gray-200 opacity-60 rounded-3xl cursor-pointer hover:opacity-80"
            onClick={() => setShowNewPostContainer(true)}
          >
            <p>{`What do you want to share today, ${session?.user.username}?`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPost;
