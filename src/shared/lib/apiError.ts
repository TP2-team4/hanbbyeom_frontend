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

// HTTP status를 함께 들고 다니는 에러. 호출부에서 400/409처럼 특정 상태코드에 따라
// 다르게 대응해야 할 때(e.g. 토스트+새로고침) 사용한다.
export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
}

export async function throwApiError(
	response: Response,
	fallback: string,
): Promise<never> {
	throw new ApiError(
		await extractErrorMessage(response, fallback),
		response.status,
	);
}
