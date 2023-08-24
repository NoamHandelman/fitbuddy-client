import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  let hasToken = request.cookies.has('token');

  if (!hasToken && request.url !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/profiles/:path*', '/my-account'],
};
