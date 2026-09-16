// TODO: JWT 인증 필터가 연결되면 X-USER-ID 대신 Authorization 헤더로 교체 필요
const TEMP_USER_ID = 1;

export function withUserIdHeader(headers: HeadersInit = {}) {
	return { ...headers, "X-USER-ID": String(TEMP_USER_ID) };
}
