import { API_BASE_URL } from "../../../shared/lib/apiConfig";

export type SignupRequest = {
	email: string;
	nickname: string;
	password: string;
};

export type SignupResponse = {
	id: number;
	email: string;
	nickname: string;
};

export async function signup(request: SignupRequest): Promise<SignupResponse> {
	const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		throw new Error("회원가입에 실패했어요.");
	}

	return response.json(); 
}
