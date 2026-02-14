import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookieStore = await cookies()
  const token = cookieStore.get('jwtToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value
  const hasAuth = !!(token || refreshToken)  

  const response = NextResponse.next()
  response.headers.set('x-middleware-cache', 'no-cache') 

  if ((pathname === '/' || pathname === '/signup') && !hasAuth) {
    const redirectRes = NextResponse.redirect(new URL('/signin', request.url), 303)
    redirectRes.headers.set('x-middleware-cache', 'no-cache')
    return redirectRes
  }

  if (!hasAuth && pathname.startsWith('/admin')) {
    const redirectRes = NextResponse.redirect(new URL('/signin', request.url), 303)
    redirectRes.headers.set('x-middleware-cache', 'no-cache')
    return redirectRes
  }

  if (hasAuth && pathname === '/signin') {
    const redirectRes = NextResponse.redirect(new URL('/admin', request.url), 303)
    redirectRes.headers.set('x-middleware-cache', 'no-cache')
    return redirectRes
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}