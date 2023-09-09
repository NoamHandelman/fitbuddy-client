import { getUserPostsService } from '@/services/post.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const useGetUserPosts = (userId: string) => {
  const { data: session } = useSession();

  return useInfiniteQuery(
    ['posts', userId],
    async ({ pageParam = 1 }) => {
      if (session?.accessToken) {
        const data = await getUserPostsService(
          pageParam.toString(),
          userId,
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
};

export default useGetUserPosts;
