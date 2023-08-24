import { Method } from '@/types/method';
import { removeUserFromLocalStorage } from '@/lib/utils/localStorage';
import toast from 'react-hot-toast';

export const baseProfileAPI = 'http://localhost:4000/api/profiles/';

const request = async (
  url: string,
  method: Method,
  detail?: string,
  detailData?: string
) => {
  try {
    const options: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    if (detail && detailData) {
      options.body = JSON.stringify({ [detail]: detailData });
    } else {
      if (detail) {
        options.body = JSON.stringify({ detail });
      }
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

    // if (response.ok) {
    return { response, data };
    // }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserDetailsService = async (userId: string) =>
  request(`${baseProfileAPI}${userId}`, 'GET');

export const editProfileService = async (detail: string, data: string) =>
  request(baseProfileAPI, 'PATCH', detail, data);

export const deleteDetailsService = async (detail: string) =>
  request(baseProfileAPI, 'DELETE', detail);
