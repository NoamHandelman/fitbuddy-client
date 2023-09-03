import { CustomError } from '@/lib/utils/CustomError';
import {
  RegisterUserInput,
  LoginUserInput,
  EditUserInput,
} from '@/schemas/user.schema';

import { Method } from '@/types/method';
import { User } from '@/types/user';
import { UserResponse } from '@/types/userResponse';

const isProduction = process.env.NODE_ENV === 'production';
const HOST_URL = isProduction ? process.env.HOST_URL : 'http://localhost:8080';

const BASE_USER_URL = `${HOST_URL}/api/v1/users/`;

type AuthRequestBody = RegisterUserInput | LoginUserInput | EditUserInput;

const setUserRequest = async (
  url: string,
  method: Method,
  user: AuthRequestBody
) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(user),
  });

  const data: UserResponse = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data;
};

const unsetUserRequest = async (url: string, method: Method) => {
  const response = await fetch(url, {
    method: method,
    credentials: 'include',
  });

  const data: { message: string } = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data.message;
};

export const getUserService = async (userId: string) => {
  const response = await fetch(`${BASE_USER_URL}${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data: { user?: User; message?: string } = await response.json();

  if (!response.ok) {
    if (data.message) {
      throw new CustomError(data.message, response.status);
    }
  }

  return data.user;
};

export const uploadImageService = async (formData: FormData) => {
  const response = await fetch(`${BASE_USER_URL}image`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  const data: { imageUrl?: string; message: string } = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data;
};

export const loginUserService = async (user: LoginUserInput) => {
  console.log(`${BASE_USER_URL}login`);
  return await setUserRequest(`${BASE_USER_URL}login`, 'POST', user);
};

export const registerUserService = (user: RegisterUserInput) =>
  setUserRequest(`${BASE_USER_URL}register`, 'POST', user);

export const editUserService = (user: EditUserInput) =>
  setUserRequest(BASE_USER_URL, 'PATCH', user);

export const deleteUserService = () =>
  unsetUserRequest(BASE_USER_URL, 'DELETE');

export const logoutUserService = () =>
  unsetUserRequest(`${BASE_USER_URL}logout`, 'GET');

export const deleteImageService = () =>
  unsetUserRequest(`${BASE_USER_URL}image`, 'DELETE');
