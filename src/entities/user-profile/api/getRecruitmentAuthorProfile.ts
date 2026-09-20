import type { RecruitmentAuthorProfile } from "../model/types";
import { authorizedFetch } from "../../../shared/lib/authorizedFetch";

type HostProfileResponse = {
	averageRating: number | null;
	reviewCount: number;
	completedCount: number;
	noShowReportCount: number;
	perceivedTalkLevelMajority: "SILENT" | "LIGHT_CHAT" | null;
	perceivedTalkLevelMajorityCount: number;
	recentReviews:
		| {
				rating: number;
				perceivedTalkLevel: "SILENT" | "LIGHT_CHAT";
				comment: string | null;
				createdAt: string;
				courseName: string;
				distanceMinMeters: number;
				distanceMaxMeters: number;
		  }[]
		| null;
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
		perceivedTalkLevelMajority: body.perceivedTalkLevelMajority,
		perceivedTalkLevelMajorityCount: body.perceivedTalkLevelMajorityCount,
		recentReviews: (body.recentReviews ?? []).map((review) => ({
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
