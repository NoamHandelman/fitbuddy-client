import UserSection from './UserSection';
import PagesLinks from './Links';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex  items-center justify-between px-2 sm:px-8 py-2  bg-white  sticky top-0 z-50 border-b border-gray-400">
      <Link
        className="text-lg sm:text-2xl font-bold text-teal-600"
        href="/home"
        title="Home page"
      >
        FITBUDDY
      </Link>
      <PagesLinks />
      <UserSection />
    </nav>
  );
};

export default Navbar;
