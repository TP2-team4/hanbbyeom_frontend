const ACCESS_TOKEN_KEY = "accessToken";

export function withUserIdHeader(headers: HeadersInit = {}) {
	const token = localStorage.getItem(ACCESS_TOKEN_KEY);
	if (!token) return headers;
	return { ...headers, Authorization: `Bearer ${token}` };
}
