import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { throwApiError } from "../../../shared/lib/apiError";

export async function cancelApplication(recruitmentId: number) {
	const response = await authorizedFetch(
		`/api/matching/board/${recruitmentId}/apply/cancel`,
		{ method: "POST" },
	);

	if (!response.ok) {
		await throwApiError(response, "모집 신청 취소에 실패했습니다.");
	}
}
