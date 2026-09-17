import type { RecruitmentAuthorProfile } from "../model/types";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";

type ApplicantProfileResponse = {
	averageRating: number | null;
	reviewCount: number;
	completedCount: number;
	noShowReportCount: number;
};

export async function getRecruitmentApplicantProfile(
	activityMatchId: number,
): Promise<RecruitmentAuthorProfile | null> {
	const response = await authorizedFetch(
		`/api/matching/matches/${activityMatchId}/applicant-profile`,
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
