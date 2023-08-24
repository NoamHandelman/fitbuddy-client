import { FC, useEffect, useState } from 'react';
import { SlLike } from 'react-icons/sl';
import { BiCommentEdit } from 'react-icons/bi';
import { Like } from '@/types/post';
import { useAppContext } from '@/context/app.context';
import usePost from '@/hooks/usePost';

interface PostButtonsProps {
  postId: string;
  likes: Like[];
}

const PostButtons: FC<PostButtonsProps> = ({ postId, likes }) => {
  const [isUserPressedLike, setIsUserPressedLike] = useState(false);

  const {
    user,
    showNewCommentContainer,
    setShowNewCommentContainer,
    setCurrentCommentPostId,
    setIsEditingComment,
    setEditedCommentId,
  } = useAppContext();

  const { handleLike } = usePost();

  useEffect(() => {
    const userHasLiked = likes.some((like) => like.user._id === user?._id);
    setIsUserPressedLike(userHasLiked);
  }, [likes, user]);

  const handleToggleNewCommentContainer = () => {
    if (!showNewCommentContainer) {
      setCurrentCommentPostId(postId);
    } else {
      setCurrentCommentPostId(null);
    }
    setIsEditingComment(false);
    setEditedCommentId(null);
    setShowNewCommentContainer((prevState) => !prevState);
  };

  return (
    <>
      <div className=" flex py-1 border-y-2 my-2 w-full justify-end">
        <button
          type="button"
          className={`${
            isUserPressedLike ? 'text-blue-500' : ''
          } mr-4 text-lg hover:bg-gray-200 rounded-full p-2`}
          onClick={() => {
            handleLike(postId);
            setIsUserPressedLike((prevState) => !prevState);
          }}
        >
          <SlLike />
        </button>
        <button
          type="button"
          className="hover:bg-gray-200 rounded-full p-2 text-lg"
          onClick={handleToggleNewCommentContainer}
        >
          <BiCommentEdit />
        </button>
      </div>
    </>
  );
};
export default PostButtons;
