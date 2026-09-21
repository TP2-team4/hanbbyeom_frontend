import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export async function cancelActivity(activityMatchId: number): Promise<void> {
	const response = await authorizedFetch(
		`/api/matching/matches/${activityMatchId}/cancel`,
		{ method: "POST" },
	);

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "활동 취소에 실패했습니다."),
		);
	}
}
