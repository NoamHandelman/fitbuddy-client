import { FC } from 'react';
import Image from 'next/image';
import defaultImage from '../../../../../public/images/user-photo.png';
import Link from 'next/link';
import CommentOperations from './CommentOperations';

interface CommentItemProps {
  text: string;
  commentOwnerId: string;
  commentId?: string;
  postId: string;
  imageUrl?: string;
  username: string;
}

const CommentItem: FC<CommentItemProps> = ({
  text,
  commentOwnerId,
  commentId,
  postId,
  imageUrl,
  username,
}) => {
  return (
    <article className="flex flex-row mb-2">
      <Link href={`/profiles/${commentOwnerId}/posts`}>
        <div className="mr-4 cursor-pointer">
          <Image
            src={imageUrl || defaultImage}
            alt={username}
            height={24}
            width={24}
            className="w-6 h-6 rounded-full"
          />
        </div>
      </Link>

      <div className="flex flex-grow items-center space-x-4 ">
        <div className="bg-gray-200 flex-shrink-1 rounded-lg p-2">
          <p>{text}</p>
        </div>
        <CommentOperations
          commentOwnerId={commentOwnerId}
          commentId={commentId}
          postId={postId}
        />
      </div>
    </article>
  );
};

export default CommentItem;
