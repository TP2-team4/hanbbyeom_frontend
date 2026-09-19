import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";
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
	const response = await authorizedFetch(
		`/api/matching/matches/${request.activityMatchId}/review`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				rating: request.rating,
				perceivedTalkLevel: request.talkLevel,
				comment: request.comment || null,
			}),
		},
	);

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "후기를 등록하지 못했습니다."),
		);
	}
}