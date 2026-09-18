import { API_BASE_URL } from "./apiConfig";
import { withUserIdHeader } from "./apiHeaders";
import { notifySessionExpired } from "./sessionExpiry";

// fetch()의 드롭인 대체 — Authorization 헤더를 자동으로 붙이고,
// 401 응답을 받으면 세션 만료를 전역으로 알린다. 그 외 동작은 fetch와 동일하다.
export async function authorizedFetch(
	input: string,
	init: RequestInit = {},
): Promise<Response> {
	const response = await fetch(`${API_BASE_URL}${input}`, {
		...init,
		headers: withUserIdHeader(init.headers),
	});

	if (response.status === 401) {
		notifySessionExpired();
	}

	return response;
}
