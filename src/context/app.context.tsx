'use client';

import { User } from '@/types/user';
import { getUserFromLocalStorage } from '@/lib/utils/localStorage';
import {
  Dispatch,
  SetStateAction,
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

interface AppContextData {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isEditingPost: boolean;
  setIsEditingPost: Dispatch<SetStateAction<boolean>>;
  showNewPostContainer: boolean;
  setShowNewPostContainer: Dispatch<SetStateAction<boolean>>;
  editedPost: { id: string | null; text: string | null };
  setEditedPost: Dispatch<
    SetStateAction<{ id: string | null; text: string | null }>
  >;
  currentCommentPostId: string | null;
  setCurrentCommentPostId: Dispatch<SetStateAction<string | null>>;
  showNewCommentContainer: boolean;
  setShowNewCommentContainer: Dispatch<SetStateAction<boolean>>;
  isEditingComment: boolean;
  setIsEditingComment: Dispatch<SetStateAction<boolean>>;
  editedCommentId: string | null;
  setEditedCommentId: Dispatch<SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [showNewPostContainer, setShowNewPostContainer] = useState(false);
  const [editedPost, setEditedPost] = useState<{
    id: string | null;
    text: string | null;
  }>({ id: null, text: null });
  const [currentCommentPostId, setCurrentCommentPostId] = useState<
    string | null
  >(null);
  const [showNewCommentContainer, setShowNewCommentContainer] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [editedCommentId, setEditedCommentId] = useState<string | null>(null);

  useEffect(() => {
    const user = getUserFromLocalStorage('user');

    if (user) {
      setUser(user);
    }
  }, [setUser]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isEditingPost,
        setIsEditingPost,
        showNewPostContainer,
        setShowNewPostContainer,
        editedPost,
        setEditedPost,
        currentCommentPostId,
        setCurrentCommentPostId,
        showNewCommentContainer,
        setShowNewCommentContainer,
        isEditingComment,
        setIsEditingComment,
        editedCommentId,
        setEditedCommentId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextData => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('usePost must be used within an PostProvider');
  }
  return context;
};
