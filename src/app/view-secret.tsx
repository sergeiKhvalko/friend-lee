'use client'

import { setCookie } from './actions'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ViewSecret() {
	const router = useRouter()
	const [isAuthorized, setAuthorization] = useState(false)
	const searchParams = useSearchParams()
	const key = searchParams.get('key')

	useEffect(() => {
		const updateViews = async () => {
			const updatedViews = await setCookie(key)
			if (updatedViews.autorization) {
				setAuthorization(updatedViews.autorization)
			} else {
				router.push('/')
			}
		}

		updateViews()
	}, [router])

	return (
		<div>
			{isAuthorized && (
				<iframe src="http://localhost:3000" width="800" height="600" />
			)}
		</div>
	)
}
