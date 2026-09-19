import { authorizedFetch } from "../../../shared/lib/authorizedFetch";

export type FeedbackStatus = {
	canSubmit: boolean;
	alreadySubmitted: boolean;
	submittedType: string | null;
};

export async function getFeedbackStatus(
	activityMatchId: number,
): Promise<FeedbackStatus> {
	const response = await authorizedFetch(
		`/api/matching/matches/${activityMatchId}/feedback-status`,
	);

	if (!response.ok) {
		throw new Error("제출 가능 여부를 확인하지 못했습니다.");
	}

	return response.json() as Promise<FeedbackStatus>;
}
