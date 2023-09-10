import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createCommentService,
  deleteCommentService,
  editCommentService,
} from '@/services/comment.service';
import useNotification from '@/hooks/useNotification';
import { useAppContext } from '@/lib/context/appContext';
import useError from '../useError';
import { useSession } from 'next-auth/react';

const useCommentMutation = () => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const { successNotify } = useNotification();

  const { errorHandler } = useError();

  const {
    setShowNewCommentContainer,
    setCurrentCommentPostId,
    setIsEditingComment,
    setEditedCommentId,
  } = useAppContext();

  const { mutate: createComment, isLoading: isLoadingCreation } = useMutation({
    mutationFn: async (createdComment: { postId: string; text: string }) => {
      if (session?.accessToken) {
        return await createCommentService(
          createdComment.postId,
          createdComment.text,
          session.accessToken
        );
      }
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries(['comments']);
        queryClient.invalidateQueries(['posts']);
        setShowNewCommentContainer(false);
        setCurrentCommentPostId(null);
        successNotify(data?.message);
      }
    },
    onError: (error) => {
      errorHandler(error);
      setShowNewCommentContainer(false);
      setCurrentCommentPostId(null);
    },
  });

  const { mutate: editComment, isLoading: isLoadingEdit } = useMutation({
    mutationFn: async (editedComment: { text: string; commentId: string }) => {
      if (session?.accessToken) {
        return await editCommentService(
          editedComment.text,
          editedComment.commentId,
          session.accessToken
        );
      }
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries(['comments']);
        queryClient.invalidateQueries(['posts']);
        setShowNewCommentContainer(false);
        setCurrentCommentPostId(null);
        setIsEditingComment(false);
        setEditedCommentId(null);
        successNotify(data?.message);
      }
    },
    onError: (error) => {
      errorHandler(error);
      setShowNewCommentContainer(false);
      setCurrentCommentPostId(null);
      setIsEditingComment(false);
      setEditedCommentId(null);
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: async (commentId: string) => {
      if (session?.accessToken) {
        return await deleteCommentService(commentId, session?.accessToken);
      }
    },
    onSuccess: (message) => {
      if (message) {
        queryClient.invalidateQueries(['comments']);
        queryClient.invalidateQueries(['posts']);
        successNotify(message ?? 'Comment successfully deleted!');
      }
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  return {
    createComment,
    isLoadingCreation,
    editComment,
    isLoadingEdit,
    deleteComment,
  };
};

export default useCommentMutation;
