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
		status: "RECRUITING",
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
		status: "RECRUITING",
	},
	{
		id: 3,
		location: "잠실 한강공원",
		minDistanceKm: 6,
		maxDistanceKm: 10,
		conversationStyle: "SILENT",
		dateLabel: "9월 10일 (수)",
		time: "07:00",
		applicantCount: 0,
		status: "CLOSED",
		matchedPartnerNickname: "조용한러너",
	},
	{
		id: 4,
		location: "반포 한강공원",
		minDistanceKm: 3,
		maxDistanceKm: 6,
		conversationStyle: "SILENT",
		dateLabel: "9월 3일 (수)",
		time: "20:00",
		applicantCount: 0,
		status: "CLOSED",
	},
	{
		id: 5,
		location: "안양천",
		minDistanceKm: 10,
		maxDistanceKm: 15,
		conversationStyle: "SILENT",
		dateLabel: "8월 30일 (토)",
		time: "06:00",
		applicantCount: 0,
		status: "CANCELLED",
	},
	{
		id: 6,
		location: "뚝섬 한강공원",
		minDistanceKm: 5,
		maxDistanceKm: 8,
		conversationStyle: "SILENT",
		dateLabel: "8월 24일 (일)",
		time: "19:00",
		applicantCount: 0,
		status: "CLOSED",
		matchedPartnerNickname: "새벽공기",
	},
	{
		id: 7,
		location: "여의도 한강공원",
		minDistanceKm: 8,
		maxDistanceKm: 12,
		conversationStyle: "LIGHT_CHAT",
		dateLabel: "8월 17일 (일)",
		time: "06:00",
		applicantCount: 0,
		status: "RECRUITING",
	},
];

export async function getMyRecruitments(limit?: number) {
	// TODO: 내가 작성한 모집글 조회 API 연동 필요
	await new Promise((resolve) => setTimeout(resolve, 300));
	return limit === undefined
		? MOCK_MY_RECRUITMENTS
		: MOCK_MY_RECRUITMENTS.slice(0, limit);
}
