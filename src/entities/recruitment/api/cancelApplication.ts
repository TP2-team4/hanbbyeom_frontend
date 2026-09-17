import { authorizedFetch } from "../../../shared/lib/authorizedFetch";

export async function cancelApplication(recruitmentId: number) {
	const response = await authorizedFetch(
		`/api/matching/board/${recruitmentId}/apply/cancel`,
		{ method: "POST" },
	);

	if (!response.ok) {
		throw new Error("모집 신청 취소에 실패했습니다.");
	}
}
