import { useAsync } from "../../../shared/lib/useAsync";
import { getChatRooms } from "../api/getChatRooms";
import type { ChatRoom } from "../../../entities/chat-room";

export function useChatRooms() {
	const { data, isLoading, error, refetch } = useAsync(
		getChatRooms,
		[] as ChatRoom[],
		[],
		"채팅방을 불러오지 못했어요.",
	);

	return { chatRooms: data, isLoading, error, refetch };
}
