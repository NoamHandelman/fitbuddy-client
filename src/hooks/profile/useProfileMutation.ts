import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteDetailsService,
  editProfileService,
} from '@/services/profile.service';
import useNotification from '@/hooks/useNotification';

const useProfileMutation = () => {
  const queryClient = useQueryClient();
  const { errorNotify, successNotify } = useNotification();

  const editProfileMutation = useMutation({
    mutationFn: (userDetail: { detail: string; data: string }) =>
      editProfileService(userDetail.detail, userDetail.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['profile']);
      successNotify(data?.data.message);
    },
    onError: (error: any) => {
      errorNotify(error.message);
    },
  });

  const deleteDetailMutation = useMutation({
    mutationFn: deleteDetailsService,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['profile']);
      successNotify(data?.data.message);
    },
  });

  return {
    editProfilePayload: {
      editProfile: editProfileMutation.mutate,
      isLoading: editProfileMutation.isLoading,
    },
    deleteDetailPayload: {
      deleteDetail: deleteDetailMutation.mutate,
      isLoading: deleteDetailMutation.isLoading,
    },
  };
};

export default useProfileMutation;
