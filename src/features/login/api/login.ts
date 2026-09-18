import { API_BASE_URL } from "../../../shared/lib/apiConfig";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export type LoginRequest = {
	email: string;
	password: string;
};

export async function requestLogin(request: LoginRequest) {
	const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "이메일 또는 비밀번호가 일치하지 않아요."),
		);
	}

	return response.json() as Promise<{ accessToken: string }>;
}
