import { Profile } from '@/types/profile';
import { CustomError } from '@/lib/utils/CustomError';

const isProduction = process.env.NODE_ENV === 'production';

const apiHostUrl = isProduction
  ? process.env.NEXT_PUBLIC_API_HOST_URL
  : 'http://localhost:8080';

export const baseProfileUrl = `${apiHostUrl}/api/v1/profiles/`;

export const getSearchedProfilesService = async (
  debouncedSearchInput: string,
  token: string
) => {
  const response = await fetch(
    `${baseProfileUrl}searchProfiles?q=${debouncedSearchInput}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  const data: { profiles?: Profile[]; message?: string } =
    await response.json();

  if (!response.ok && data.message) {
    throw new CustomError(data.message, response.status);
  }

  return data;
};

export const getUserDetailsService = async (userId: string, token: string) => {
  const response = await fetch(`${baseProfileUrl}${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data: { profile?: Profile; message?: string } = await response.json();

  if (!response.ok && data.message) {
    throw new CustomError(data.message, response.status);
  }

  return data;
};

export const editProfileService = async (
  detail: string,
  detailData: string,
  token: string
) => {
  const response = await fetch(baseProfileUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ [detail]: detailData }),
  });

  const data: { profile?: Profile; message: string } = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data;
};

export const deleteDetailsService = async (detail: string, token: string) => {
  const response = await fetch(baseProfileUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ detail }),
  });

  const data: { message: string } = await response.json();

  if (!response.ok) {
    throw new CustomError(data.message, response.status);
  }

  return data.message;
};
