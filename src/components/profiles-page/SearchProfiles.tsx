'use client';

import { FC, useState } from 'react';
import { LiaSearchSolid } from 'react-icons/lia';
import { Profile } from '@/lib/types/profile';
import { getSearchedProfilesService } from '@/services/profile.service';
import ProfileItem from './ProfileItem';
import Spinner from '../ui/Spinner';
import { useQuery } from '@tanstack/react-query';
import useDebounce from '@/hooks/useDebounce';
import useError from '@/hooks/useError';
import { useSession } from 'next-auth/react';

interface SearchProfilesProps {
  initialProfiles: Profile[];
}

const SearchProfiles: FC<SearchProfilesProps> = ({ initialProfiles }) => {
  const [queryInput, setQueryInput] = useState('');

  const { data: session } = useSession();

  const { errorHandler } = useError();

  const debouncedSearchInput = useDebounce(queryInput, 500);

  const {
    data: profiles,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['search', debouncedSearchInput],
    queryFn: async () => {
      if (debouncedSearchInput && session?.accessToken) {
        const data = await getSearchedProfilesService(
          debouncedSearchInput,
          session?.accessToken
        );
        return data.profiles;
      }
      return initialProfiles;
    },
  });

  if (isError) {
    errorHandler(error);
  }

  return (
    <section className="flex flex-col items-center justify-center mt-4 px-4 w-full">
      <div className="flex self-center flex-row items-center p-4 rounded-3xl bg-white space-x-4 w-[min(100%,34rem)] mb-4 ">
        <LiaSearchSolid />
        <input
          autoFocus
          className="outline-none flex-grow"
          type="text"
          placeholder="Search profiles..."
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
        />
      </div>

      {queryInput && profiles && profiles.length < 1 && (
        <h1 className="text-3xl text-teal-600 font-bold">Users not found...</h1>
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        profiles &&
        profiles.map((profile) => (
          <ProfileItem
            key={profile.user._id}
            userId={profile.user._id}
            username={profile.user.username}
            imageUrl={profile.user.imageUrl}
            favoriteSport={profile.favoriteSport}
          />
        ))
      )}
    </section>
  );
};

export default SearchProfiles;
