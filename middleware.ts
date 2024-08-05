import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(req) {
  const jwt = getCookie('jwt', { req });

  if (!jwt) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/inventory/:path*',
};
