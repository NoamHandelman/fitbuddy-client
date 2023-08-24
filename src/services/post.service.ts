import { Method } from '@/types/method';
import toast from 'react-hot-toast';
import { removeUserFromLocalStorage } from '@/lib/utils/localStorage';

const basePostAPI = 'http://localhost:4000/api/posts/';

const request = async (url: string, method: Method, body?: string) => {
  try {
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
    const data = await response.json();

    if (response.status === 401) {
      // window.location.href = '/';
      // removeUserFromLocalStorage('user');
      // return toast.error(data.message);
    } else if (response.ok) {
      return { response, data };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllPostsService = async (page: number) =>
  request(`${basePostAPI}?page=${page}`, 'GET');

export const handleLikeService = async (postId: string) =>
  request(`${basePostAPI}${postId}/likes`, 'GET');

export const createPostService = async (text: string) =>
  request(basePostAPI, 'POST', text);

export const editPostService = async (text: string, postId: string) =>
  request(`${basePostAPI}${postId}`, 'PATCH', text);

export const deletePostService = async (postId: string) =>
  request(`${basePostAPI}${postId}`, 'DELETE');
