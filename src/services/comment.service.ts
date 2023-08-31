import { CustomError } from '@/lib/utils/CustomError';
import { Method } from '@/types/method';
import { Comment } from '@/types/post';

const BASE_COMMENT_URL = 'http://localhost:8080/api/v1/comments/';

const setCommentRequest = async (url: string, method: Method, body: string) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ text: body }),
  });

  const data: {
    comment?: Comment;
    message: string;
  } = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data;
};

export const getCommentsService = async (postId: string) => {
  const response = await fetch(`${BASE_COMMENT_URL}${postId}`, {
    method: 'GET',
    credentials: 'include',
  });

  const data: {
    comments?: Comment[];
    message?: string;
  } = await response.json();

  if (!response.ok && data.message) {
    throw new CustomError(data.message, response.status);
  }

  return data;
};

export const deleteCommentService = async (commentId: string) => {
  const response = await fetch(`${BASE_COMMENT_URL}${commentId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data: {
    message: string;
  } = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data.message;
};

export const createCommentService = async (postId: string, text: string) =>
  setCommentRequest(`${BASE_COMMENT_URL}${postId}`, 'POST', text);

export const editCommentService = async (text: string, commentId: string) =>
  setCommentRequest(`${BASE_COMMENT_URL}${commentId}`, 'PATCH', text);
