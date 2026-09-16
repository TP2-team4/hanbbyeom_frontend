import { withUserIdHeader } from "../../../shared/lib/apiHeaders";

export async function applyToRecruitment(recruitmentId: number) {
	const response = await fetch(`/api/matching/board/${recruitmentId}/apply`, {
		method: "POST",
		headers: withUserIdHeader({ "Content-Type": "application/json" }),
		body: JSON.stringify({}),
	});

	if (!response.ok) {
		throw new Error("모집 신청에 실패했습니다.");
	}
}
