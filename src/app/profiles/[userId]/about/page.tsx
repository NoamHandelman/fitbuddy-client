'use client';

import { FC } from 'react';
import UserDetails from '@/components/about-page/UserDetails';
import useProfileQuery from '@/hooks/profile/useProfileQuery';
import Spinner from '@/components/ui/Spinner';
import { Profile } from '@/types/profile';

interface ProfileAboutPageProps {
  params: {
    userId: string;
  };
}

const ProfileAboutPage: FC<ProfileAboutPageProps> = ({ params }) => {
  const { data, isLoading } = useProfileQuery(params.userId);

  const details = data?.data.profile as Profile;

  if (isLoading) {
    return <Spinner />;
  }

  if (details) {
    return <UserDetails userId={params.userId} details={details} />;
  }
};

export default ProfileAboutPage;
