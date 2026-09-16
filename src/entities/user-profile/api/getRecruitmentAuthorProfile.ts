import type { RecruitmentAuthorProfile } from "../model/types";
import { withUserIdHeader } from "../../../shared/lib/apiHeaders";

type HostProfileResponse = {
	averageRating: number | null;
	reviewCount: number;
	completedCount: number;
	noShowReportCount: number;
};

export async function getRecruitmentAuthorProfile(
	recruitmentId: number,
): Promise<RecruitmentAuthorProfile | null> {
	const response = await fetch(
		`/api/matching/board/${recruitmentId}/host-profile`,
		{ headers: withUserIdHeader() },
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
