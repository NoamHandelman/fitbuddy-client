'use client';

import { FC } from 'react';
import defaultImage from '../../../../public/images/user-photo.png';
import Image from 'next/image';
import PostOperationsContainer from '../PostOperationsContainer';
import Link from 'next/link';
import PostDate from '../PostDate';

interface PostHeaderProps {
  username: string;
  createdAt: string;
  updatedAt: string;
  postOwnerId: string;
  postId: string;
  text: string;
  imageUrl?: string;
}

const PostHeader: FC<PostHeaderProps> = ({
  username,
  createdAt,
  updatedAt,
  postOwnerId,
  postId,
  text,
  imageUrl,
}) => {
  return (
    <header className="flex justify-between items-start mb-4 relative">
      <div className="flex items-center text-teal-600">
        <Link href={`/profiles/${postOwnerId}/posts`}>
          <Image
            className="w-10 h-10 rounded-full mr-4 cursor-pointer"
            src={imageUrl || defaultImage}
            alt={username}
            width={40}
            height={40}
          />
        </Link>
        <div className="flex flex-col">
          <Link
            href={`/profiles/${postOwnerId}/posts`}
            className="font-bold hover:underline"
          >
            {username}
          </Link>
          <PostDate createdAt={createdAt} updatedAt={updatedAt} />
        </div>
      </div>
      <PostOperationsContainer
        postOwnerId={postOwnerId}
        postId={postId}
        text={text}
      />
    </header>
  );
};
export default PostHeader;
