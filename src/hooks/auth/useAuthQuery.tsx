import { getUserService } from '@/services/auth.service';
import { useQuery } from '@tanstack/react-query';

const useAuthQuery = (userId: string) => {
  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserService(userId),
  });

  return { data };
};

export default useAuthQuery;
