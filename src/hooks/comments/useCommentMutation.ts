import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createCommentService,
  deleteCommentService,
  editCommentService,
} from '@/services/comment.service';
import useNotification from '@/hooks/useNotification';
import { useAppContext } from '@/context/app.context';

const useCommentMutation = () => {
  const queryClient = useQueryClient();
  const { errorNotify, successNotify } = useNotification();

  const {
    setShowNewCommentContainer,
    setCurrentCommentPostId,
    setIsEditingComment,
    setEditedCommentId,
  } = useAppContext();

  const { mutate: createComment, isLoading: isLoadingCreation } = useMutation({
    mutationFn: (createdComment: { postId: string; text: string }) =>
      createCommentService(createdComment.postId, createdComment.text),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['comments']);
      queryClient.invalidateQueries(['posts']);
      setShowNewCommentContainer(false);
      setCurrentCommentPostId(null);
      successNotify(data?.data.message);
    },
    onError: (error: any) => {
      errorNotify(error.message);
    },
  });

  const { mutate: editComment, isLoading: isLoadingEdit } = useMutation({
    mutationFn: (editedComment: { text: string; commentId: string }) =>
      editCommentService(editedComment.text, editedComment.commentId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['comments']);
      queryClient.invalidateQueries(['posts']);
      setShowNewCommentContainer(false);
      setCurrentCommentPostId(null);
      setIsEditingComment(false);
      setEditedCommentId(null);
      successNotify(data?.data.message);
    },
    onError: (error: any) => {
      errorNotify(error.message);
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentService,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['comments']);
      queryClient.invalidateQueries(['posts']);
      successNotify(data?.data.message);
    },
    onError: (error: any) => {
      errorNotify(error.message);
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
