import { FC } from 'react';
import Spinner from '@/components/ui/Spinner';
import CommentItem from './comment-item/CommentItem';
import { Comment } from '@/lib/types/post';

interface CommentsListProps {
  comments: Comment[];
  postId: string;
  isLoading: boolean;
}

const CommentList: FC<CommentsListProps> = ({
  comments,
  postId,
  isLoading,
}) => {
  return (
    <section className="flex flex-col overflow-y-auto max-h-40 pb-20">
      {isLoading ? (
        <Spinner />
      ) : (
        comments.map((comment) => {
          return (
            <CommentItem
              key={comment._id}
              text={comment.text}
              commentOwnerId={comment.user._id}
              imageUrl={comment.user.imageUrl}
              commentId={comment._id}
              username={comment.user.username}
              postId={postId}
            />
          );
        })
      )}
    </section>
  );
};

export default CommentList;
