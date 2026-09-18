import type { ChatMessage } from "../../../entities/chat-room";

export type SendChatMessageRequest = {
	messageType: "TEXT";
	content: string;
};

export async function sendChatMessage(
	activityMatchId: number,
	request: SendChatMessageRequest,
): Promise<ChatMessage> {
	// TODO: POST /api/matching/matches/{matchId}/messages 연동
	await new Promise((resolve) => setTimeout(resolve, 200));

	return {
		id: Date.now(),
		activityMatchId,
		senderId: 1, // TODO: 실제 로그인 사용자 ID로 교체
		messageType: "TEXT",
		presetCode: null,
		content: request.content,
		createdAt: new Date().toISOString(),
	};
}
