import type { ChatMessage } from "../../../entities/chat-room";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export async function getChatRoomMessages(
	activityMatchId: number,
	afterId?: number,
): Promise<ChatMessage[]> {
	const query = afterId ? `?afterId=${afterId}` : "";
	const response = await authorizedFetch(
		`/api/matching/matches/${activityMatchId}/messages${query}`,
	);

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "메시지를 불러오지 못했습니다."),
		);
	}

	return response.json() as Promise<ChatMessage[]>;
}