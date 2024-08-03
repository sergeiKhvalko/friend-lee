'use server'

import { cookies } from 'next/headers'
import { getKeyFromCookie } from './actions'
import { Home } from './home'

export default async function HomePage() {
	const value = (await getKeyFromCookie()) || ''
	console.log('14-----', value)

	return <Home password={value} />
}
