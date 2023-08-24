import Login from '@/components/root-page/Login';

const LandingPage = () => {
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
