import { useQuery } from '@tanstack/react-query';
import { getUserDetailsService } from '@/services/profile.service';
import { useSession } from 'next-auth/react';

const useProfileQuery = (userId: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (session?.accessToken) {
        return await getUserDetailsService(userId, session.accessToken);
      }
    },
  });
};

export default useProfileQuery;
