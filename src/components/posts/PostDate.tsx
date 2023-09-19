import { FC } from 'react';
import { formatPostDates } from '@/lib/utils/dateFormatters';

interface PostDateProps {
  createdAt: string;
  updatedAt?: string;
}

const PostDate: FC<PostDateProps> = ({ createdAt, updatedAt }) => {
  return (
    <time className="text-sm text-gray-700">
      {createdAt !== updatedAt && updatedAt ? 'Edited at' : 'Posted at'}{' '}
      {formatPostDates(createdAt, updatedAt)}
    </time>
  );
};

export default PostDate;
