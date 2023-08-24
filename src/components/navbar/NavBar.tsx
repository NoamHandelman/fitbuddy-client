import UserSection from './UserSection';
import PagesLinks from './Links';

const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-400">
      <div className="px-8 py-2 flex items-center justify-between bg-white">
        <PagesLinks />
        <UserSection />
      </div>
    </nav>
  );
};

export default Navbar;
