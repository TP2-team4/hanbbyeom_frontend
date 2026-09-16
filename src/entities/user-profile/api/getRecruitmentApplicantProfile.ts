import type { RecruitmentAuthorProfile } from "../model/types";
import { withUserIdHeader } from "../../../shared/lib/apiHeaders";

type ApplicantProfileResponse = {
	averageRating: number | null;
	reviewCount: number;
	completedCount: number;
	noShowReportCount: number;
};

export async function getRecruitmentApplicantProfile(
	activityMatchId: number,
): Promise<RecruitmentAuthorProfile | null> {
	const response = await fetch(
		`/api/matching/matches/${activityMatchId}/applicant-profile`,
		{ headers: withUserIdHeader() },
	);

	if (!response.ok) {
		return null;
	}

	const body: ApplicantProfileResponse = await response.json();
	return {
		averageRating: body.averageRating,
		reviewCount: body.reviewCount,
		completedActivityCount: body.completedCount,
		noShowReportCount: body.noShowReportCount,
	};
}
