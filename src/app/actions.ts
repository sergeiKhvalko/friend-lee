'use server'

import { cookies } from 'next/headers'

export async function setCookie(password: string | null) {
	if (password) {
		cookies().set('key', `${password}`, {
			maxAge: 60 * 60 * 24,
			httpOnly: true,
			sameSite: 'strict',
		})

		return {
			message: 'is authorized to access',
			status: 200,
			autorization: true,
			headers: { 'Set-Cookie': `key=${password}` },
		}
		// return NextResponse.next()
	} else {
		return {
			message: 'authorized is failed',
			status: 401,
			autorization: false,
		}
	}
}

export async function getKeyFromCookie() {
	const cookieStore = cookies()
	return cookieStore.get('key')?.value
}

// async function deleteCookie(key: string, value: string) {
// 	const oneDay = 24 * 60 * 60 * 1000
// 	cookies().set('name', 'value', { expires: Date.now() - oneDay })
// }
