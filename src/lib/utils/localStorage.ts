import { User } from '@/types/user';

export const getUserFromLocalStorage = (key: string) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    return undefined;
  }
};

export const saveUserToLocalStorage = (key: string, value: User) => {
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    throw new Error('Unable to save user to local storage');
  }
};

export const removeUserFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    throw new Error('Unable to remove user from local storage');
  }
};
