import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwtToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value 
  
  const { pathname } = request.nextUrl

  // Se estiver na raiz, decide para onde vai baseado no login
  if (pathname === '/') {
    if (token || refreshToken) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // Proteção de rotas admin
  if (!token && !refreshToken && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // Se já está logado e tenta ir para login ou cadastro, manda para o dashboard
  if ((token || refreshToken) && (pathname === '/signin' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match todas as rotas exceto:
     * 1. api (rotas de API do Next)
     * 2. _next/static (arquivos estáticos)
     * 3. _next/image (otimização de imagens)
     * 4. favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}