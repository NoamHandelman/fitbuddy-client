import Link from 'next/link';
import ActiveLink from '../ui/ActiveLink';
import { SlHome } from 'react-icons/sl';
import { CgProfile } from 'react-icons/cg';

const PagesLinks = () => {
  return (
    <>
      <Link
        className="text-2xl font-bold text-teal-600"
        href="/home"
        title="Home page"
      >
        FITBUDDY
      </Link>
      <div className="flex flex-row space-x-6">
        <ActiveLink href="/home">
          <SlHome />
        </ActiveLink>
        <ActiveLink href="/profiles">
          <CgProfile />
        </ActiveLink>
      </div>
    </>
  );
};

export default PagesLinks;
