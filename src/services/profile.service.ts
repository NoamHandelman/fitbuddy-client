import { Profile } from '@/types/profile';
import { CustomError } from '@/lib/utils/CustomError';

const isProduction = process.env.NODE_ENV === 'production';
const HOST_URL = isProduction ? process.env.HOST_URL : 'http://localhost:8080';

export const BASE_PROFILE_URL = `${HOST_URL}/api/v1/profiles/`;

export const getSearchedProfilesService = async (
  debouncedSearchInput: string,
  token: string
) => {
  const response = await fetch(
    `${BASE_PROFILE_URL}searchProfiles?q=${debouncedSearchInput}`,

    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      // credentials: 'include',
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
