import type { ChatMessage, PresetCode } from "../../../entities/chat-room";

export type SendChatMessageRequest =
	| {
			messageType: "TEXT";
			content: string;
	  }
	| {
			messageType: "PRESET";
			presetCode: PresetCode;
	  };

const PRESET_CONTENT: Record<PresetCode, string> = {
	ARRIVED: "도착했어요.",
	LATE_5_MINUTES: "5분 정도 늦어요.",
	CANNOT_FIND_PLACE: "장소를 찾지 못했어요.",
	CANNOT_PARTICIPATE: "오늘 참여가 어려워졌어요.",
};

export async function sendChatMessage(
	activityMatchId: number,
	request: SendChatMessageRequest,
): Promise<ChatMessage> {
	// TODO: POST /api/matching/matches/{matchId}/messages 연동
	await new Promise((resolve) => setTimeout(resolve, 200));

	if (request.messageType === "PRESET") {
		return {
			id: Date.now(),
			activityMatchId,
			senderId: 1, // TODO: 실제 로그인 사용자 ID로 교체
			messageType: "PRESET",
			presetCode: request.presetCode,
			content: PRESET_CONTENT[request.presetCode],
			createdAt: new Date().toISOString(),
		};
	}

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
