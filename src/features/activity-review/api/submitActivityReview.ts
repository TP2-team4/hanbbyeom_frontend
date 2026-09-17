import type { TalkLevel } from "../model/types";

export type SubmitActivityReviewRequest = {
	activityMatchId: number;
	rating: number;
	talkLevel: TalkLevel;
	comment: string;
};

export async function submitActivityReview(
	request: SubmitActivityReviewRequest,
): Promise<void> {
	// TODO: 후기 등록 API가 개발되면 실제 요청으로 교체
	await new Promise((resolve) => setTimeout(resolve, 400));
	console.log("후기 등록:", request);
}
