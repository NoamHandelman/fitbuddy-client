'use client';

import { FC, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useAppContext } from '@/context/appContext';
import useOutsideClick from '@/hooks/useOutsideClick';
import usePost from '@/hooks/posts/usePost';
import { useSession } from 'next-auth/react';

interface PostOperationsContainerProps {
  postOwnerId: string;
  postId: string;
  text: string;
}

const PostOperationsContainer: FC<PostOperationsContainerProps> = ({
  postId,
  postOwnerId,
  text,
}) => {
  const [showOperationsContainer, setShowOperationsContainer] =
    useState<boolean>(false);

  const { data: session } = useSession();

  const { setIsEditingPost, setShowNewPostContainer, setEditedPost } =
    useAppContext();

  const { deletePost } = usePost();

  const handleEditPostClick = () => {
    setIsEditingPost(true);
    setEditedPost({ id: postId, text });
    setShowNewPostContainer(true);
    setShowOperationsContainer(false);
  };

  const ref = useOutsideClick(() => setShowOperationsContainer(false));

  return (
    <>
      {' '}
      {session?.user._id === postOwnerId && (
        <section className="relative" ref={ref}>
          <BiDotsVerticalRounded
            className="cursor-pointer text-2xl hover:bg-gray-200 rounded-full"
            onClick={() => setShowOperationsContainer(!showOperationsContainer)}
          />
          {showOperationsContainer && (
            <div className="absolute min-w-max right-0 mt-2 bg-white rounded-md overflow-hidden shadow-2xl z-10">
              <button
                type="button"
                className="block w-full px-4 py-2 font-medium  hover:bg-gray-300"
                onClick={() => {
                  deletePost(postId);
                  setShowOperationsContainer(false);
                }}
              >
                Delete post
              </button>
              <button
                type="button"
                className="block w-full px-4 py-2 font-medium hover:bg-gray-300   border-t-2"
                onClick={handleEditPostClick}
              >
                Edit post
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};
export default PostOperationsContainer;
