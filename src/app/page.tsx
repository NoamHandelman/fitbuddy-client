'use client';

import Login from '@/components/root-page/Login';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LandingPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    queryClient.removeQueries();
    router.refresh();
  }, [queryClient, router]);

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-16 lg:grid grid-cols-2">
      <h1 className="text-center text-6xl font-bold	text-teal-600 sm:text-8xl ">
        FITBUDDY
      </h1>
      <section className="flex flex-col items-center justify-center">
        <Login />
      </section>
    </main>
  );
};

export default LandingPage;
