import SearchProfiles from '@/components/profiles-page/SearchProfiles';
import { Profile } from '@/types/profile';
import { baseProfileUrl } from '@/services/profile.service';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth';

const getProfiles = async (token: string) => {
  const response = await fetch(`${baseProfileUrl}`, {
    cache: 'no-cache',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    redirect('/');
  }

  if (response.ok) {
    const data: { profiles?: Profile[]; message?: string } =
      await response.json();
    return data.profiles;
  }
};

const ProfilesPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const profiles = await getProfiles(session?.accessToken);

  if (profiles) {
    return (
      <main className="flex flex-col justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <SearchProfiles initialProfiles={profiles} />
        </div>
      </main>
    );
  }
};

export default ProfilesPage;
