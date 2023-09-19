'use client';

import {
  createPostService,
  deletePostService,
  editPostService,
  getAllPostsService,
  handleLikeService,
} from '@/services/post.service';
import { Post } from '@/types/post';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import useNotification from '../useNotification';
import useError from '../useError';
import { useSession } from 'next-auth/react';

const usePost = () => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const { successNotify } = useNotification();

  const { errorHandler } = useError();

  const { data, isLoading, fetchNextPage, isFetchingNextPage, isError, error } =
    useInfiniteQuery(
      ['posts'],
      async ({ pageParam = 1 }) => {
        if (session?.accessToken) {
          const data = await getAllPostsService(
            pageParam.toString(),
            session?.accessToken
          );
          return data;
        }
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (!lastPage) {
            return;
          }
          const nextPage =
            lastPage.length === 3 ? allPages.length + 1 : undefined;
          return nextPage;
        },
      }
    );

  const { mutate: createPost } = useMutation({
    mutationFn: async (text: string) => {
      if (session?.accessToken) {
        return await createPostService(text, session?.accessToken);
      }
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      const previousPosts = queryClient.getQueryData(['posts']);

      type CustomData = {
        pages: Post[][];
        pageParams?: any[] | undefined;
      };

      queryClient.setQueryData(['posts'], (oldData: CustomData | undefined) => {
        const oldPosts = oldData?.pages || [];

        return {
          ...oldData,
          pages: [
            ...oldPosts,
            [
              {
                _id: Math.floor(Math.random() * 1000000).toString(),
                user: {
                  _id: session?.user._id || '',
                  username: session?.user.username || '',
                  imageUrl: session?.user.imageUrl || '',
                },
                comments: [],
                createdAt: new Date().toISOString(),
                likes: [],
                text: newPost,
              },
            ],
          ],
        };
      });

      successNotify('Post created successfully');

      return { previousPosts };
    },
    // onSuccess: (data) => {
    //   if (data) {
    //     queryClient.invalidateQueries({ queryKey: ['posts'] });
    //     successNotify(data?.data.message);
    //   }
    // },
    onError: (error, newPost, context) => {
      queryClient.setQueryData(['posts'], context?.previousPosts);
      errorHandler(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const { mutate: editPost } = useMutation({
    mutationFn: async (editedPost: { text: string; editedPostId: string }) => {
      if (session?.accessToken) {
        return await editPostService(
          editedPost.text,
          editedPost.editedPostId,
          session.accessToken
        );
      }
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries(['posts']);
        successNotify(data?.data.message);
      }
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const { mutate: handleLike } = useMutation({
    mutationFn: async (postId: string) => {
      if (session?.accessToken) {
        return await handleLikeService(postId, session.accessToken);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: async (postId: string) => {
      if (session?.accessToken) {
        return await deletePostService(postId, session.accessToken);
      }
    },
    onSuccess: (message) => {
      if (message) {
        queryClient.invalidateQueries(['posts']);
        successNotify(message);
      }
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  return {
    posts: data?.pages.flatMap((page) => page) as Post[],
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
    createPost,
    editPost,
    handleLike,
    deletePost,
  };
};

export default usePost;
