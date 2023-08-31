import { useMutation } from '@tanstack/react-query';
import {
  deleteUserService,
  editUserService,
  loginUserService,
  logoutUserService,
  registerUserService,
} from '@/services/user.service';
import {
  LoginUserInput,
  RegisterUserInput,
  EditUserInput,
} from '@/schemas/user.schema';
import {
  saveUserToLocalStorage,
  removeUserFromLocalStorage,
} from '../../lib/utils/localStorage';
import { useRouter } from 'next/navigation';
import useNotification from '../useNotification';
import { useAppContext } from '@/context/app.context';
import { UserResponse } from '@/types/userResponse';
import useError from '../useError';

const useUserMutation = () => {
  const { successNotify } = useNotification();

  const router = useRouter();

  const { setUser } = useAppContext();

  const { errorHandler } = useError();

  const handleSetUserOperation = (
    userResponse: UserResponse,
    route?: string
  ) => {
    if (userResponse.user) {
      successNotify(userResponse.message);
      saveUserToLocalStorage('user', userResponse.user);
      setUser(userResponse.user);
      if (route) router.push(route);
    }
  };

  const handleUnsetUserOperations = () => {
    removeUserFromLocalStorage('user');
    setUser(null);
    router.push('/');
  };

  const { mutate: loginUser } = useMutation({
    mutationFn: (user: LoginUserInput) => loginUserService(user),
    onSuccess: (userResponse) => {
      handleSetUserOperation(userResponse, '/home');
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const { mutate: registerUser } = useMutation({
    mutationFn: (user: RegisterUserInput) => registerUserService(user),
    onSuccess: (userResponse) => {
      handleSetUserOperation(userResponse, '/home');
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const { mutate: editUser, isLoading: isLoadingEdit } = useMutation({
    mutationFn: (user: EditUserInput) => editUserService(user),
    onSuccess: (userResponse) => {
      handleSetUserOperation(userResponse);
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const { mutate: deleteUser, isLoading: isLoadingDeletion } = useMutation({
    mutationFn: deleteUserService,
    onSuccess: (message) => {
      successNotify(message);
      handleUnsetUserOperations();
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const { mutate: logoutUser } = useMutation({
    mutationFn: logoutUserService,
    onSuccess: () => {
      handleUnsetUserOperations();
    },
    onError: (error) => {
      errorHandler(error);
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

export default useUserMutation;
