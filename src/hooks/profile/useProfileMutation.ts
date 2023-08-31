import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteDetailsService,
  editProfileService,
} from '@/services/profile.service';
import useNotification from '@/hooks/useNotification';
import useError from '../useError';

const useProfileMutation = () => {
  const queryClient = useQueryClient();
  const { successNotify } = useNotification();
  const { errorHandler } = useError();

  const { mutate: editProfile, isLoading: isLoadingEdit } = useMutation({
    mutationFn: (userDetail: { detail: string; data: string }) =>
      editProfileService(userDetail.detail, userDetail.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['profile']);
      successNotify(data.message);
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const { mutate: deleteDetail, isLoading: isLoadingDelete } = useMutation({
    mutationFn: deleteDetailsService,
    onSuccess: (message) => {
      queryClient.invalidateQueries(['profile']);
      successNotify(message);
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  return {
    editProfile,
    isLoadingEdit,
    deleteDetail,
    isLoadingDelete,
  };
};

export default useProfileMutation;
