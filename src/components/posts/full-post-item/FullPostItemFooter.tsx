import { Like } from '@/lib/types/post';
import { FC } from 'react';

import PostButtons from '../PostButtons';
import NewComment from '../comments/NewComment';
import CommentList from '../comments/CommentsList';
import useCommentQuery from '@/hooks/comments/useCommentQuery';
import useError from '@/hooks/useError';

interface FullPostItemFooterProps {
  likes: Like[];
  postId: string;
}

const FullPostItemFooter: FC<FullPostItemFooterProps> = ({ likes, postId }) => {
  const { data, isLoading, isError, error } = useCommentQuery(postId);

  const { errorHandler } = useError();

  const comments = data?.comments;

  if (isError) {
    errorHandler(error);
  }

  if (comments) {
    return (
      <>
        <PostButtons likes={likes} postId={postId} />
        <NewComment postId={postId} comments={comments} />
        {comments && (
          <CommentList
            postId={postId}
            comments={comments}
            isLoading={isLoading}
          />
        )}
      </>
    );
  }
};

export default FullPostItemFooter;
