import { getUserService } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';

const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserService(userId),
  });
};

export default useUserQuery;
