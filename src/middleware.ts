import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  let hasToken = request.cookies.has('token');

  const token = request.cookies.get('token');

  console.log(token);

  console.log(hasToken);

  if (!hasToken && request.url !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/profiles/:path*', '/my-account'],
};
