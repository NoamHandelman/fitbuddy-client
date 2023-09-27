'use client';

import { FC, useState } from 'react';
import UserDetail from './user-detail/UserDetail';
import { formatDateOfBirth } from '@/lib/utils/dates';
import { Profile } from '@/lib/types/profile';

interface UserDetailsProps {
  userId: string;
  details: Profile;
}

const UserDetails: FC<UserDetailsProps> = ({ details, userId }) => {
  const [editingDetail, setEditingDetail] = useState<string | null>(null);

  const { bio, profession, education, birthDate, residence, favoriteSport } =
    details;

  let formattedDate = '';

  if (birthDate) {
    formattedDate = formatDateOfBirth(birthDate);
  }

  return (
    <div className="flex items-center justify-center w-[min(100%,34rem) mx-4 sm:mx-20">
      <main className="px-8 py-4 rounded-lg shadow-lg bg-white my-4 w-full">
        <div className="flex justify-center">
          <UserDetail
            detail="bio"
            type="text"
            userId={userId}
            isEditing={editingDetail === 'bio'}
            setIsEditing={() =>
              setEditingDetail(editingDetail === 'bio' ? null : 'bio')
            }
            data={bio}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 my-8">
          <UserDetail
            detail="profession"
            type="text"
            userId={userId}
            isEditing={editingDetail === 'profession'}
            setIsEditing={() =>
              setEditingDetail(
                editingDetail === 'profession' ? null : 'profession'
              )
            }
            data={profession}
          />
          <UserDetail
            detail="education"
            type="text"
            userId={userId}
            isEditing={editingDetail === 'education'}
            setIsEditing={() =>
              setEditingDetail(
                editingDetail === 'education' ? null : 'education'
              )
            }
            data={education}
          />
          <UserDetail
            detail="birthDate"
            name="Date Of Birth"
            type="date"
            userId={userId}
            isEditing={editingDetail === 'birthDate'}
            setIsEditing={() =>
              setEditingDetail(
                editingDetail === 'birthDate' ? null : 'birthDate'
              )
            }
            data={formattedDate}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 mt-8 mb-4">
          <UserDetail
            detail="residence"
            type="text"
            userId={userId}
            isEditing={editingDetail === 'residence'}
            setIsEditing={() =>
              setEditingDetail(
                editingDetail === 'residence' ? null : 'residence'
              )
            }
            data={residence}
          />
          <UserDetail
            detail="favoriteSport"
            name="Favorite Sport"
            type="text"
            userId={userId}
            isEditing={editingDetail === 'favoriteSport'}
            setIsEditing={() =>
              setEditingDetail(
                editingDetail === 'favoriteSport' ? null : 'favoriteSport'
              )
            }
            data={favoriteSport}
          />
        </div>
      </main>
    </div>
  );
};

export default UserDetails;
