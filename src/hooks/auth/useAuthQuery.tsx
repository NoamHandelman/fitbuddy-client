import { getUserService } from '@/services/auth.service';
import { useQuery } from '@tanstack/react-query';

const useAuthQuery = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserService(userId),
  });
};

export default useAuthQuery;
