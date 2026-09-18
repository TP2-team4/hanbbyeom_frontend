import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export async function rejectApplicant(activityMatchId: number) {
	const response = await authorizedFetch(
		`/api/matching/matches/${activityMatchId}/reject`,
		{ method: "POST" },
	);

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "신청자 거절에 실패했습니다."),
		);
	}
}
