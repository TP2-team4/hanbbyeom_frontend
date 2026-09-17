import { authorizedFetch } from "../../../shared/lib/authorizedFetch";

export type PendingApplication = {
	activityMatchId: number;
	decisionExpiresAt: string;
};

export async function getPendingApplication(
	recruitmentId: number,
): Promise<PendingApplication | null> {
	const response = await authorizedFetch(
		`/api/matching/requests/${recruitmentId}/pending-application`,
	);

	if (response.status === 404) {
		return null;
	}

	if (!response.ok) {
		throw new Error("대기 중인 신청을 불러오지 못했습니다.");
	}

	return response.json() as Promise<PendingApplication>;
}
