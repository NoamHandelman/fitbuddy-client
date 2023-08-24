'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImage from '../../public/images/user-photo.png';
import ActiveLink from './ui/ActiveLink';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/user';
import { AiOutlineCamera } from 'react-icons/ai';
import { useAppContext } from '@/context/app.context';
import { IoCloseOutline } from 'react-icons/io5';
import Spinner from './ui/Spinner';
import useAuthQuery from '@/hooks/auth/useAuthQuery';
import { getUserService } from '@/services/auth.service';

interface SharedLayoutProps {
  userId: string;
}

const SharedLayout: FC<SharedLayoutProps> = ({ userId }) => {
  const [profileImage, setProfileImage] = useState<File>();
  const [showImageOperationsContainer, setShowImageOperationsContainer] =
    useState(false);

  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserService(userId),
  });

  const dataObject = { ...data };

  const { user: currentUser, setUser } = useAppContext();

  const queryClient = useQueryClient();

  // const { data } = useAuthQuery(userId);

  // console.log(data?.user);

  const { mutate: uploadImage, isLoading: isLoadingUpload } = useMutation({
    mutationFn: async () => {
      if (!profileImage) return;
      const formData = new FormData();
      formData.append('image', profileImage);
      const response = await fetch('http://localhost:4000/api/users/image', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();

      return { user: data.user as User, message: data.message as String };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user', userId]);
      queryClient.invalidateQueries(['posts']);
      if (data) {
        if (data.user) setUser({ ...data.user, imageUrl: data.user.imageUrl });
      }
      setProfileImage(undefined);
      setShowImageOperationsContainer(false);
    },
  });

  const { mutate: deleteImage, isLoading: isLoadingDeletion } = useMutation({
    mutationFn: async () => {
      const response = await fetch('http://localhost:4000/api/users/image', {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();

      return { user: data.user as User, message: data.message as String };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user', userId]);
      queryClient.invalidateQueries(['posts']);
      if (data) {
        if (data.user) setUser({ ...data.user, imageUrl: undefined });
      }
      setShowImageOperationsContainer(false);
    },
  });

  useEffect(() => {
    if (profileImage && !isLoadingUpload) {
      uploadImage();
    }
  }, [uploadImage, profileImage, isLoadingUpload]);

  return (
    <>
      {data && (
        <section className="bg-white flex flex-col items-center justify-center py-4 border-b border-gray-400">
          <div className="relative">
            {currentUser?._id === userId && (
              <>
                <div
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-gray-300 mr-8 cursor-pointer"
                  onClick={() => setShowImageOperationsContainer(true)}
                >
                  <AiOutlineCamera className="text-gray-700 text-3xl" />
                </div>
                {showImageOperationsContainer && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div
                      className="absolute inset-0 bg-black opacity-50"
                      onClick={() => setShowImageOperationsContainer(false)}
                    />
                    <div className="bg-white rounded-lg shadow-lg p-2 mx-auto relative">
                      <div className="flex justify-end">
                        <IoCloseOutline
                          className="cursor-pointer text-2xl hover:bg-gray-200 rounded-full"
                          onClick={() => setShowImageOperationsContainer(false)}
                        />
                      </div>
                      {isLoadingDeletion || isLoadingUpload ? (
                        <Spinner size="medium" />
                      ) : (
                        <div className="p-4 space-x-4">
                          <button className="bg-blue-500 hover:bg-blue-700 font-bold py-3 px-4 rounded text-white">
                            <label
                              htmlFor="profileImageInput"
                              className="cursor-pointer"
                            >
                              Add Image
                            </label>
                            <input
                              type="file"
                              id="profileImageInput"
                              className="hidden"
                              onChange={(e) =>
                                setProfileImage(e.target.files?.[0])
                              }
                            />
                          </button>
                          {data?.user?.imageUrl && (
                            <button
                              type="button"
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded"
                              onClick={() => deleteImage()}
                            >
                              Delete Image
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            <Image
              src={data?.user?.imageUrl || defaultImage}
              alt={data?.user?.username || 'User image'}
              width={240}
              height={240}
              className="h-64 w-64 rounded-full object-cover"
              priority={true}
            />
          </div>
          <h1 className="text-3xl font-bold my-4">{data?.user?.username}</h1>

          <nav className="space-x-10 flex items-center justify-center">
            <ActiveLink href={`/profiles/${userId}/posts`}>Posts</ActiveLink>
            <ActiveLink href={`/profiles/${userId}/about`}>About</ActiveLink>
          </nav>
        </section>
      )}
    </>
  );
};

export default SharedLayout;
