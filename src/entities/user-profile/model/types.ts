export type UserProfile = {
    nickname: string;
    conversationPreference: "SILENT" | "LIGHT_CHAT";
    averageRating: number;
    completedActivityCount: number;
    noShowReportCount: number;
};

export type RecruitmentAuthorProfile = {
	averageRating: number | null;
	reviewCount: number;
	completedActivityCount: number;
	noShowReportCount: number;
};
