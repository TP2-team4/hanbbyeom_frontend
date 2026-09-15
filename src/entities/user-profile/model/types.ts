export type UserProfile = {
    nickname: string;
    conversationPreference: "SILENT" | "LIGHT_CHAT";
    averageRating: number;
    completedActivityCount: number;
    noShowReportCount: number;
};

export type RecruitmentAuthorProfile = {
	id: number;
	nickname: string;
	averageRating: number;
	completedActivityCount: number;
	noShowReportCount: number;
	recentReview: {
		content: string;
		dateLabel: string;
		authorLabel: string;
	} | null;
};
