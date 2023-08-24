import { useQuery } from '@tanstack/react-query';
import { getCommentsService } from '@/services/comment.service';

const useCommentQuery = (postId: string) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentsService(postId),
  });
};

export default useCommentQuery;
