import { CustomError } from '@/lib/utils/CustomError';
import { Method } from '@/lib/types/method';
import { Post } from '@/lib/types/post';

const isProduction = process.env.NODE_ENV === 'production';
const apiHostUrl = isProduction
  ? process.env.NEXT_PUBLIC_API_HOST_URL
  : 'http://localhost:8080';

const basePostUrl = `${apiHostUrl}/api/v1/posts/`;

type PostResponse = {
  post: Post;
  message: string;
};

const postOperationsRequest = async (
  url: string,
  method: Method,
  token: string,
  body?: string
) => {
  const options: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    options.body = JSON.stringify({ text: body });
  }

  const response = await fetch(url, options);
  const data: PostResponse = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return { data };
};

export const deletePostService = async (postId: string, token: string) => {
  const response = await fetch(`${basePostUrl}${postId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data: { message: string } = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data.message;
};

export const getAllPostsService = async (page: number, token: string) => {
  const response = await fetch(`${basePostUrl}?page=${page}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data: { posts: Post[]; message?: string } = await response.json();

  if (response.status === 401) {
    throw new CustomError(
      data.message ??
        'You are not authorized to view this resource, please log in!',
      401
    );
  }

  if (!response.ok) {
    throw new CustomError('Something went wrong ...', response.status);
  }

  return data.posts;
};

export const getUserPostsService = async (
  page: string,
  userId: string,
  token: string
) => {
  const response = await fetch(`${basePostUrl}${userId}/?page=${page}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data: { posts: Post[]; message?: string } = await response.json();

  if (response.status === 401) {
    throw new CustomError(
      data.message ??
        'You are not authorized to view this resource, please log in!',
      401
    );
  }

  if (!response.ok) {
    throw new CustomError('Something went wrong ...', response.status);
  }

  return data.posts;
};

export const handleLikeService = async (postId: string, token: string) =>
  postOperationsRequest(`${basePostUrl}${postId}/likes`, 'GET', token);

export const createPostService = async (text: string, token: string) =>
  postOperationsRequest(basePostUrl, 'POST', token, text);

export const editPostService = async (
  text: string,
  postId: string,
  token: string
) => postOperationsRequest(`${basePostUrl}${postId}`, 'PATCH', token, text);
