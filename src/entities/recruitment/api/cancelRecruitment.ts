import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";

export async function cancelRecruitment(
	recruitmentId: number,
): Promise<void> {
	const response = await authorizedFetch(
		`/api/matching/requests/${recruitmentId}/cancel`,
		{ method: "POST" },
	);

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "모집글 취소에 실패했습니다."),
		);
	}
}
