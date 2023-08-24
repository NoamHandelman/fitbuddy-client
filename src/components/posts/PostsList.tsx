'use client';

import { FC, useEffect, useRef } from 'react';
import PostItem from './post-item/PostItem';
import Spinner from '../ui/Spinner';
import { useIntersection } from '@mantine/hooks';
import usePost from '@/hooks/usePost';

interface PostsListProps {
  userId?: string;
}

const PostsList: FC<PostsListProps> = ({ userId }) => {
  const { posts, isLoading, fetchNextPage, isFetchingNextPage } = usePost();

  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  if (isLoading) {
    return <Spinner />;
  }

  if (userId) {
    const userHasPosts = posts.some((post) => post.user._id === userId);
    if (!userHasPosts) {
      return (
        <h1 className="text-3xl font-bold text-teal-600 mt-6">
          Noting to see here...
        </h1>
      );
    }
  }

  const filteredPosts = userId
    ? posts.filter((post) => post.user._id === userId)
    : posts;

  if (userId && filteredPosts.length === 0) {
    return (
      <h1 className="text-3xl font-bold text-teal-600 mt-6">
        Nothing to see here...
      </h1>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-0">
      {filteredPosts.map((post, i) => {
        if (i === filteredPosts.length - 1) {
          return <PostItem key={post._id} post={post} lastPostRef={ref} />;
        }
        return <PostItem key={post._id} post={post} />;
      })}
      {isFetchingNextPage && <Spinner size="medium" />}
    </section>
  );
};
export default PostsList;
