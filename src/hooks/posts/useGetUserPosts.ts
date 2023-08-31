import { getUserPostsService } from '@/services/post.service';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetUserPosts = (userId: string) => {
  return useInfiniteQuery(
    ['posts', userId],
    async ({ pageParam = 1 }) => {
      const data = await getUserPostsService(pageParam.toString(), userId);
      return data;
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
};

export default useGetUserPosts;
