import PostsList from '@/components/posts/PostsList';
import AddNewPost from '@/components/posts/new-post/AddNewPost';

const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <AddNewPost />
      <PostsList />
    </main>
  );
};

export default HomePage;
