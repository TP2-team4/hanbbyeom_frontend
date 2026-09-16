import { withUserIdHeader } from "../../../shared/lib/apiHeaders";

export async function cancelApplication(recruitmentId: number) {
	const response = await fetch(
		`/api/matching/board/${recruitmentId}/apply/cancel`,
		{
			method: "POST",
			headers: withUserIdHeader(),
		},
	);

	if (!response.ok) {
		throw new Error("모집 신청 취소에 실패했습니다.");
	}
}
