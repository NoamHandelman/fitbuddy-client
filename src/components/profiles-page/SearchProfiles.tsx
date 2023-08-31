'use client';

import { FC, useState } from 'react';
import { LiaSearchSolid } from 'react-icons/lia';
import { Profile } from '@/types/profile';
import { getProfilesService } from '@/services/profile.service';
import ProfileItem from './ProfileItem';
import Spinner from '../ui/Spinner';
import { useQuery } from '@tanstack/react-query';
import useDebounce from '@/hooks/useDebounce';
import useError from '@/hooks/useError';

interface SearchProfilesProps {
  initialProfiles: Profile[];
}

const SearchProfiles: FC<SearchProfilesProps> = ({ initialProfiles }) => {
  const [queryInput, setQueryInput] = useState('');

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
      if (debouncedSearchInput) {
        const data = await getProfilesService(debouncedSearchInput);
        return data.profiles;
      }
      return initialProfiles;
    },
  });

  if (isError) {
    errorHandler(error);
  }

  return (
    <section className="flex flex-col items-center justify-center mt-4 w-full">
      <div className="flex flex-row items-center p-4 rounded-3xl bg-white space-x-4 w-full mb-4 self-start">
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
