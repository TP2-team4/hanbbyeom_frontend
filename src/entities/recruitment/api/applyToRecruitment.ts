import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { throwApiError } from "../../../shared/lib/apiError";

export async function applyToRecruitment(recruitmentId: number) {
	const response = await authorizedFetch(
		`/api/matching/board/${recruitmentId}/apply`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({}),
		},
	);

	if (!response.ok) {
		await throwApiError(response, "모집 신청에 실패했습니다.");
	}
}
