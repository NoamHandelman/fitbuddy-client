import NextAuth from 'next-auth/next';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string;
      email: string;
      username: string;
      imageUrl: string;
    };
    accessToken: string;
    message: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      _id: string;
      email: string;
      username: string;
      imageUrl: string;
    };
    accessToken: string;
    message: string;
  }
}
