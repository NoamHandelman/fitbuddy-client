import Link from 'next/link';
import OptionsContainer from './OptionsContainer';
import Image from 'next/image';
import defaultImage from '../../../public/images/user-photo.png';
import { useAppContext } from '@/context/app.context';

const UserSection = () => {
  const { user } = useAppContext();

  return (
    <div className="flex items-center">
      <OptionsContainer />
      <Link
        href={`/profiles/${user?._id}/posts`}
        className="text-lg font-bold text-gray-700 ml-6 hover:underline"
      >
        {user?.username}
      </Link>
      <Link href={`/profiles/${user?._id}/posts`}>
        <Image
          className="w-10 h-10 rounded-full ml-8 cursor-pointer"
          width={40}
          height={40}
          src={user?.imageUrl || defaultImage}
          alt={user?.username || 'User image'}
        />
      </Link>
    </div>
  );
};

export default UserSection;
