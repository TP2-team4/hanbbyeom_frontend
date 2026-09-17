import type { RecruitmentAuthorProfile } from "../model/types";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";

type HostProfileResponse = {
	averageRating: number | null;
	reviewCount: number;
	completedCount: number;
	noShowReportCount: number;
};

export async function getRecruitmentAuthorProfile(
	recruitmentId: number,
): Promise<RecruitmentAuthorProfile | null> {
	const response = await authorizedFetch(
		`/api/matching/board/${recruitmentId}/host-profile`,
	);

	if (!response.ok) {
		return null;
	}

	const body: HostProfileResponse = await response.json();
	return {
		averageRating: body.averageRating,
		reviewCount: body.reviewCount,
		completedActivityCount: body.completedCount,
		noShowReportCount: body.noShowReportCount,
	};
}
