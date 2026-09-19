import type { ChatMessage } from "../../../entities/chat-room";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";

export async function getChatRoomMessages(
	activityMatchId: number,
): Promise<ChatMessage[]> {
	const response = await authorizedFetch(
		`/api/matching/matches/${activityMatchId}/messages`,
	);

	if (!response.ok) {
		throw new Error("메시지를 불러오지 못했습니다.");
	}

	return response.json() as Promise<ChatMessage[]>;
}