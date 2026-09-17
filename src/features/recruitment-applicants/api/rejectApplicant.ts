import { authorizedFetch } from "../../../shared/lib/authorizedFetch";

export async function rejectApplicant(activityMatchId: number) {
	const response = await authorizedFetch(
		`/api/matching/matches/${activityMatchId}/reject`,
		{ method: "POST" },
	);

	if (!response.ok) {
		throw new Error("신청자 거절에 실패했습니다.");
	}
}
