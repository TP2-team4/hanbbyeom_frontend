import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export async function updateNickname(nickname: string): Promise<void> {
	const response = await authorizedFetch("/api/users/me/nickname", {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ nickname }),
	});

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "닉네임을 저장하지 못했습니다."),
		);
	}
}