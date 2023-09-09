import { getUserService } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const useUserQuery = (userId: string) => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => {
      if (session?.accessToken)
        return getUserService(userId, session?.accessToken);
    },
  });
};

export default useUserQuery;
