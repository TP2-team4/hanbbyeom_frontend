export type TalkLevel = "SILENT" | "LIGHT_CHAT";

export type ActivityHistoryStatus =
    | "UPCOMING"
    | "IN_PROGRESS"
    | "REVIEW_REQUIRED"
    | "REVIEW_COMPLETED"
    | "CANCELLED"
    | "NO_SHOW_REPORTED";

export type ActivityHistory = {
    id: number;
    activityMatchId: number;
    title: string;
    dateLabel: string;
    minDistanceKm: number;
    maxDistanceKm: number;
    partnerNickname: string;
    status: ActivityHistoryStatus;
};
