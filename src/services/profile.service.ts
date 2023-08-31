import { Profile } from '@/types/profile';
import { CustomError } from '@/lib/utils/CustomError';

export const BASE_PROFILE_URL = 'http://localhost:8080/api/profiles/';

export const getProfilesService = async (debouncedSearchInput: string) => {
  const response = await fetch(
    `${BASE_PROFILE_URL}searchProfiles?q=${debouncedSearchInput}`,
    {
      credentials: 'include',
    }
  );

  const data: { profiles?: Profile[]; message?: string } =
    await response.json();

  if (!response.ok && data.message) {
    throw new CustomError(data.message, response.status);
  }

  return data;
};

export const getUserDetailsService = async (userId: string) => {
  const response = await fetch(`${BASE_PROFILE_URL}${userId}`, {
    credentials: 'include',
  });

  const data: { profile?: Profile; message?: string } = await response.json();

  if (!response.ok && data.message) {
    throw new CustomError(data.message, response.status);
  }

  return data;
};

export const editProfileService = async (
  detail: string,
  detailData: string
) => {
  const response = await fetch(BASE_PROFILE_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ [detail]: detailData }),
  });

  const data: { profile?: Profile; message: string } = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data;
};

export const deleteDetailsService = async (detail: string) => {
  const response = await fetch(BASE_PROFILE_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ detail }),
  });

  const data: { message: string } = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data.message;
};
