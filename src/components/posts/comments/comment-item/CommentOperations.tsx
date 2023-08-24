import { FC, useState } from 'react';
import { PiDotsThreeBold } from 'react-icons/pi';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useAppContext } from '@/context/app.context';
import useCommentMutation from '@/hooks/comments/useCommentMutation';

interface CommentOperationsProps {
  commentOwnerId: string;
  commentId?: string;
  postId: string;
}

const CommentOperations: FC<CommentOperationsProps> = ({
  commentId,
  commentOwnerId,
  postId,
}) => {
  const [showCommentOperations, setShowCommentOperations] =
    useState<boolean>(false);

  const { deleteComment } = useCommentMutation();

  const {
    user,
    setCurrentCommentPostId,
    setShowNewCommentContainer,
    setIsEditingComment,
    setEditedCommentId,
  } = useAppContext();

  const handleEditComment = () => {
    setIsEditingComment(true);
    if (commentId) {
      setEditedCommentId(commentId);
    }
    setShowNewCommentContainer(true);
    setCurrentCommentPostId(postId);
    setShowCommentOperations(false);
  };

  const ref = useOutsideClick(() => setShowCommentOperations(false));

  return (
    <>
      {' '}
      {user?._id === commentOwnerId && (
        <section className="relative" ref={ref}>
          <PiDotsThreeBold
            className="cursor-pointer text-lg hover:bg-gray-200 rounded-full"
            onClick={() => setShowCommentOperations((prevState) => !prevState)}
          />
          {showCommentOperations && commentId && (
            <div className="absolute min-w-max  top-full mt-2 bg-white rounded-md overflow-hidden shadow-2xl z-10">
              <button
                type="button"
                className="block w-full px-4 py-2 font-medium  hover:bg-gray-300"
                onClick={() => {
                  deleteComment(commentId);
                  setShowCommentOperations(false);
                }}
              >
                Delete comment
              </button>
              <button
                type="button"
                className="block w-full px-4 py-2 font-medium  hover:bg-gray-300   border-t-2"
                onClick={handleEditComment}
              >
                Edit comment
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};
export default CommentOperations;
