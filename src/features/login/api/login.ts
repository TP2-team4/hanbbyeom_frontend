export type LoginRequest = {
	email: string;
	password: string;
};

export async function requestLogin(request: LoginRequest) {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		throw new Error("이메일 또는 비밀번호가 일치하지 않아요.");
	}

	return response.json() as Promise<{ accessToken: string }>;
}
