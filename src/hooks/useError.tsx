import { CustomError } from '@/lib/utils/CustomError';
import useNotification from './useNotification';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

const useError = () => {
  const { errorNotify } = useNotification();
  const queryClient = useQueryClient();

  const errorHandler = (error: unknown) => {
    if (error instanceof CustomError) {
      if (error.status === 401) {
        setTimeout(() => {
          signOut({ callbackUrl: '/', redirect: true });
        }, 2000);
        queryClient.removeQueries();
        errorNotify(error.message);
        return;
      }
      errorNotify(error.message);
    } else {
      errorNotify('Something went wrong, please try again');
    }
  };

  return { errorHandler };
};

export default useError;
