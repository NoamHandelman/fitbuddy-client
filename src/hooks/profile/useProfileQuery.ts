import { useQuery } from '@tanstack/react-query';
import { getUserDetailsService } from '@/services/profile.service';

const useProfileQuery = (userId: string) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUserDetailsService(userId),
  });
};

export default useProfileQuery;
