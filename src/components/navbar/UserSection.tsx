import Link from 'next/link';
import OptionsContainer from './OptionsContainer';
import Image from 'next/image';
import defaultImage from '../../../public/images/user-photo.png';
import { useSession } from 'next-auth/react';

const UserSection = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center">
      <OptionsContainer />
      <Link
        href={`/profiles/${session?.user._id}/posts`}
        className="text-md sm:text-lg font-bold text-gray-700 ml-2 sm:ml-6 hover:underline"
      >
        {session?.user.username}
      </Link>
      <Link href={`/profiles/${session?.user._id}/posts`}>
        <Image
          className="w-10 h-10 rounded-full ml-2 sm:ml-8 cursor-pointer"
          width={40}
          height={40}
          src={session?.user.imageUrl || defaultImage}
          alt={session?.user.username || 'User image'}
        />
      </Link>
    </div>
  );
};

export default UserSection;
