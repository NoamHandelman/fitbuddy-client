'use client';

import { FC, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useAppContext } from '@/context/app.context';
import useOutsideClick from '@/hooks/useOutsideClick';
import usePost from '@/hooks/posts/usePost';

interface NewPostContainerProps {
  setShowNewPostContainer: Dispatch<SetStateAction<boolean>>;
}

const NewPost: FC<NewPostContainerProps> = ({ setShowNewPostContainer }) => {
  const [text, setText] = useState('');

  const { isEditingPost, setIsEditingPost, editedPost, setEditedPost } =
    useAppContext();

  const { createPost, editPost } = usePost();

  const handleCreatePost = () => {
    if (isEditingPost && editedPost.id) {
      const { id } = editedPost;
      editPost({ text, editedPostId: id });
    } else {
      createPost(text);
    }
    handleContainerClosing();
  };

  const handleContainerClosing = () => {
    setIsEditingPost(false);
    setEditedPost({ id: null, text: null });
    setShowNewPostContainer(false);
  };

  useEffect(() => {
    if (isEditingPost && editedPost.id && editedPost.text) {
      setText(editedPost.text);
    } else {
      setText('');
    }
  }, [isEditingPost, editedPost.id, editedPost.text]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const ref = useOutsideClick(handleContainerClosing);

  return (
    <main className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <section
        className="bg-white rounded-lg shadow-lg p-8 m-4  mx-auto relative"
        ref={ref}
      >
        <div className="border-b border-gray-200 mb-4">
          <div className="flex justify-end">
            <IoCloseOutline
              className="cursor-pointer text-2xl hover:bg-gray-200 rounded-full"
              onClick={() => {
                setIsEditingPost(false);
                setEditedPost({ id: null, text: null });
                setShowNewPostContainer(false);
              }}
            />
          </div>
          <div className="flex justify-center items-center mb-4 pb-2">
            <h1 className="text-lg font-bold">
              {isEditingPost ? 'Edit Post' : 'New Post'}
            </h1>
          </div>
        </div>
        <textarea
          className="border border-gray-200 rounded w-full mb-4 p-2 resize-none"
          autoFocus
          placeholder="Write your post here"
          rows={10}
          cols={35}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className={`w-full p-2 text-lg text-white rounded ${
            text
              ? 'bg-blue-500 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed opacity-50'
          }`}
          onClick={handleCreatePost}
          disabled={!text}
        >
          {isEditingPost ? ' Edit ' : 'Create'}
        </button>
      </section>
    </main>
  );
};

export default NewPost;
