import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import { Post } from '@/types/post';
import PostButtons from '../PostButtons';
import NewComment from '@/components/posts/comments/NewComment';
import { useAppContext } from '@/context/app.context';
import CommentItem from '../comments/comment-item/CommentItem';
const FullPostItem = dynamic(
  () => import('@/components/posts/full-post-item/FullPostItem')
);

interface PostFooterProps {
  post: Post;
}

const PostFooter: FC<PostFooterProps> = ({ post }) => {
  const { _id: postId, likes, comments } = post;
  const [showFullPost, setShowFullPost] = useState(false);
  const { setShowNewCommentContainer } = useAppContext();

  const comment = comments[0];

  return (
    <footer className="flex flex-col">
      <PostButtons likes={likes} postId={postId} />
      <NewComment postId={postId} comments={comments} />
      {comments.length > 0 && comment && (
        <CommentItem
          text={comment.text}
          commentOwnerId={comment.user._id}
          commentId={comment._id}
          postId={postId}
          imageUrl={comment.user.imageUrl}
          username={comment.user.username}
        />
      )}
      {comments.length > 1 && (
        <div>
          <button
            type="button"
            className="font-medium text-gray-500 hover:underline"
            onClick={() => {
              setShowFullPost(true);
              setShowNewCommentContainer(false);
            }}
          >
            Show all comments
          </button>
          {showFullPost && (
            <FullPostItem post={post} setShowFullPost={setShowFullPost} />
          )}
        </div>
      )}
    </footer>
  );
};
export default PostFooter;
