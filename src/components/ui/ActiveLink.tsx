'use client';

import { FC, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface ActiveLinkProps {
  children: ReactNode;
  href: string;
}

const ActiveLink: FC<ActiveLinkProps> = ({ children, href }) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <div
      className={cn('flex flex-col items-center', {
        'hover:bg-gray-200 rounded-md': !isActive,
      })}
    >
      <Link
        href={href}
        className={cn('py-2 px-4 text-lg text-black', {
          'text-teal-600 border-b-2 border-teal-600': isActive,
        })}
      >
        {children}
      </Link>
    </div>
  );
};

export default ActiveLink;
