import SearchProfiles from '@/components/profiles-page/SearchProfiles';
import { Profile } from '@/types/profile';
import { BASE_PROFILE_URL } from '@/services/profile.service';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const getProfiles = async () => {
  const cookieStore = cookies();
  const tokenObj = cookieStore.get('token');
  const response = await fetch(`${BASE_PROFILE_URL}`, {
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Cookie: `token=${tokenObj?.value};`,
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
  const profiles = await getProfiles();

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
