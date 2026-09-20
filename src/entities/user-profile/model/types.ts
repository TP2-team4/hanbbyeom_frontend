export type UserProfile = {
	id: number;
	nickname: string;
	email: string;
	conversationPreference: "SILENT" | "LIGHT_CHAT";
	averageRating: number | null;
	completedActivityCount: number;
	noShowReportCount: number;
};

export type RecentReview = {
	rating: number;
	perceivedTalkLevel: "SILENT" | "LIGHT_CHAT";
	comment: string | null;
	createdAt: string;
	courseName: string;
	minDistanceKm: number;
	maxDistanceKm: number;
};

export type RecruitmentAuthorProfile = {
	averageRating: number | null;
	reviewCount: number;
	completedActivityCount: number;
	noShowReportCount: number;
	perceivedTalkLevelMajority: "SILENT" | "LIGHT_CHAT" | null;
	perceivedTalkLevelMajorityCount: number;
	recentReviews: RecentReview[];
};