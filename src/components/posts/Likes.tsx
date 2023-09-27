import { FC } from 'react';
import Image from 'next/image';
import defaultImage from '@/../../public/images/user-photo.png';
import { Like } from '@/lib/types/post';

interface LikesProps {
  likes: Like[];
}

const Likes: FC<LikesProps> = ({ likes }) => {
  return (
    <div className="flex -space-x-2 overflow-hidden">
      {likes.slice(0, 3).map((like, i) => (
        <Image
          title={`${likes.length} likes`}
          key={i}
          width={16}
          height={16}
          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
          src={like.user.imageUrl || defaultImage}
          alt={like.user.username}
        />
      ))}
    </div>
  );
};

export default Likes;
