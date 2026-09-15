import type { RecruitmentAuthorProfile } from "../model/types";

// 목업 데이터: 모집 작성자 프로필 조회 API 응답을 임시로 대체합니다.
const MOCK_AUTHOR_PROFILES: RecruitmentAuthorProfile[] = [
	{
		id: 1,
		nickname: "조용한러너",
		averageRating: 4.8,
		completedActivityCount: 31,
		noShowReportCount: 0,
		recentReview: {
			content: "약속 시간에 정확히 오셨고 페이스가 안정적이었어요.",
			dateLabel: "3일 전",
			authorLabel: "익명 후기",
		},
	},
	{
		id: 2,
		nickname: "새벽공기",
		averageRating: 4.6,
		completedActivityCount: 12,
		noShowReportCount: 0,
		recentReview: {
			content: "대화가 편안했고 끝까지 즐겁게 달렸어요.",
			dateLabel: "1주 전",
			authorLabel: "익명 후기",
		},
	},
	{
		id: 3,
		nickname: "밤산책",
		averageRating: 4.9,
		completedActivityCount: 8,
		noShowReportCount: 0,
		recentReview: {
			content: "서로의 페이스를 잘 맞춰주셔서 편하게 달렸어요.",
			dateLabel: "5일 전",
			authorLabel: "익명 후기",
		},
	},
];

export async function getRecruitmentAuthorProfile(id: number) {
	// TODO: 사용자 프로필 조회 API가 개발되면 실제 요청과 응답 파싱으로 교체
	await new Promise((resolve) => setTimeout(resolve, 200));
	return MOCK_AUTHOR_PROFILES.find((profile) => profile.id === id) ?? null;
}
