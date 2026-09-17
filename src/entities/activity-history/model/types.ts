export type TalkLevel = "SILENT" | "LIGHT_CHAT";

export type ActivityHistoryStatus =
    | "UPCOMING"
    | "IN_PROGRESS"
    | "REVIEW_REQUIRED"
    | "REVIEW_COMPLETED"
    | "COMPLETED"
    | "CANCELLED"
    | "NO_SHOW_REPORTED";

export type ActivityHistory = {
    id: number;
    activityMatchId: number;
    title: string;
    dateLabel: string;
    distanceKm: number;
    partnerNickname: string;
    partnerTalkLevel: TalkLevel;
    status: ActivityHistoryStatus;
};
