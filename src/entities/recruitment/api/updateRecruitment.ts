import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import type { ConversationStyle } from "../model/types";

export type UpdateRecruitmentRequest = {
	scheduledAt: string;
	talkLevel: ConversationStyle;
};

export async function updateRecruitment(
	recruitmentId: number,
	request: UpdateRecruitmentRequest,
): Promise<void> {
	const response = await authorizedFetch(
		`/api/matching/requests/${recruitmentId}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		},
	);

	if (!response.ok) {
		const body: { message?: string } | null = await response
			.json()
			.catch(() => null);

		throw new Error(body?.message ?? "모집글 수정에 실패했습니다.");
	}
}
