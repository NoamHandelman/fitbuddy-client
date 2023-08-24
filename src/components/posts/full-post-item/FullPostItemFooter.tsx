import { Like, Comment } from '@/types/post';
import { FC } from 'react';

import PostButtons from '../PostButtons';
import NewComment from '../comments/NewComment';
import CommentList from '../comments/CommentsList';
import useCommentQuery from '@/hooks/comments/useCommentQuery';

interface FullPostItemFooterProps {
  likes: Like[];
  postId: string;
}

const FullPostItemFooter: FC<FullPostItemFooterProps> = ({ likes, postId }) => {
  const { data, isLoading } = useCommentQuery(postId);

  const comments = data?.data.comments as Comment[];

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
};

export default FullPostItemFooter;
