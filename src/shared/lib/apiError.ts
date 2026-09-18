// 실패 응답 본문의 { message } 필드를 꺼내 사용자에게 보여줄 에러 메시지로 사용한다.
// 본문이 JSON이 아니거나 message가 없으면 fallback 문구를 대신 사용한다.
export async function extractErrorMessage(response: Response, fallback: string) {
	try {
		const body = await response.json();
		if (typeof body?.message === "string" && body.message.length > 0) {
			return body.message;
		}
	} catch {
		// 응답 본문이 JSON이 아니면 무시하고 fallback을 사용한다
	}
	return fallback;
}
