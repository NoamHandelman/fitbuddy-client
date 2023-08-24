'use client';

import { FC } from 'react';
import { Post } from '@/types/post';
import PostFooter from './PostFooter';
import Likes from '../Likes';
import PostHeader from './PostHeader';

interface PostItemProps {
  post: Post;
  lastPostRef?: (element: any) => void;
}

const PostItem: FC<PostItemProps> = ({ post, lastPostRef }) => {
  const { _id, text, likes, user, createdAt, updatedAt } = post;

  return (
    <article
      className="w-120 shadow-md p-6 m-4 bg-white rounded-lg relative"
      ref={lastPostRef}
    >
      <PostHeader
        username={user.username}
        createdAt={createdAt}
        updatedAt={updatedAt}
        postOwnerId={user._id}
        postId={_id}
        text={text}
        imageUrl={user.imageUrl}
      />
      <div className="mt-3 mb-8 overflow-auto break-words">{text}</div>
      {likes?.length > 0 && <Likes likes={likes} />}
      <PostFooter post={post} />
    </article>
  );
};
export default PostItem;
