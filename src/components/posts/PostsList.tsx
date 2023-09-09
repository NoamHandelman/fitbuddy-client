'use client';

import { FC, useEffect, useRef } from 'react';
import PostItem from './post-item/PostItem';
import Spinner from '../ui/Spinner';
import { useIntersection } from '@mantine/hooks';
import useError from '@/hooks/useError';
import { Post } from '@/types/post';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
interface PostsListProps {
  userId?: string;
  posts: Post[];
  isLoading: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<Post[] | undefined, unknown>>;
  isFetchingNextPage: boolean;
  isError: boolean;
  error: unknown;
}

const PostsList: FC<PostsListProps> = ({
  error,
  fetchNextPage,
  isError,
  isFetchingNextPage,
  isLoading,
  posts,
}) => {
  const { errorHandler } = useError();

  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  if (isError) {
    errorHandler(error);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (posts) {
    if (posts.length === 0) {
      return (
        <h1 className="text-3xl font-bold text-teal-600 mt-6">
          Noting to see here...
        </h1>
      );
    }

    return (
      <section className="max-w-2xl mx-auto px-4 sm:px-0">
        {posts.map((post, i) => {
          if (i === posts.length - 1) {
            return <PostItem key={post._id} post={post} lastPostRef={ref} />;
          }
          return <PostItem key={post._id} post={post} />;
        })}
        {isFetchingNextPage && <Spinner size="medium" />}
      </section>
    );
  }
};
export default PostsList;
