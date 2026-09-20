import type { RecruitmentAuthorProfile } from "../model/types";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";

type ApplicantProfileResponse = {
	averageRating: number | null;
	reviewCount: number;
	completedCount: number;
	noShowReportCount: number;
	perceivedTalkLevelMajority: "SILENT" | "LIGHT_CHAT" | null;
	perceivedTalkLevelMajorityCount: number;
	recentReviews: {
		rating: number;
		perceivedTalkLevel: "SILENT" | "LIGHT_CHAT";
		comment: string | null;
		createdAt: string;
		courseName: string;
		distanceMinMeters: number;
		distanceMaxMeters: number;
	}[];
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
		perceivedTalkLevelMajority: body.perceivedTalkLevelMajority,
		perceivedTalkLevelMajorityCount: body.perceivedTalkLevelMajorityCount,
		recentReviews: body.recentReviews.map((review) => ({
			rating: review.rating,
			perceivedTalkLevel: review.perceivedTalkLevel,
			comment: review.comment,
			createdAt: review.createdAt,
			courseName: review.courseName,
			minDistanceKm: review.distanceMinMeters / 1000,
			maxDistanceKm: review.distanceMaxMeters / 1000,
		})),
	};
}
