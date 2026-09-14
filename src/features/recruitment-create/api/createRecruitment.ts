import type { ConversationStyle } from "../../../entities/recruitment";

export type RecruitmentCreateRequest = {
	courseId: number;
	meetingPlace: string;
	date: string;
	time: string;
	minDistanceKm: number;
	maxDistanceKm: number;
	minPaceSeconds: number;
	maxPaceSeconds: number;
	conversationStyle: ConversationStyle;
};

export async function createRecruitment(_request: RecruitmentCreateRequest) {
	// TODO: 모집글 작성 API가 개발되면 실제 요청으로 교체
	await new Promise((resolve) => setTimeout(resolve, 400));
	return { success: true, id: Date.now() };
}
