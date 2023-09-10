import { CustomError } from '@/lib/utils/CustomError';
import { Method } from '@/types/method';
import { Comment } from '@/types/post';

const isProduction = process.env.NODE_ENV === 'production';
const apiHostUrl = isProduction
  ? process.env.NEXT_PUBLIC_API_HOST_URL
  : 'http://localhost:8080';

const baseCommentUrl = `${apiHostUrl}/api/v1/comments/`;

const setCommentRequest = async (
  url: string,
  method: Method,
  body: string,
  token: string
) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
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

export const getCommentsService = async (postId: string, token: string) => {
  const response = await fetch(`${baseCommentUrl}${postId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
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

export const deleteCommentService = async (
  commentId: string,
  token: string
) => {
  const response = await fetch(`${baseCommentUrl}${commentId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data: {
    message: string;
  } = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data.message;
};

export const createCommentService = async (
  postId: string,
  text: string,
  token: string
) => setCommentRequest(`${baseCommentUrl}${postId}`, 'POST', text, token);

export const editCommentService = async (
  text: string,
  commentId: string,
  token: string
) => setCommentRequest(`${baseCommentUrl}${commentId}`, 'PATCH', text, token);
