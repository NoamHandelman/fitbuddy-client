'use client';

import Navbar from '@/components/navbar/NavBar';
import Spinner from '@/components/ui/Spinner';
import { useAppContext } from '@/context/app.context';
import { usePathname } from 'next/navigation';

export default function LayoutNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAppContext();

  if (pathname !== '/' && !user) {
    return <Spinner />;
  }

  return (
    <>
      {pathname !== '/' && <Navbar />}
      {children}
    </>
  );
}
