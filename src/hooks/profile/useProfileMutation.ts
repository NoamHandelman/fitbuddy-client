import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteDetailsService,
  editProfileService,
} from '@/services/profile.service';
import useNotification from '@/hooks/useNotification';
import useError from '../useError';
import { useSession } from 'next-auth/react';

const useProfileMutation = () => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();
  const { successNotify } = useNotification();
  const { errorHandler } = useError();

  const { mutate: editProfile, isLoading: isLoadingEdit } = useMutation({
    mutationFn: async (userDetail: { detail: string; data: string }) => {
      if (session?.accessToken) {
        return await editProfileService(
          userDetail.detail,
          userDetail.data,
          session.accessToken
        );
      }
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries(['profile']);
        successNotify(data.message);
      }
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const { mutate: deleteDetail, isLoading: isLoadingDelete } = useMutation({
    mutationFn: async (detail: string) => {
      if (session?.accessToken) {
        return await deleteDetailsService(detail, session.accessToken);
      }
    },
    onSuccess: (message) => {
      if (message) {
        queryClient.invalidateQueries(['profile']);
        successNotify(message);
      }
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
