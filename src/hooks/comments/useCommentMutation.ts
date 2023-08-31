import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createCommentService,
  deleteCommentService,
  editCommentService,
} from '@/services/comment.service';
import useNotification from '@/hooks/useNotification';
import { useAppContext } from '@/context/app.context';
import useError from '../useError';

const useCommentMutation = () => {
  const queryClient = useQueryClient();
  const { errorNotify, successNotify } = useNotification();

  const { errorHandler } = useError();

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
      successNotify(data.message);
    },
    onError: (error) => {
      errorHandler(error);
      setShowNewCommentContainer(false);
      setCurrentCommentPostId(null);
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
      successNotify(data.message);
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
    mutationFn: deleteCommentService,
    onSuccess: (message) => {
      queryClient.invalidateQueries(['comments']);
      queryClient.invalidateQueries(['posts']);
      successNotify(message);
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
