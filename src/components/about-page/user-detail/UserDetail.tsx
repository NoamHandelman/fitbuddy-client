'use client';

import { FC, useState } from 'react';
import Spinner from '@/components/ui/Spinner';
import { useAppContext } from '@/context/app.context';
import useProfileMutation from '@/hooks/profile/useProfileMutation';
import DetailOperations from './DetailOperations';
import EditDetail from './EditDetail';

interface UserDetailProps {
  detail: string;
  name?: string;
  type: string;
  userId: string;
  isEditing: boolean;
  setIsEditing: () => void;
  data?: string;
}

const UserDetail: FC<UserDetailProps> = ({
  detail,
  name,
  type,
  userId,
  isEditing,
  setIsEditing,
  data,
}) => {
  const [detailData, setDetailData] = useState(data ?? '');

  const { user } = useAppContext();

  const { deleteDetail, editProfile, isLoadingDelete, isLoadingEdit } =
    useProfileMutation();

  const isCurrentUser = user?._id === userId;

  const title = detail.charAt(0).toUpperCase() + detail.slice(1);

  if (isLoadingEdit || isLoadingDelete) {
    return (
      <div className="shadow-lg bg-gray-200 rounded-lg w-96 p-4">
        <section className="flex flex-col items-center">
          <h1 className="text-teal-600 text-lg font-semibold text-center flex-grow mb-4 underline">
            {name || title}
          </h1>
          <Spinner size="medium" />
        </section>
      </div>
    );
  }

  return (
    <div className="shadow-lg bg-gray-200 rounded-lg w-96 p-4">
      <section className="flex flex-col items-center">
        <div className="flex justify-between items-center w-full mb-2">
          <h1 className="text-teal-600 text-lg font-semibold text-center flex-grow underline">
            {name || title}
          </h1>
          {isCurrentUser && (
            <DetailOperations
              detail={detail}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              data={data}
              deleteDetail={deleteDetail}
              setDetailData={setDetailData}
            />
          )}
        </div>
        {!isEditing ? (
          data ? (
            <p className="whitespace-normal">{data}</p>
          ) : (
            <h2 className="break-all text-left">{`${
              name || title
            } not provided`}</h2>
          )
        ) : (
          <EditDetail
            detail={detail}
            detailData={detailData}
            editProfile={editProfile}
            setDetailData={setDetailData}
            setIsEditing={setIsEditing}
            type={type}
          />
        )}
      </section>
    </div>
  );
};

export default UserDetail;
