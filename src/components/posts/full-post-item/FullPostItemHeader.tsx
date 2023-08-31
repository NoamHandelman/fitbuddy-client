import Link from 'next/link';
import { Dispatch, FC, SetStateAction } from 'react';
import Image from 'next/image';
import defaultImage from '@/../../public/images/user-photo.png';
import { IoCloseOutline } from 'react-icons/io5';
import PostDate from '../PostDate';
import PostOperationsContainer from '../PostOperationsContainer';
import { useAppContext } from '@/context/app.context';
import { User } from '@/types/user';

interface FullPostItemHeaderProps {
  user: User;
  createdAt: string;
  updatedAt: string;
  postId: string;
  text: string;
  setShowFullPost: Dispatch<SetStateAction<boolean>>;
}

const FullPostItemHeader: FC<FullPostItemHeaderProps> = ({
  user,
  createdAt,
  updatedAt,
  postId,
  text,
  setShowFullPost,
}) => {
  const {
    setShowNewCommentContainer,
    setEditedCommentId,
    setIsEditingComment,
    setCurrentCommentPostId,
  } = useAppContext();

  const handleCloseFullPostItem = () => {
    setShowFullPost(false);
    setShowNewCommentContainer(false);
    setEditedCommentId(null);
    setIsEditingComment(false);
    setCurrentCommentPostId(null);
  };

  return (
    <>
      <div className="flex items-center border-b border-gray-200 pb-4 justify-between">
        <Link
          href={`/profiles/${user._id}/posts`}
          onClick={() => setShowFullPost(false)}
        >
          <Image
            src={user.imageUrl || defaultImage}
            width={48}
            height={48}
            alt={user.username}
            className="w-12 h-12 rounded-full mr-4 cursor-pointer"
          />
        </Link>
        <h1 className="font-bold text-2xl">{`${user.username}'s post`}</h1>
        <IoCloseOutline
          className="cursor-pointer text-2xl hover:bg-gray-200 rounded-full"
          onClick={handleCloseFullPostItem}
        />
      </div>
      <div className="mt-4 flex flex-row justify-between items-center">
        <PostDate createdAt={createdAt} updatedAt={updatedAt} />
        <PostOperationsContainer
          postId={postId}
          postOwnerId={user._id}
          text={text}
        />
      </div>
    </>
  );
};

export default FullPostItemHeader;
