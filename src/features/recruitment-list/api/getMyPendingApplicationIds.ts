import { authorizedFetch } from "../../../shared/lib/authorizedFetch";
import { extractErrorMessage } from "../../../shared/lib/apiError";

// 목록 응답엔 "내가 이미 신청했는지" 정보가 없어서, 내 신청 내역과 대조해 PENDING인 글만 골라낸다.
// (features/applied-recruitment-list의 getMyAppliedRecruitments와 같은 엔드포인트를 쓰지만,
// feature 간 직접 import를 피하기 위해 필요한 부분만 최소로 다시 호출한다)
type MyApplicationResponse = {
	hostMatchRequestId: number;
	status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
};

export async function getMyPendingApplicationIds(): Promise<Set<number>> {
	const response = await authorizedFetch("/api/matching/board/applications");

	if (!response.ok) {
		throw new Error(
			await extractErrorMessage(response, "신청 내역을 불러오지 못했습니다."),
		);
	}

	const body: MyApplicationResponse[] = await response.json();
	return new Set(
		body
			.filter((item) => item.status === "PENDING")
			.map((item) => item.hostMatchRequestId),
	);
}
