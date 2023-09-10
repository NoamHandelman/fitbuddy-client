'use client';

import Navbar from '@/components/navbar/NavBar';
import Spinner from '@/components/ui/Spinner';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function LayoutNav({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const pathname = usePathname();

  if (pathname !== '/' && !session?.accessToken) {
    return <Spinner />;
  }

  return (
    <>
      {pathname !== '/' && <Navbar />}
      {children}
    </>
  );
}
