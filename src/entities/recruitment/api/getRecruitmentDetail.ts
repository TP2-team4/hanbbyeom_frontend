import type { RecruitmentDetail } from "../model/types";

// 목업 데이터: 모집글 상세 조회 API 응답을 임시로 대체합니다.
const MOCK_RECRUITMENT_DETAILS: RecruitmentDetail[] = [
	{
		id: 1,
		authorId: 1,
		location: "뚝섬 한강공원",
		minDistanceKm: 5,
		maxDistanceKm: 12,
		conversationStyle: "SILENT",
		dateLabel: "9월 12일 (금)",
		time: "07:00",
		pace: "6'00\" ~ 6'40\"",
		meetingPlace: "뚝섬유원지역 3번 출구",
		status: "open",
	},
	{
		id: 2,
		authorId: 2,
		location: "여의도 한강공원",
		minDistanceKm: 8,
		maxDistanceKm: 10,
		conversationStyle: "LIGHT_CHAT",
		dateLabel: "9월 13일 (일)",
		time: "06:30",
		pace: "5'40\" ~ 6'10\"",
		meetingPlace: "여의나루역 2번 출구",
		status: "open",
	},
	{
		id: 3,
		authorId: 3,
		location: "반포 한강공원",
		minDistanceKm: 3,
		maxDistanceKm: 5,
		conversationStyle: "SILENT",
		dateLabel: "9월 14일 (월)",
		time: "20:00",
		pace: "6'30\" ~ 7'00\"",
		meetingPlace: "고속터미널역 8-1번 출구",
		status: "applied",
	},
];

export async function getRecruitmentDetail(id: number) {
	// TODO: 모집글 상세 조회 API가 개발되면 실제 요청과 응답 파싱으로 교체
	await new Promise((resolve) => setTimeout(resolve, 200));
	return MOCK_RECRUITMENT_DETAILS.find((detail) => detail.id === id) ?? null;
}
