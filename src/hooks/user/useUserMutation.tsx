import { useMutation } from '@tanstack/react-query';
import {
  deleteUserService,
  editUserService,
  registerUserService,
} from '@/services/user.service';
import { RegisterUserInput, EditUserInput } from '@/schemas/user.schema';
import useNotification from '../useNotification';
import useError from '../useError';
import { signIn, signOut, useSession } from 'next-auth/react';

const useUserMutation = () => {
  const { data: session, update } = useSession();

  const { successNotify } = useNotification();

  const { errorHandler } = useError();

  const { mutate: registerUser, isLoading: isLoadingRegistration } =
    useMutation({
      mutationFn: (user: RegisterUserInput) => registerUserService(user),
      onSuccess: (userResponse, variables) => {
        if (userResponse) {
          signIn('credentials', {
            email: variables.email,
            password: variables.password,
            redirect: true,
            callbackUrl: '/home',
          });
          successNotify(userResponse.message);
        }
      },
      onError: (error) => {
        errorHandler(error);
      },
    });

  const { mutate: editUser, isLoading: isLoadingEdit } = useMutation({
    mutationFn: async (user: EditUserInput) => {
      if (session?.accessToken) {
        return await editUserService(user, session.accessToken);
      }
    },
    onSuccess: async (userResponse, variables) => {
      if (userResponse) {
        await update({
          ...session,
          user: {
            ...session?.user,
            ...(variables.email && { email: variables.email }),
            ...(variables.username && { username: variables.username }),
            ...(variables.password && { password: variables.password }),
          },
        });
        successNotify(userResponse.message);
      }
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const { mutate: deleteUser, isLoading: isLoadingDeletion } = useMutation({
    mutationFn: async () => {
      if (session?.accessToken) {
        return await deleteUserService(session.accessToken);
      }
    },
    onSuccess: (message) => {
      if (message) {
        signOut({ callbackUrl: '/', redirect: true });
        successNotify(message);
      }
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  return {
    registerUser,
    isLoadingRegistration,
    editUser,
    isLoadingEdit,
    deleteUser,
    isLoadingDeletion,
  };
};

export default useUserMutation;
