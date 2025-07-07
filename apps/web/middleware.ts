import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isAuth = req.cookies.get('sb-access-token');

  const isProtectedRoute = req.nextUrl.pathname.startsWith('/chat');

  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/chat/:path*'],
};
