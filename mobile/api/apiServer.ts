import Constants from 'expo-constants'

const DEV_PORT = 8080

function getBaseUrl() {
	const host = Constants.expoConfig?.hostUri?.split(':').shift()
	const API_URL = host ? `http://${host}:${DEV_PORT}` : `http://localhost:${DEV_PORT}`
	return API_URL
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || getBaseUrl()

export async function apiFetch(path: string, options: RequestInit = {}) {
	const url = path.startsWith('http') ? path : `${BASE_URL}/${path}`

	const res = await fetch(url, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...(options.headers || {}),
		},
	})

	if (!res.ok) {
		const text = await res.text().catch(() => '')
		throw new Error(`HTTP ${res.status}: ${text}`)
	}

	const contentType = res.headers.get('content-type') || ''
	return contentType.includes('application/json') ? res.json() : res.text()
}
