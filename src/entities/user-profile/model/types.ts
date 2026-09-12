export type UserProfile = {
    nickname: string;
    conversationPreference: "SILENT" | "LIGHT_CHAT";
    averageRating: number;
    completedActivityCount: number;
    noShowReportCount: number;
};
