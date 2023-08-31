'use client';

import Navbar from '@/components/navbar/NavBar';
import Spinner from '@/components/ui/Spinner';
import { useAppContext } from '@/context/app.context';
import { usePathname, useRouter } from 'next/navigation';

export default function LayoutNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAppContext();

  if (pathname !== '/' && !user) {
    router.replace('/');
    return <Spinner />;
  }

  return (
    <>
      {pathname !== '/' && <Navbar />}
      {children}
    </>
  );
}
