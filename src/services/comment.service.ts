import { Method } from '@/types/method';
import { removeUserFromLocalStorage } from '@/lib/utils/localStorage';
import { toast } from 'react-hot-toast';

const baseCommentAPI = 'http://localhost:4000/api/comments/';

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
      toast.error(data.message);
      setTimeout(() => {
        removeUserFromLocalStorage('user');
        return (window.location.href = '/');
      }, 2000);
    }

    if (response.ok) {
      return { response, data };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createCommentService = async (postId: string, text: string) =>
  request(`${baseCommentAPI}${postId}`, 'POST', text);

export const getCommentsService = async (postId: string) =>
  request(`${baseCommentAPI}${postId}`, 'GET');

export const editCommentService = async (text: string, commentId: string) =>
  request(`${baseCommentAPI}${commentId}`, 'PATCH', text);

export const deleteCommentService = async (commentId: string) =>
  request(`${baseCommentAPI}${commentId}`, 'DELETE');
