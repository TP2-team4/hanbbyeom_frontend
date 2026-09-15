export type SignupRequest = {
	email: string;
	nickname: string;
	password: string;
};

export async function signup(request: SignupRequest) {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		throw new Error("회원가입에 실패했어요.");
	}

	return response.json(); 
}
