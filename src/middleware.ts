import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { authOptions } from './lib/nextAuth';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
  // const session = await getServerSession(authOptions);

  // let hasToken = request.cookies.has('token');
  // const token = request.cookies.get('token');
  // console.log(token);
  // console.log(hasToken);

  // if (!session?.accessToken && request.url !== '/') {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }
  // return NextResponse.next();
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }
}

export const config = {
  matcher: ['/home', '/profiles/:path*', '/my-account'],
};
