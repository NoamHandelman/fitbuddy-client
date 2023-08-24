import { useMutation } from '@tanstack/react-query';
import {
  deleteUserService,
  editUserService,
  loginUserService,
  logoutUserService,
  registerUserService,
} from '@/services/auth.service';
import {
  LoginUserInput,
  RegisterUserInput,
  EditUserInput,
} from '@/schemas/user.schema';
import {
  saveUserToLocalStorage,
  removeUserFromLocalStorage,
} from '../lib/utils/localStorage';
import { useRouter } from 'next/navigation';
import useNotification from './useNotification';
import { useAppContext } from '@/context/app.context';
import { UserResponse } from '@/types/userResponse';

const useAuth = () => {
  const { errorNotify, successNotify } = useNotification();
  const router = useRouter();
  const { setUser } = useAppContext();

  const handleSetUserOperation = (data: UserResponse, route?: string) => {
    successNotify(data.message);
    saveUserToLocalStorage('user', data.user);
    setUser(data.user);
    if (route) router.push(route);
  };

  const handleUnsetUserOperations = () => {
    removeUserFromLocalStorage('user');
    setUser(null);
    router.push('/');
  };

  const { mutate: loginUser } = useMutation({
    mutationFn: (user: LoginUserInput) => loginUserService(user),
    onSuccess: (data) => {
      if (data.response.status !== 200) {
        return errorNotify(data.data.message);
      }
      handleSetUserOperation(data.data, '/home');
    },
    onError: () => {
      errorNotify('Failed to login, please try again later!');
    },
  });

  const { mutate: registerUser } = useMutation({
    mutationFn: (user: RegisterUserInput) => registerUserService(user),
    onSuccess: (data) => {
      if (data.response.status !== 201) {
        return errorNotify(data.data.message);
      }
      handleSetUserOperation(data.data, '/home');
    },
    onError: () => {
      errorNotify('Failed to register, please try again later!');
    },
  });

  const { mutate: editUser, isLoading: isLoadingEdit } = useMutation({
    mutationFn: (user: EditUserInput) => editUserService(user),
    onSuccess: (data) => {
      if (data.response.status !== 200) {
        return errorNotify(data.data.message);
      }
      handleSetUserOperation(data.data);
    },
    onError: () => {
      errorNotify('Failed to edit account, please try again later!');
    },
  });

  const { mutate: deleteUser, isLoading: isLoadingDeletion } = useMutation({
    mutationFn: deleteUserService,
    onSuccess: (data) => {
      if (data.response.status !== 200) {
        return errorNotify(data.message);
      }
      successNotify(data.message);
      handleUnsetUserOperations();
    },
    onError: () => {
      errorNotify('Failed to delete account, please try again later!');
    },
  });

  const { mutate: logoutUser } = useMutation({
    mutationFn: logoutUserService,
    onSuccess: (data) => {
      if (data.response.status !== 200) {
        return errorNotify(data.message);
      }
      handleUnsetUserOperations();
    },
    onError: () => {
      errorNotify('Failed to logging out, please try again later!');
    },
  });

  return {
    loginUser,
    registerUser,
    editUser,
    isLoadingEdit,
    deleteUser,
    isLoadingDeletion,
    logoutUser,
  };
};

export default useAuth;
