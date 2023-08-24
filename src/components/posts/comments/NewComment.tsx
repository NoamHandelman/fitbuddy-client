import { FC, MouseEvent, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { AiOutlineSend } from 'react-icons/ai';
import defaultImage from '../../../../public/images/user-photo.png';
import { Comment } from '@/types/post';
import { useAppContext } from '@/context/app.context';
import useCommentMutation from '@/hooks/comments/useCommentMutation';
const Spinner = dynamic(() => import('@/components/ui/Spinner'));

interface NewCommentProps {
  postId: string;
  comments: Comment[];
}

const NewComment: FC<NewCommentProps> = ({ postId, comments }) => {
  const [commentInput, setCommentInput] = useState('');

  const { createComment, isLoadingCreation, editComment, isLoadingEdit } =
    useCommentMutation();

  const {
    user,
    currentCommentPostId,
    showNewCommentContainer,
    isEditingComment,
    editedCommentId,
  } = useAppContext();

  const handleAddComment = (e: MouseEvent<HTMLButtonElement>) => {
    if (isEditingComment && editedCommentId) {
      editComment({ commentId: editedCommentId, text: commentInput });
    } else {
      createComment({ postId, text: commentInput });
    }
    setCommentInput('');
  };

  useEffect(() => {
    if (isEditingComment && editedCommentId) {
      const comment = comments.find(
        (comment) => comment._id === editedCommentId
      );

      if (comment) {
        setCommentInput(comment.text);
      }
    } else {
      setCommentInput('');
    }
  }, [comments, isEditingComment, editedCommentId]);

  return (
    <section className="flex flex-col ">
      <div className="flex flex-row mb-2">
        {showNewCommentContainer && postId === currentCommentPostId && (
          <>
            <Image
              src={user?.imageUrl || defaultImage}
              alt={user?.username || 'User image'}
              width={24}
              height={24}
              className="w-6 h-6 rounded-full mr-4"
            />
            <div className="bg-gray-200 w-full flex flex-col rounded-lg p-2">
              <div className="flex flex-row justify-between">
                {' '}
                <textarea
                  autoFocus
                  placeholder="Write your comment here ..."
                  value={commentInput}
                  className="bg-transparent rounded-t-lg outline-none resize-none h-6 mb-2"
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                {(isLoadingEdit || isLoadingCreation) && (
                  <Spinner size="small" />
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleAddComment}
                  disabled={!commentInput}
                  className={` ${!commentInput ? 'cursor-not-allowed' : ''}`}
                >
                  <AiOutlineSend
                    className={` ${commentInput ? 'text-teal-600 ' : ''}`}
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default NewComment;
