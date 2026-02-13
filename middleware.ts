import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwtToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value 
  
  const { pathname } = request.nextUrl

  if (pathname === '/' || pathname === '/signup') {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (!token && !refreshToken && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if ((token || refreshToken) && pathname === '/signin') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}