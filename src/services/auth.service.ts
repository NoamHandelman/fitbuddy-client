import {
  RegisterUserInput,
  LoginUserInput,
  EditUserInput,
} from '@/schemas/user.schema';

import { Method } from '@/types/method';
import { User } from '@/types/user';
import { UserResponse } from '@/types/userResponse';

const baseAuthAPI = 'http://localhost:4000/api/users/';

type AuthRequestBody = RegisterUserInput | LoginUserInput | EditUserInput;

const setUserRequest = async (
  url: string,
  method: Method,
  user: AuthRequestBody
) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    });

    const data: UserResponse = await response.json();

    return { response, data };
  } catch (error: any) {
    throw new Error(error);
  }
};

const unsetUserRequest = async (url: string, method: Method) => {
  try {
    const response = await fetch(url, {
      method: method,
      credentials: 'include',
    });

    const message: string = await response.json();

    return { response, message };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserService = async (userId: string) => {
  try {
    const response = await fetch(`${baseAuthAPI}${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const user: User = await response.json();

    console.log(user);

    return { response, user };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUserService = async (user: LoginUserInput) =>
  setUserRequest(`${baseAuthAPI}login`, 'POST', user);

export const registerUserService = (user: RegisterUserInput) =>
  setUserRequest(`${baseAuthAPI}register`, 'POST', user);

export const editUserService = (user: EditUserInput) =>
  setUserRequest(baseAuthAPI, 'PATCH', user);

export const deleteUserService = () => unsetUserRequest(baseAuthAPI, 'DELETE');

export const logoutUserService = () =>
  unsetUserRequest(`${baseAuthAPI}logout`, 'GET');
