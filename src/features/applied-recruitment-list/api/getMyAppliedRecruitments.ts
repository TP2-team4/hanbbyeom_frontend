import type { AppliedRecruitmentSummary } from "../../../entities/recruitment";

const MOCK_APPLIED_RECRUITMENTS: AppliedRecruitmentSummary[] = [
	{
		id: 1,
		location: "잠실 한강공원",
		minDistanceKm: 6,
		maxDistanceKm: 10,
		dateLabel: "9월 13일 (토)",
		time: "06:30",
		authorNickname: "새벽공기",
		status: "WAITING",
	},
	{
		id: 2,
		location: "반포 한강공원",
		minDistanceKm: 3,
		maxDistanceKm: 6,
		dateLabel: "9월 15일 (월)",
		time: "20:00",
		authorNickname: "밤산책",
		status: "ACCEPTED",
	},
];

export async function getMyAppliedRecruitments(limit: number) {
	// TODO: 내가 신청한 모집 조회 API 연동 필요
	await new Promise((resolve) => setTimeout(resolve, 300));
	return MOCK_APPLIED_RECRUITMENTS.slice(0, limit);
}
