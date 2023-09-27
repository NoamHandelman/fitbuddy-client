'use client';

import { FC } from 'react';
import defaultImage from '../../../public/images/user-photo.png';
import Image from 'next/image';
import { BiArrowFromLeft } from 'react-icons/bi';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface ProfileItemProps {
  userId: string;
  username: string;
  imageUrl?: string;
  favoriteSport: string;
}

const ProfileItem: FC<ProfileItemProps> = ({
  userId,
  username,
  imageUrl,
  favoriteSport,
}) => {
  const { data: session } = useSession();

  if (session?.user._id !== userId) {
    return (
      <Link
        className="flex flex-col m-2 shadow-md p-6 w-[min(100%,32rem)] bg-white rounded-lg cursor-pointer"
        href={`/profiles/${userId}/posts`}
      >
        <div className="flex flex-row justify-end text-lg">
          <BiArrowFromLeft />
        </div>
        <div className="flex flex-row items-center space-x-8">
          <Image
            src={imageUrl || defaultImage}
            width={32}
            height={32}
            alt={username}
            className="w-14 h-14 rounded-full mr-4"
          />

          <h1 className="text-2xl text-teal-600 font-semibold ">{username}</h1>
        </div>
        <div className="flex flex-row justify-end border-t-2 mt-4">
          {' '}
          <span className="pt-2">{favoriteSport}</span>
        </div>
      </Link>
    );
  }
};

export default ProfileItem;
