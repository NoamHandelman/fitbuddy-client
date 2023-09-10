export type User = {
  _id: string;
  username: string;
  imageUrl?: string;
};

export type UserResponse = {
  user?: User;
  message: string;
};
