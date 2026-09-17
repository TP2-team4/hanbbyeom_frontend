export type ActivityReviewStatus = "completed" | "required";
export type TalkLevel = "SILENT" | "LIGHT_CHAT";

export type ActivityHistory = {
    id: number;
    activityMatchId: number;
    title: string;
    dateLabel: string;
    distanceKm: number;
    partnerNickname: string;
    partnerTalkLevel: TalkLevel;
    reviewStatus: ActivityReviewStatus;
};
