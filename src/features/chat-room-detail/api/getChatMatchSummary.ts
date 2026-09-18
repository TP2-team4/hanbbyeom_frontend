import type { ChatMatchSummary } from "../../../entities/chat-room";

const MOCK_MATCH_SUMMARIES: Record<number, ChatMatchSummary> = {
	1: {
		activityMatchId: 1,
		courseName: "뚝섬 한강공원",
		location: "뚝섬유원지역 3번 출구",
		scheduledAt: "2026-09-18T19:00:00+09:00",
		scheduledEndAt: "2026-09-18T21:00:00+09:00",
		status: "CONFIRMED",
		counterpartUserId: 2,
		messageSendable: true,
	},
	2: {
		activityMatchId: 2,
		courseName: "잠실 한강공원",
		location: "잠실역 2번 출구",
		scheduledAt: "2026-09-19T09:00:00+09:00",
		scheduledEndAt: "2026-09-19T11:00:00+09:00",
		status: "CONFIRMED",
		counterpartUserId: 3,
		messageSendable: true,
	},
	3: {
		activityMatchId: 3,
		courseName: "여의도 한강공원",
		location: "여의나루역 2번 출구",
		scheduledAt: "2026-09-05T10:00:00+09:00",
		scheduledEndAt: "2026-09-05T12:00:00+09:00",
		status: "COMPLETED",
		counterpartUserId: 4,
		messageSendable: false,
	},
};

export async function getChatMatchSummary(activityMatchId: number) {
	// TODO: GET /api/matching/matches/{activityMatchId} 연동
	await new Promise((resolve) => setTimeout(resolve, 250));
	return MOCK_MATCH_SUMMARIES[activityMatchId] ?? null;
}
