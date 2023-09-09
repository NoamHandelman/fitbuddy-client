import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/',
  },
  secret: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          type: 'email',
          placeholder: 'Email',
        },
        password: {
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const { email, password } = credentials;

        const response = await fetch(
          'http://localhost:8080/api/v1/users/login',
          {
            method: 'POST',
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          console.log(response.statusText);
          return null;
        }

        // const data: {
        //   user?: {
        //     _id: string;
        //     username: string;
        //     email: string;
        //     imageUrl: string;
        //   };
        //   accessToken?: string;
        //   message: string;
        // } = await response.json();

        // return data.user;
        const user = await response.json();
        console.log('user from the login call - ', user);

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log({ token, user });
      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
