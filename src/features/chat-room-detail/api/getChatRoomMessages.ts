import type { ChatMessage } from "../../../entities/chat-room";

const MOCK_MESSAGES: Record<number, ChatMessage[]> = {
	1: [
		{ id: 1, activityMatchId: 1, senderId: 2, messageType: "TEXT", presetCode: null, content: "안녕하세요! 이번 러닝 같이 하게 됐네요", createdAt: "2026-09-17T00:12:00Z" },
		{ id: 2, activityMatchId: 1, senderId: 1, messageType: "TEXT", presetCode: null, content: "네 반가워요, 잘 부탁드려요", createdAt: "2026-09-17T00:13:00Z" },
		{ id: 3, activityMatchId: 1, senderId: 2, messageType: "TEXT", presetCode: null, content: "5분 늦어요", createdAt: "2026-09-17T00:14:00Z" },
	],
	2: [
		{ id: 4, activityMatchId: 2, senderId: 1, messageType: "TEXT", presetCode: null, content: "출발하셨나요?", createdAt: "2026-09-17T23:55:00Z" },
		{ id: 5, activityMatchId: 2, senderId: 3, messageType: "TEXT", presetCode: null, content: "출발 지점에 도착했어요", createdAt: "2026-09-17T23:58:00Z" },
	],
	3: [
		{ id: 6, activityMatchId: 3, senderId: 4, messageType: "TEXT", presetCode: null, content: "오늘 즐거웠어요!", createdAt: "2026-09-17T01:20:00Z" },
		{ id: 7, activityMatchId: 3, senderId: 1, messageType: "TEXT", presetCode: null, content: "저도요, 다음에 또 봐요", createdAt: "2026-09-17T01:21:00Z" },
		{ id: 8, activityMatchId: 3, senderId: 4, messageType: "TEXT", presetCode: null, content: "도착했어요", createdAt: "2026-09-17T01:25:00Z" },
	],
};

export async function getChatRoomMessages(activityMatchId: number) {
	// TODO: 채팅 메시지 조회 API가 개발되면 실제 요청으로 교체
	await new Promise((resolve) => setTimeout(resolve, 350));
	return MOCK_MESSAGES[activityMatchId] ?? [];
}
