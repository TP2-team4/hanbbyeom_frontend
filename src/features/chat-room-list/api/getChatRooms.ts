import type { ChatRoom } from "../../../entities/chat-room";

const MOCK_CHAT_ROOMS: ChatRoom[] = [
    {
	        activityMatchId: 1,
        participantNickname: "조용한러너",
        lastMessage: "5분 늦어요",
        activitySummary: "9월 12일 07:00 · 뚝섬 8km",
        status: "scheduled",
        hasUnreadMessage: true,
    },
    {
	        activityMatchId: 2,
        participantNickname: "오늘만러너",
        lastMessage: "출발 지점에 도착했어요",
        activitySummary: "9월 13일 09:00 · 뚝섬 9km",
        status: "in_progress",
        hasUnreadMessage: true,
    },
    {
	        activityMatchId: 3,
        participantNickname: "새벽공기",
        lastMessage: "도착했어요",
        activitySummary: "9월 5일 · 대화방 닫힘",
        status: "completed",
        hasUnreadMessage: false,
    },
];

export async function getChatRooms() {
    // TODO: 채팅방 목록 API가 개발되면 실제 요청으로 교체
    await new Promise((resolve) => setTimeout(resolve, 350));
    return MOCK_CHAT_ROOMS;
}
