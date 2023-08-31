'use client';

import { useState } from 'react';
import { RiArrowDownSFill } from 'react-icons/ri';
import Link from 'next/link';
import useUserMutation from '@/hooks/user/useUserMutation';
import useOutsideClick from '@/hooks/useOutsideClick';

const OptionsContainer = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { logoutUser } = useUserMutation();

  const toggleShowUserOptions = () => {
    setShowOptions((prevState) => !prevState);
  };

  const ref = useOutsideClick(() => setShowOptions(false));

  return (
    <section className="relative flex flex-col items-center" ref={ref}>
      <RiArrowDownSFill
        className="cursor-pointer text-2xl hover:bg-gray-200 rounded-full"
        onClick={toggleShowUserOptions}
      />
      {showOptions && (
        <section className="absolute top-full mt-6 min-w-max bg-white border rounded-md shadow-2xl">
          <Link
            href="/my-account"
            className="block px-4 py-2 w-full font-medium text-center border-b-2 hover:bg-gray-300 rounded-t-md"
            onClick={toggleShowUserOptions}
          >
            My Account
          </Link>
          <button
            type="button"
            className="block w-full text-center px-4 py-2 font-medium  hover:bg-gray-300 rounded-b-md"
            onClick={() => {
              logoutUser();
              toggleShowUserOptions();
            }}
          >
            Logout
          </button>
        </section>
      )}
    </section>
  );
};

export default OptionsContainer;
