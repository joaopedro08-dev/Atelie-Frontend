import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('jwtToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  const hasSomeCookie = !!(token || refreshToken)

  const response = NextResponse.next()
  response.headers.set('x-middleware-cache', 'no-cache')

  if (!hasSomeCookie && pathname.startsWith('/admin')) {
    const redirectRes = NextResponse.redirect(
      new URL('/signin', request.url),
      303
    )
    redirectRes.headers.set('x-middleware-cache', 'no-cache')
    return redirectRes
  }

  if (!hasSomeCookie && pathname === '/') {
    const redirectRes = NextResponse.redirect(
      new URL('/signin', request.url),
      303
    )
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
