import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Post } from '@/lib/types/post';
import Likes from '../Likes';
import useOutsideClick from '@/hooks/useOutsideClick';
import FullPostItemHeader from './FullPostItemHeader';
import FullPostItemFooter from './FullPostItemFooter';

interface FullPostItemProps {
  post: Post;
  setShowFullPost: Dispatch<SetStateAction<boolean>>;
}

const FullPostItem: FC<FullPostItemProps> = ({ post, setShowFullPost }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const ref = useOutsideClick(() => {
    setShowFullPost(false);
  });

  return (
    <>
      <main className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <section
          className="bg-white rounded-lg shadow-lg p-8 m-4 relative w-120"
          ref={ref}
        >
          <FullPostItemHeader
            user={post.user}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            postId={post._id}
            text={post.text}
            setShowFullPost={setShowFullPost}
          />
          <p className="mt-3 mb-8 overflow-auto break-words">{post.text}</p>
          {post.likes.length > 0 && <Likes likes={post.likes} />}
          <FullPostItemFooter likes={post.likes} postId={post._id} />
        </section>
      </main>
    </>
  );
};

export default FullPostItem;
