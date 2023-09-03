import { CustomError } from '@/lib/utils/CustomError';
import { Method } from '@/types/method';
import { Post } from '@/types/post';

const BASE_POST_URL = 'https://fittbudy-server.onrender.com/api/v1/posts/';

type PostResponse = {
  post: Post;
  message: string;
};

const postOperationsRequest = async (
  url: string,
  method: Method,
  body?: string
) => {
  const options: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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

export const deletePostService = async (postId: string) => {
  const response = await fetch(`${BASE_POST_URL}${postId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data: { message: string } = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data.message;
};

export const getAllPostsService = async (page: number) => {
  const response = await fetch(`${BASE_POST_URL}?page=${page}`, {
    method: 'GET',
    credentials: 'include',
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

export const getUserPostsService = async (page: number, userId: string) => {
  const response = await fetch(`${BASE_POST_URL}${userId}/?page=${page}`, {
    method: 'GET',
    credentials: 'include',
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

export const handleLikeService = async (postId: string) =>
  postOperationsRequest(`${BASE_POST_URL}${postId}/likes`, 'GET');

export const createPostService = async (text: string) =>
  postOperationsRequest(BASE_POST_URL, 'POST', text);

export const editPostService = async (text: string, postId: string) =>
  postOperationsRequest(`${BASE_POST_URL}${postId}`, 'PATCH', text);
