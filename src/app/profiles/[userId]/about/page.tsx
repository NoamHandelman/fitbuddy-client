'use client';

import { FC } from 'react';
import UserDetails from '@/components/about-page/UserDetails';
import useProfileQuery from '@/hooks/profile/useProfileQuery';
import Spinner from '@/components/ui/Spinner';
import useError from '@/hooks/useError';

interface ProfileAboutPageProps {
  params: {
    userId: string;
  };
}

const ProfileAboutPage: FC<ProfileAboutPageProps> = ({ params }) => {
  const { data, isLoading, isError, error } = useProfileQuery(params.userId);

  const { errorHandler } = useError();

  const details = data?.profile;

  if (isError) {
    errorHandler(error);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (details) {
    return <UserDetails userId={params.userId} details={details} />;
  }
};

export default ProfileAboutPage;
