import type { ConversationPreference } from "../model/types";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export async function saveConversationPreference(
	preference: ConversationPreference,
): Promise<void> {
	const response = await authorizedFetch("/api/users/me/preferences", {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ defaultTalkLevel: preference }),
	});

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "대화 수준 저장에 실패했습니다."),
		);
	}
}
