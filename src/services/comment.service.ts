import { CustomError } from '@/lib/utils/CustomError';
import { Method } from '@/types/method';
import { Comment } from '@/types/post';

const isProduction = process.env.NODE_ENV === 'production';
const HOST_URL = isProduction ? process.env.HOST_URL : 'http://localhost:8080';

const BASE_COMMENT_URL = `${HOST_URL}/api/v1/comments/`;

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
    // credentials: 'include',
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
  const response = await fetch(`${BASE_COMMENT_URL}${postId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    // method: 'GET',
    // credentials: 'include',
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
  const response = await fetch(`${BASE_COMMENT_URL}${commentId}`, {
    method: 'DELETE',
    // credentials: 'include',
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
) => setCommentRequest(`${BASE_COMMENT_URL}${postId}`, 'POST', text, token);

export const editCommentService = async (
  text: string,
  commentId: string,
  token: string
) => setCommentRequest(`${BASE_COMMENT_URL}${commentId}`, 'PATCH', text, token);
