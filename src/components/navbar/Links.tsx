import Link from 'next/link';
import ActiveLink from '../ui/ActiveLink';
import { SlHome } from 'react-icons/sl';
import { CgProfile } from 'react-icons/cg';

const PagesLinks = () => {
  return (
    <div className="flex sm:space-x-6">
      <ActiveLink href="/home">
        <SlHome />
      </ActiveLink>
      <ActiveLink href="/profiles">
        <CgProfile />
      </ActiveLink>
    </div>
  );
};

export default PagesLinks;
