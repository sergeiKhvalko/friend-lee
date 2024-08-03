import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const isSecretRoute = (pathname: string) => {
	return pathname.startsWith('/secret')
}

export async function middleware(req: NextRequest) {
	const cookieStore = cookies()
	const hasCookie = cookieStore.has('key')

	const { pathname } = req.nextUrl

	if (!isSecretRoute(pathname) && !hasCookie) {
		return NextResponse.rewrite(new URL('/404', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/'],
}
