import type { Applicant } from "../../../entities/recruitment";

const MOCK_APPLICANTS: Record<number, Applicant[]> = {
	1: [
		{
			id: 1,
			nickname: "조용한러너",
			conversationStyle: "조용히",
			averageRating: 4.8,
			completedActivityCount: 31,
			noShowReportCount: 0,
		},
		{
			id: 2,
			nickname: "새벽공기",
			conversationStyle: "가벼운 대화",
			averageRating: 4.6,
			completedActivityCount: 12,
			noShowReportCount: 0,
		},
		{
			id: 3,
			nickname: "밤산책",
			conversationStyle: "조용히",
			averageRating: 4.9,
			completedActivityCount: 8,
			noShowReportCount: 0,
		},
	],
	3: [
		{
			id: 4,
			nickname: "담백한하루",
			conversationStyle: "가벼운 대화",
			averageRating: 4.7,
			completedActivityCount: 9,
			noShowReportCount: 0,
		},
	],
};

export async function getApplicants(recruitmentId: number) {
	// TODO: 신청자 목록 조회 API 연동 필요 (호스트 수락/거절 API가 백엔드에 아직 없음)
	await new Promise((resolve) => setTimeout(resolve, 300));
	return MOCK_APPLICANTS[recruitmentId] ?? [];
}
