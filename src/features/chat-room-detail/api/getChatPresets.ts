import type { ChatPreset } from "../../../entities/chat-room";

const MOCK_CHAT_PRESETS: ChatPreset[] = [
	{
		code: "ARRIVED",
		content: "도착했어요.",
	},
	{
		code: "LATE_5_MINUTES",
		content: "5분 정도 늦어요.",
	},
	{
		code: "CANNOT_FIND_PLACE",
		content: "장소를 찾지 못했어요.",
	},
	{
		code: "CANNOT_PARTICIPATE",
		content: "오늘 참여가 어려워졌어요.",
	},
];

export async function getChatPresets(): Promise<ChatPreset[]> {
	// TODO: GET /api/matching/messages/presets 연동
	await new Promise((resolve) => setTimeout(resolve, 200));
	return MOCK_CHAT_PRESETS;
}
