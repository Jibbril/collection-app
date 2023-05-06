import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/', '/login'],
  afterAuth: (auth, req, _) => {
    // If the user is not signed in, redirect to /login
    if (!auth || (!auth.isPublicRoute && !auth.userId)) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
};
