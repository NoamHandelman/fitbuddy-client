import { User } from './user';

export type Post = {
  _id: string;
  user: User;
  text: string;
  likes: Like[];
  comments: Comment[];
  createdAt: string;
  updatedAt?: string;
};

export type Comment = {
  createdAt: string;
  text: string;
  user: User;
  _id: string;
};

export type Like = {
  user: User;
  _id: string;
};
