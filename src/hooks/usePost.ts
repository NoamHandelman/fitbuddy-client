import {
  createPostService,
  deletePostService,
  editPostService,
  getAllPostsService,
  handleLikeService,
} from '@/services/post.service';
import { Post } from '@/types/post';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import useNotification from './useNotification';

const usePost = () => {
  const queryClient = useQueryClient();

  const { errorNotify, successNotify } = useNotification();

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['posts'],
      async ({ pageParam = 1 }) => {
        const data = await getAllPostsService(pageParam.toString());
        return data?.data?.posts;
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
    mutationFn: createPostService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      successNotify(data?.data.message);
    },
    onError: () => {
      errorNotify('Something went wrong, please try again');
    },
  });

  const { mutate: editPost } = useMutation({
    mutationFn: (editedPost: { text: string; editedPostId: string }) =>
      editPostService(editedPost.text, editedPost.editedPostId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['posts']);
      successNotify(data?.data.message);
    },
    onError: () => {
      errorNotify('Something went wrong, please try again');
    },
  });

  const { mutate: handleLike } = useMutation({
    mutationFn: handleLikeService,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
    onError: () => {
      errorNotify('Something went wrong, please try again');
    },
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: deletePostService,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['posts']);
      successNotify(data?.data.message);
    },
    onError: () => {
      errorNotify('Something went wrong, please try again');
    },
  });

  return {
    posts: data?.pages.flatMap((page) => page) as Post[],
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    createPost,
    editPost,
    handleLike,
    deletePost,
  };
};

export default usePost;
