import type { ChatRoom } from "../../../entities/chat-room";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export async function getChatRooms(): Promise<ChatRoom[]> {
	const response = await authorizedFetch("/api/chats");

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "채팅방을 불러오지 못했습니다."),
		);
	}

	return response.json() as Promise<ChatRoom[]>;
}
