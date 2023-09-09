import { useQuery } from '@tanstack/react-query';
import { getCommentsService } from '@/services/comment.service';
import { useSession } from 'next-auth/react';

const useCommentQuery = (postId: string) => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      if (session?.accessToken) {
        return await getCommentsService(postId, session.accessToken);
      }
    },
  });
};

export default useCommentQuery;
