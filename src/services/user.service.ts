import { CustomError } from '@/lib/utils/CustomError';
import {
  RegisterUserInput,
  LoginUserInput,
  EditUserInput,
} from '@/schemas/user.schema';

import { Method } from '@/types/method';
import { User } from '@/types/user';
import { UserResponse } from '@/types/user';

const isProduction = process.env.NODE_ENV === 'production';
const apiHostUrl = isProduction
  ? process.env.NEXT_PUBLIC_API_HOST_URL
  : 'http://localhost:8080';

export const baseUserUrl = `${apiHostUrl}/api/v1/users/`;

type UserRequestBody = RegisterUserInput | LoginUserInput | EditUserInput;

const setUserRequest = async (
  url: string,
  method: Method,
  user: UserRequestBody,
  token?: string
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['authorization'] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method: method,
    headers: headers,
    body: JSON.stringify(user),
  };

  const response = await fetch(url, options);

  const data: UserResponse = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data;
};

const unsetUserRequest = async (url: string, method: Method, token: string) => {
  const response = await fetch(url, {
    method: method,
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

export const getUserService = async (userId: string, token: string) => {
  const response = await fetch(`${baseUserUrl}${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data: { user?: User; message?: string } = await response.json();

  if (!response.ok) {
    if (data.message) {
      throw new CustomError(data.message, response.status);
    }
  }

  return data.user;
};

export const uploadImageService = async (formData: FormData, token: string) => {
  const response = await fetch(`${baseUserUrl}image`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data: { imageUrl?: string; message: string } = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data;
};

export const registerUserService = (user: RegisterUserInput) =>
  setUserRequest(`${baseUserUrl}register`, 'POST', user);

export const editUserService = (user: EditUserInput, token: string) =>
  setUserRequest(baseUserUrl, 'PATCH', user, token);

export const deleteUserService = (token: string) =>
  unsetUserRequest(baseUserUrl, 'DELETE', token);

export const deleteImageService = (token: string) =>
  unsetUserRequest(`${baseUserUrl}image`, 'DELETE', token);
