import { CustomError } from '@/lib/utils/CustomError';
import useNotification from './useNotification';
import { useRouter } from 'next/navigation';
import { removeUserFromLocalStorage } from '@/lib/utils/localStorage';
import { useQueryClient } from '@tanstack/react-query';

const useError = () => {
  const { errorNotify } = useNotification();
  const router = useRouter();
  const queryClient = useQueryClient();

  const errorHandler = (error: unknown) => {
    if (error instanceof CustomError) {
      errorNotify(error.message);
      if (error.status === 401) {
        removeUserFromLocalStorage('user');
        router.push('/');
        queryClient.removeQueries();
        return;
      }
    } else {
      errorNotify('Something went wrong, please try again');
    }
  };

  return { errorHandler };
};

export default useError;
