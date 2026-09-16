import type { MyRecruitmentSummary } from "../../../entities/recruitment";

const MOCK_MY_RECRUITMENTS: MyRecruitmentSummary[] = [
	{
		id: 1,
		location: "뚝섬 한강공원",
		minDistanceKm: 5,
		maxDistanceKm: 12,
		conversationStyle: "SILENT",
		dateLabel: "9월 12일 (금)",
		time: "07:00",
		applicantCount: 2,
	},
	{
		id: 2,
		location: "여의도 한강공원",
		minDistanceKm: 8,
		maxDistanceKm: 15,
		conversationStyle: "LIGHT_CHAT",
		dateLabel: "9월 14일 (일)",
		time: "06:30",
		applicantCount: 0,
	},
	{
		id: 3,
		location: "잠실 한강공원",
		minDistanceKm: 4,
		maxDistanceKm: 6,
		conversationStyle: "SILENT",
		dateLabel: "9월 16일 (화)",
		time: "19:00",
		applicantCount: 1,
	},
];

export async function getMyRecruitments(limit: number) {
	// TODO: 내가 작성한 모집글 조회 API 연동 필요
	await new Promise((resolve) => setTimeout(resolve, 300));
	return MOCK_MY_RECRUITMENTS.slice(0, limit);
}
